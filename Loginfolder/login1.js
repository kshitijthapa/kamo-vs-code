document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(".container");
    const registerBtn = document.querySelector(".register-btn");
    const loginBtn = document.querySelector(".login-btn");

    // Check which page mode was requested
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    // Open the correct side when page loads
    if (mode === "register") {
        container.classList.add("active");
    } else {
        container.classList.remove("active");
    }

    // Register button inside auth page
    if (registerBtn) {
        registerBtn.addEventListener("click", function (event) {
            event.preventDefault();
            container.classList.add("active");
        });
    }

    // Login button inside auth page
    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault();
            container.classList.remove("active");
        });
    }

});