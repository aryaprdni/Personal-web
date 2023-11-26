let dataMyProjects = [];

function submitData(event) {
    event.preventDefault();

    const projectName = document.getElementById('inputName').value;
    const startDate = new Date(document.getElementById('inputStart').value);
    const endDate = new Date(document.getElementById('inputEnd').value);
    const description = document.getElementById('inputMessage').value;
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
        <div class="card p-3 m-3 col-12 col-md-6 shadow-sm " style="max-height: 500px; max-width: 400px; box-sizing: border-box;">
        <img src="${project.uploadedImage}" class="card-img-top" alt="Project Image" style="height: 50%; width: 100%;">
        <div class="card-body">
        <h4 class="card-title" style="margin-top: -10px;"><a href="/detail" style="text-decoration:none;">${project.projectName}</a></h4>
        <div class="card-subtitle mb-4" style="font-size: 1em; color: #666;"> Durasi : ${project.duration}</div>
        <p class="card-content">
            ${project.description} <br> Happy Download
        </p>
        <div class="card-icon mb-3">
            <span>${project.nodeJs ? '<i class="fa-brands fa-node mx-2"></i>' : ''}</span>
            <span>${project.reactJs ? '<i class="fa-brands fa-react"></i>' : ''}</span>
            <span>${project.nextJs ? '<img src="assets/image/logoNextjs.png" style="width: 40px; height: 35px;">' : ''}</span>
            <span>${project.typescript ? '<img src="assets/image/logoTypescript.png" style="width: 25px; height: 25px;">' : ''}</span>
        </div>
        <div class="text-center">
            <a href="#" class="btn btn-dark" style="width: 49%;">Edit</a>
            <a href="#" class="btn btn-dark" style="width: 49%;">Delete</a>
        </div>
        </div>
        </div>
        `

            
    }
}

