let dataMyProjects = [];

function submitData(event) {
    event.preventDefault();

    const projectName = document.getElementById('inputName').value;
    const startDate = document.getElementById('inputStart').value;
    const endDate = document.getElementById('inputEnd').value;
    const description = document.getElementById('message').value;
    const uploadedImage = document.getElementById('inputImage').files[0];

    const inputNodeJs = document.getElementById('inputNodejs').checked;
    const inputReactJs = document.getElementById('inputReactjs').checked;
    const inputNextJs = document.getElementById('inputNextjs').checked;
    const inputTypescript = document.getElementById('inputTypescript').checked;

    document.getElementById('inputStart').value = ''; 
    document.getElementById('inputEnd').value = ''; 

    const reader = new FileReader();

    reader.onload = function (e) {
        const project = {
            projectName: projectName,
            startDate: startDate,
            endDate: endDate,
            description: description,
            uploadedImage: e.target.result,
            nodeJs: inputNodeJs,
            reactJs: inputReactJs,
            nextJs: inputNextJs,
            typescript: inputTypescript,
        };

        dataMyProjects.push(project);
        console.log("dataMyProjects", dataMyProjects);
        renderBlog(dataMyProjects); 
    };

    reader.readAsDataURL(uploadedImage);  // Baca file gambar sebagai data URL
}

function renderBlog(data) {
    const myProjectSection = document.getElementById("myProjectSection");

    myProjectSection.innerHTML = "";

    for (const project of data) {
        myProjectSection.innerHTML += `
            <div class="card">
                <img class="card-image" src="${project.uploadedImage}" alt="Project Image">
                <h2 class="card-title"><a href="detailProject.html">${project.projectName}</a></h2>
                <h3 class="card-subtitle"> Tanggal : ${project.startDate} - ${project.endDate} </h3>
                <p class="card-content">
                    ${project.description} <br> Happy Download
                </p>
                <div class="card-icon">
                    <span>${project.nodeJs ? '<i class="fa-brands fa-node"></i>' : ''}</span>
                    <span>${project.reactJs ? '<i class="fa-brands fa-react"></i>' : ''}</span>
                    <span>${project.nextJs ? '<img src="assets/image/logoNextjs.png" style="width: 40px; height: 35px;">' : ''}</span>
                    <span>${project.typescript ? '<img src="assets/image/logoTypescript.png" style="width: 25px; height: 25px;">' : ''}</span>
                </div>
                <div class="btn">
                    <button class="card-button">edit</button>
                    <button class="card-button">delete</button>
                </div>
            </div>`
    }
}