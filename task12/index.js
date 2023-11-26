const express = require('express')
const path = require('path')
const moment = require('moment')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) // body parser, extended : false -> querystring, extended : true -> menggunakan querystring third party -> qs

app.get('/', home)

app.get('/add-project', addProjectView)
app.post('/add-project', addProject)
app.post('/delete-project/:id', deleteProject)

app.get('/update-project/:id', updateProjectView)
app.post('/update-project', updateProject)

app.get('/testimonials', testimonials)
app.get('/detail-project/:id', detail)
app.get('/contact', contact)

const data = []

function home(req, res) {
    res.render('index', { data });
}

function addProjectView(req, res) {
    res.render('addProject')
}

function addProject(req, res) {
    const inputName = req.body.inputName;
    const inputDescription = req.body.inputDescription;
    const inputStart = new Date(req.body.inputStart);
    const inputEnd = new Date(req.body.inputEnd);
    let {nodeJs, reactJs, nextJs, typescript} = req.body
    const checkboxes = [nodeJs, nextJs, reactJs, typescript];
    
    console.log("Nama Project  :", inputName);
    console.log("Start date :", req.body.inputStart);
    console.log("End date :", req.body.inputEnd);
    console.log('Technologies :', checkboxes);

    if ( nodeJs == 'on'){
        nodeJs = true
    }

    if ( reactJs == 'on'){
        reactJs = true
    }

    if ( nextJs == 'on'){
        nextJs = true
    }

    if ( typescript == 'on'){
        typescript = true
    }

    const duration = calculateDuration(inputStart, inputEnd);

    const logos = {
        nodeJs: req.body.nodeJs ? '<i class="fa-brands fa-node mx-2"></i>' : '',
        nextJs: req.body.nextJs ? '<i class="fa-brands fa-react"></i>' : '',
        reactJs: req.body.reactJs ? '<img src="assets/image/logoNextjs.png" style="width: 40px; height: 35px;">' : '',
        typeScript: req.body.typescript ? '<img src="assets/image/logoTypescript.png" style="width: 25px; height: 25px;">' : ''
    };

    const dataProject = { inputName, inputStart, inputEnd, inputDescription, checkboxes, duration, logos,  nodeJs, reactJs, nextJs, typescript};

    data.unshift(dataProject);
    res.redirect('/');
}


function updateProjectView(req, res){   
    const id = req.params.id

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)

    dataFilter.inputStart = moment(dataFilter.inputStart).format('YYYY-MM-DD');
    dataFilter.inputEnd = moment(dataFilter.inputEnd).format('YYYY-MM-DD');

    console.log("dataFilter", dataFilter)
    res.render('update-project', { data: dataFilter })
}

function updateProject(req, res) {
    const { inputName, inputStart, inputEnd, inputDescription, id } = req.body
    let {nodeJs, reactJs, nextJs, typescript} = req.body

    console.log("Id :", id)
    console.log("Nama Project :", inputName)
    console.log("Nama Deskripsi:", inputDescription)

    data[parseInt(id)] = {
        inputName,
        inputDescription,
        inputStart,
        inputEnd
    };
    
    res.redirect('/')
}

function testimonials (req, res) {
    res.render('testimonials')
}

function deleteProject(req, res) {
    const { id } = req.params

    data.splice(id, 1)
    res.redirect('/')
}

function detail (req, res) {
    const id = parseInt(req.params.id)

    if(id >= 0 && id < data.length) {
        const project = data[id]
        res.render('detail', {data: project, start: project.inputStart, end: project.inputEnd})
    } else {
        res.status(404).send('Project not found!')
    }
}

function contact (req, res) {
    res.render('contact')
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
    console.log(`Server berjalan di port ${port}`)
})