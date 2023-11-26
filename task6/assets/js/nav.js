function toggleHamburger() {
    const navContainer = document.getElementById("hamburger-nav-container");

    if (navContainer.style.display === "none" || navContainer.style.display === "") {
        // Jika elemen sedang disembunyikan, tampilkan
        navContainer.style.display = "flex";
    } else {
        // Jika elemen sedang ditampilkan, sembunyikan
        navContainer.style.display = "none";
    }
}
