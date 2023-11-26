// function toggleHamburger() {
//     var navContainer = document.getElementById("hamburger-nav-container");

//     if (navContainer.style.display === "none" || navContainer.style.display === "") {
//         // Jika elemen sedang disembunyikan, tampilkan
//         navContainer.style.display = "flex";
//     } else {
//         // Jika elemen sedang ditampilkan, sembunyikan
//         navContainer.style.display = "none";
//     }
// }

const currentPage = window.location.href;

if (currentPage.includes("index.html")) {
    document.getElementById('home-link').classList.add('active');
} else if (currentPage.includes("myProject.html")) {
    document.getElementById('add-project-link').classList.add('active');
} else if (currentPage.includes("testimonial.html")) {
    document.getElementById('testimonial-link').classList.add('active');
}
