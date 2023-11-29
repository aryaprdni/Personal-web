<<<<<<< HEAD
const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) // body parser, extended : false -> querystring, extended : true -> menggunakan querystring third party -> qs

app.get('/', home)
app.get('/add-project', addProjectView)
app.post('/add-project', addProject)
app.get('/testimonials', testimonials)
app.get('/detail', detail)
app.get('/contact', contact)

function home(req, res) {
    res.render('index')
}

function addProjectView(req, res) {
    res.render('addProject')
}

function addProject(req, res) {
    const projectName = req.body.inputName;
    const inputStart = req.body.inputStart;
    const inputEnd = req.body.inputEnd;
    const inputDescription = req.body.inputDescription;
    const inputNodeJs = req.body.inputNodejs; 
    const inputNextjs = req.body.inputNextjs;
    const inputReactjs = req.body.inputReactjs;
    const inputTypescript = req.body.inputTypescript;

    console.log("Project Name:", projectName);
    console.log("Date start:", inputStart);
    console.log("Date end:", inputEnd);
    console.log("Description:", inputDescription);
    console.log("Node Js:", inputNodeJs);
    console.log("Next Js:", inputNextjs);
    console.log("React Js:", inputReactjs);
    console.log("TypeScript:", inputTypescript);

    res.redirect("/");
}

function testimonials (req, res) {
    res.render('testimonials')
}

function detail (req, res) {
    res.render('detail')
}

function contact (req, res) {
    res.render('contact')
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
=======
const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))
app.use(express.urlencoded({ extended: false })) // body parser, extended : false -> querystring, extended : true -> menggunakan querystring third party -> qs

app.get('/', home)
app.get('/add-project', addProjectView)
app.post('/add-project', addProject)
app.get('/testimonials', testimonials)
app.get('/detail', detail)
app.get('/contact', contact)

function home(req, res) {
    res.render('index')
}

function addProjectView(req, res) {
    res.render('addProject')
}

function addProject(req, res) {
    const projectName = req.body.inputName;
    const inputStart = req.body.inputStart;
    const inputEnd = req.body.inputEnd;
    const inputDescription = req.body.inputDescription;
    const inputNodeJs = req.body.inputNodejs; 
    const inputNextjs = req.body.inputNextjs;
    const inputReactjs = req.body.inputReactjs;
    const inputTypescript = req.body.inputTypescript;

    console.log("Project Name:", projectName);
    console.log("Date start:", inputStart);
    console.log("Date end:", inputEnd);
    console.log("Description:", inputDescription);
    console.log("Node Js:", inputNodeJs);
    console.log("Next Js:", inputNextjs);
    console.log("React Js:", inputReactjs);
    console.log("TypeScript:", inputTypescript);

    res.redirect("/");
}

function testimonials (req, res) {
    res.render('testimonials')
}

function detail (req, res) {
    res.render('detail')
}

function contact (req, res) {
    res.render('contact')
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
>>>>>>> 931f070ce61a5ff0dea420844c0f815f3bb7a41d
})