const express = require('express');
const path = require('path');
const moment = require('moment');
const hbs = require('hbs');
const { Sequelize, QueryTypes } = require('sequelize');

const app = express();
const port = 5000;
const config = require('./src/config/config.json');
const sequelize = new Sequelize(config.development);
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');

const data = [];

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    name: "data",
    secret: 'rahasiabanget',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

// Handlebars helpers
hbs.registerHelper('isChecked', function (technologies, tech) {
    return technologies.includes(tech) ? 'checked' : '';
});

hbs.registerHelper('logos', function (technologies) {
    const logos = {
        nodeJs: technologies.includes('nodeJs') ? '<img src="/assets/image/logoNodejs.png" style="width: 40px; height: 35px; margin-right: 15px">' : '',
        nextJs: technologies.includes('nextJs') ? '<img src="/assets/image/logoNextjs.png" style="width: 40px; height: 35px; margin-right: 15px">' : '',
        reactJs: technologies.includes('reactJs') ? '<img src="/assets/image/logoReactjs.png" style="width: 40px; height: 35px; margin-right: 15px">' : '',
        typeScript: technologies.includes('typescript') ? '<img src="/assets/image/logotypescript.png" style="width: 40px; height: 35px; margin-right: 15px">' : ''
    };

    // Menggabungkan semua gambar ikon menjadi satu string HTML
    const logosHTML = Object.values(logos).join('');
    return new hbs.SafeString(logosHTML);
});

hbs.registerHelper('calculateDuration', function (startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    if (years > 0) {
        return years + (years > 1 ? " tahun" : " tahun");
    } else if (months > 0) {
        return months + (months > 1 ? " bulan" : " bulan");
    } else if (days > 0) {
        return days + (days > 1 ? " hari" : " hari");
    } else {
        return "Kurang dari 1 hari";
    }
});

// Routes
app.get('/register', registerView);
app.post('/register', register);
app.get('/login', loginView);
app.post('/login', login);

app.get('/', home);
app.get('/add-project', requireLogin, addProjectView);
app.post('/add-project', requireLogin, addProject);
app.post('/delete-project/:id', requireLogin, deleteProject);
app.get('/update-project/:id', requireLogin, updateProjectView);
app.post('/update-project', requireLogin, updateProject);
app.get('/testimonials', testimonials);
app.get('/detail-project/:id', detail);
app.get('/contact', contact);

// Route Handlers

function registerView(req, res) {
    res.render('register')
}

async function register(req, res) {
    const { inputName, inputEmail, inputPassword } = req.body

    console.log("Name:", inputName)
    console.log("Email:", inputEmail)
    console.log("Password:", inputPassword)

    const salt = 10

    bcrypt.hash(inputPassword, salt, async (err, hash) => {
        if (err) {
            console.error("Password failed to be encrypted!")
            req.flash('danger', 'Register failed : password failted to encrypted!')
            return res.redirect('/register')
        }

        console.log("Hash result :", hash)
        const query = `INSERT INTO users(name, email, password) VALUES ('${inputName}', '${inputEmail}','${hash}')`

        await sequelize.query(query, { type: QueryTypes.INSERT })
        req.flash('success', 'Register success')
        res.redirect('/')
    })
}

function loginView(req, res) {
    res.render('login')
}

async function login(req, res){
    const { inputEmail, inputPassword } = req.body
    const query = `SELECT * FROM users WHERE email='${inputEmail}'`
    const project = await sequelize.query(query, { type: QueryTypes.SELECT })

    if (!project.length) {
        console.error("user not registered!")
        req.flash('danger', 'Login failed : email is wrong')
        return res.redirect('/login')
    }

    bcrypt.compare(inputPassword, project[0].password, (err, result) => {
        if (err) {
            req.flash('danger', 'Login failed : Internal Server Error!')
            console.error("Login : Internal Server Error!")
            return res.redirect('/login')
        }

        if (!result) {
            console.error("Password is wrong!")
            req.flash('danger', 'Login failed : password is wrong!')

            return res.redirect('/login')
        }

        console.log('Login success!')
        req.flash('success', 'Login success!')
        req.session.isLogin = true
        req.session.user = {
            name : project[0].name,
            email : project[0].email
        }

        res.redirect('/')
    })
}

async function home(req, res) {
    const query = 'SELECT * FROM projects';
    const projects = await sequelize.query(query, { type: QueryTypes.SELECT });

    //Calculate duration
    projects.forEach(project => {
        project.duration = calculateDuration(project.start_date, project.end_date);
    });

    const isLogin = req.session.isLogin;
    const user = req.session.user;

    console.log("ini data blogs dari database", projects);
    res.render('index', { data: projects, user: req.session.user, isLogin, user });
}

function addProjectView(req, res) {
    res.render('addProject');
}

async function addProject(req, res) {
    const { inputName, inputStart, inputEnd, inputDescription, nodeJs, nextJs, reactJs, typescript } = req.body;
    const image = "1.jpg";

    // Convert checkbox data to an array
    const technologiesArray = [];
    if (nodeJs) technologiesArray.push('nodeJs');
    if (nextJs) technologiesArray.push('nextJs');
    if (reactJs) technologiesArray.push('reactJs');
    if (typescript) technologiesArray.push('typescript');

    // Join the array into a string with curly braces and commas
    const technologiesString = `{${technologiesArray.join(',')}}`;

    const query = `
        INSERT INTO projects(
            name, 
            start_date, 
            end_date, 
            description, 
            technologies, 
            image
        ) VALUES (
            :name, 
            :start_date, 
            :end_date, 
            :description, 
            :technologies, 
            :image
        )
    `;

    const project = await sequelize.query(query, {
        replacements: {
            name: inputName,
            start_date: inputStart,
            end_date: inputEnd,
            description: inputDescription,
            technologies: technologiesString,
            image: image
        },
        type: QueryTypes.INSERT
    });

    console.log("Data berhasil diinsert", project);

    res.redirect('/');
}


async function updateProjectView(req, res) {
    const id = req.params.id;

    const query = `SELECT * FROM projects WHERE id=${id}`
    const projects = await sequelize.query(query, { type: QueryTypes.SELECT })

    console.log("data :", projects);
    res.render('update-project', { data: projects[0] });
}

async function updateProject(req, res) {
    const { id, inputName, inputStart, inputEnd, inputDescription, nodeJs, nextJs, reactJs, typescript } = req.body;

    const technologiesArray = [];
    if (nodeJs) technologiesArray.push('nodeJs');
    if (nextJs) technologiesArray.push('nextJs');
    if (reactJs) technologiesArray.push('reactJs');
    if (typescript) technologiesArray.push('typescript');

    // Join the array into a string with curly braces and commas
    const technologiesString = `{${technologiesArray.join(',')}}`;

    const query = `
        UPDATE projects 
        SET 
            name='${inputName}',
            start_date='${inputStart}',
            end_date='${inputEnd}',
            description='${inputDescription}',
            technologies='${technologiesString}'
        WHERE id=${id}
    `;

    try {
        const project = await sequelize.query(query, {
            type: QueryTypes.UPDATE
        });

        console.log("Project berhasil diupdate!", project);

        res.redirect('/');
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).send("Internal Server Error");
    }
}


function testimonials(req, res) {
    res.render('testimonials');
}

async function deleteProject(req, res) {
    const { id } = req.params

    const query = `DELETE FROM projects WHERE id=${id}`
    const project = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("berhasil delete project", project)

    res.redirect('/')
}

async function detail(req, res) {
    const { id } = req.params

    const query = `SELECT * FROM projects WHERE id=${id}`
    const project= await sequelize.query(query, { type: QueryTypes.SELECT })
    const technologies = {
        nodeJs: project[0].technologies.includes('nodeJs') ? '<img src="/assets/image/logoNodejs.png" style="width: 40px; height: 35px; margin-right: 15px">' : '',
        reactJs: project[0].technologies.includes('reactJs') ? '<img src="/assets/image/logoReactjs.png" style="width: 40px; height: 35px; margin-right: 15px">' : '',
        nextJs: project[0].technologies.includes('nextJs') ? '<img src="/assets/image/logoNextjs.png" style="width: 40px; height: 35px; margin-right: 15px">' : '',
        typeScript: project[0].technologies.includes('typescript') ? '<img src="/assets/image/logotypescript.png" style="width: 40px; height: 35px; margin-right: 15px">' : ''
    };

    console.log("detail project", project)
    console.log("technologies", technologies)

    res.render('detail-project', { data: { ...project[0], technologies } });

}

function contact(req, res) {
    res.render('contact');
}

function calculateDuration(start, end) {
    const startDate = moment(start);
    const endDate = moment(end);

    const duration = moment.duration(endDate.diff(startDate));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    if (years > 0) {
        return years + (years > 1 ? " tahun" : " tahun");
    } else if (months > 0) {
        return months + (months > 1 ? " bulan" : " bulan");
    } else if (days > 0) {
        return days + (days > 1 ? " hari" : " hari");
    } else {
        return "Kurang dari 1 hari";
    }
}

function requireLogin(req, res, next) {
    if (!req.session.isLogin) {
        req.flash('danger', 'You must be logged in to access this page.');
        return res.redirect('/login');
    }
    next();
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
