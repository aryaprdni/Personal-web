const express = require('express');
const path = require('path');
const moment = require('moment');
const hbs = require('hbs');
const { Sequelize, QueryTypes } = require('sequelize');

const app = express();
const port = 5000;
const config = require('./src/config/config.json');
const sequelize = new Sequelize(config.development);
const data = [];

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));

// Handlebars helpers
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
app.get('/', home);
app.get('/add-project', addProjectView);
app.post('/add-project', addProject);
app.post('/delete-project/:id', deleteProject);
app.get('/update-project/:id', updateProjectView);
app.post('/update-project', updateProject);
app.get('/testimonials', testimonials);
app.get('/detail-project/:id', detail);
app.get('/contact', contact);

// Route Handlers
async function home(req, res) {
    const query = 'SELECT * FROM projects';
    const projects = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log("ini data blogs dari database", projects);
    res.render('index', { data: projects });
}

function addProjectView(req, res) {
    res.render('addProject');
}

function addProject(req, res) {
    const inputName = req.body.inputName;
    const inputDescription = req.body.inputDescription;
    const inputStart = new Date(req.body.inputStart);
    const inputEnd = new Date(req.body.inputEnd);
    let { nodeJs, reactJs, nextJs, typescript } = req.body;
    const checkboxes = [nodeJs, nextJs, reactJs, typescript];

    console.log("Nama Project  :", inputName);
    console.log("Start date :", req.body.inputStart);
    console.log("End date :", req.body.inputEnd);
    console.log('Technologies :', checkboxes);

    if (nodeJs == 'on') {
        nodeJs = true;
    }

    if (reactJs == 'on') {
        reactJs = true;
    }

    if (nextJs == 'on') {
        nextJs = true;
    }

    if (typescript == 'on') {
        typescript = true;
    }

    const duration = calculateDuration(inputStart, inputEnd);

    const logos = {
        nodeJs: req.body.nodeJs ? '<img src="assets/image/logoNodejs.png" style="width: 40px; height: 35px;">' : '',
        nextJs: req.body.nextJs ? '<img src="assets/image/logoNextjs.png" style="width: 40px; height: 35px;">' : '',
        reactJs: req.body.reactJs ? '<img src="assets/image/logoReactjs.png" style="width: 40px; height: 35px;">' : '',
        typeScript: req.body.typescript ? '<img src="assets/image/logoTypescript.png" style="width: 25px; height: 25px;">' : ''
    };

    const dataProject = { inputName, inputStart, inputEnd, inputDescription, checkboxes, duration, logos, nodeJs, reactJs, nextJs, typescript };

    data.unshift(dataProject);
    res.redirect('/');
}

function updateProjectView(req, res) {
    const id = req.params.id;

    const dataFilter = data[parseInt(id)];
    dataFilter.id = parseInt(id);

    dataFilter.inputStart = moment(dataFilter.inputStart).format('YYYY-MM-DD');
    dataFilter.inputEnd = moment(dataFilter.inputEnd).format('YYYY-MM-DD');

    console.log("dataFilter", dataFilter);
    res.render('update-project', { data: dataFilter });
}

function updateProject(req, res) {
    const { inputName, inputStart, inputEnd, inputDescription, id } = req.body;
    console.log("Id :", id);
    console.log("Nama Project :", inputName);
    console.log("Nama Deskripsi:", inputDescription);

    data[parseInt(id)] = {
        inputName,
        inputDescription,
        inputStart,
        inputEnd
    };

    res.redirect('/');
}

function testimonials(req, res) {
    res.render('testimonials');
}

function deleteProject(req, res) {
    const { id } = req.params;

    data.splice(id, 1);
    res.redirect('/');
}

function detail(req, res) {
    const id = parseInt(req.params.id);

    if (id >= 0 && id < data.length) {
        const project = data[id];
        res.render('detail', { data: project, start: project.inputStart, end: project.inputEnd });
    } else {
        res.status(404).send('Project not found!');
    }
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

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
