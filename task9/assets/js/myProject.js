<<<<<<< HEAD
let dataMyProjects = [];

function submitData(event) {
    event.preventDefault();

    const projectName = document.getElementById('inputName').value;
    const startDate = new Date(document.getElementById('inputStart').value);
    const endDate = new Date(document.getElementById('inputEnd').value);
    const description = document.getElementById('message').value;
    const uploadedImage = document.getElementById('inputImage').files[0];

    const inputNodeJs = document.getElementById('inputNodejs').checked;
    const inputReactJs = document.getElementById('inputReactjs').checked;
    const inputNextJs = document.getElementById('inputNextjs').checked;
    const inputTypescript = document.getElementById('inputTypescript').checked;

    document.getElementById('inputStart').value = ''; 
    document.getElementById('inputEnd').value = ''; 

    // Periksa apakah startDate dan endDate adalah objek Date yang valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("Invalid startDate or endDate");
        return;
    }
    
    const timeDiff = endDate.getTime() - startDate.getTime();
    const duration = calculateDuration(timeDiff);

    const reader = new FileReader();

    reader.onload = function (e) {
        const project = {
            projectName: projectName,
            duration: duration,
            description: description,
            uploadedImage: e.target.result,
            nodeJs: inputNodeJs,
            reactJs: inputReactJs,
            nextJs: inputNextJs,
            typescript: inputTypescript,
        };

        dataMyProjects.push(project);
        console.log("dataMyProjects", dataMyProjects);
        renderProject(dataMyProjects); 
    };

    reader.readAsDataURL(uploadedImage);  // Baca file gambar sebagai data URL
}


function calculateDuration(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

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

function renderProject(data) {
    const myProjectSection = document.getElementById("myProjectSection");

    myProjectSection.innerHTML = "";

    for (const project of data) {
        myProjectSection.innerHTML += `
            <div class="card">
                <img class="card-image" src="${project.uploadedImage}" alt="Project Image">
                <h2 class="card-title"><a href="detailProject.html">${project.projectName}</a></h2>
                <h3 class="card-subtitle"> Durasi : ${project.duration}</h3>
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
=======
let dataMyProjects = [];

function submitData(event) {
    event.preventDefault();

    const projectName = document.getElementById('inputName').value;
    const startDate = new Date(document.getElementById('inputStart').value);
    const endDate = new Date(document.getElementById('inputEnd').value);
    const description = document.getElementById('message').value;
    const uploadedImage = document.getElementById('inputImage').files[0];

    const inputNodeJs = document.getElementById('inputNodejs').checked;
    const inputReactJs = document.getElementById('inputReactjs').checked;
    const inputNextJs = document.getElementById('inputNextjs').checked;
    const inputTypescript = document.getElementById('inputTypescript').checked;

    document.getElementById('inputStart').value = ''; 
    document.getElementById('inputEnd').value = ''; 

    // Periksa apakah startDate dan endDate adalah objek Date yang valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("Invalid startDate or endDate");
        return;
    }
    
    const timeDiff = endDate.getTime() - startDate.getTime();
    const duration = calculateDuration(timeDiff);

    const reader = new FileReader();

    reader.onload = function (e) {
        const project = {
            projectName: projectName,
            duration: duration,
            description: description,
            uploadedImage: e.target.result,
            nodeJs: inputNodeJs,
            reactJs: inputReactJs,
            nextJs: inputNextJs,
            typescript: inputTypescript,
        };

        dataMyProjects.push(project);
        console.log("dataMyProjects", dataMyProjects);
        renderProject(dataMyProjects); 
    };

    reader.readAsDataURL(uploadedImage);  // Baca file gambar sebagai data URL
}


function calculateDuration(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

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

function renderProject(data) {
    const myProjectSection = document.getElementById("myProjectSection");

    myProjectSection.innerHTML = "";

    for (const project of data) {
        myProjectSection.innerHTML += `
            <div class="card">
                <img class="card-image" src="${project.uploadedImage}" alt="Project Image">
                <h2 class="card-title"><a href="detailProject.html">${project.projectName}</a></h2>
                <h3 class="card-subtitle"> Durasi : ${project.duration}</h3>
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
>>>>>>> 931f070ce61a5ff0dea420844c0f815f3bb7a41d
}