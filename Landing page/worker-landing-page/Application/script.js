
/* =========================================
   SROT — MY APPLICATIONS
   JAVASCRIPT
========================================= */


/* =========================================
   FILTER APPLICATIONS
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const applications = document.querySelectorAll(".application-card");
const searchInput = document.getElementById("applicationSearch");
const noResults = document.getElementById("noResults");


let currentFilter = "all";


function updateApplications() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCount = 0;


    applications.forEach(application => {

        const status =
            application.dataset.status;

        const text =
            application.innerText.toLowerCase();


        const matchesFilter =
            currentFilter === "all" ||
            status === currentFilter;


        const matchesSearch =
            text.includes(searchText);


        if (matchesFilter && matchesSearch) {

            application.style.display = "grid";

            visibleCount++;

        } else {

            application.style.display = "none";

        }

    });


    if (visibleCount === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


/* =========================================
   FILTER BUTTONS
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        updateApplications();

    });

});


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener("input", () => {

    updateApplications();

});


/* =========================================
   WITHDRAW APPLICATION
========================================= */

const withdrawButtons =
    document.querySelectorAll(".withdraw-btn");


withdrawButtons.forEach(button => {

    button.addEventListener("click", () => {

        const jobName =
            button.dataset.job;


        const confirmed =
            confirm(
                `Are you sure you want to withdraw your application for "${jobName}"?`
            );


        if (!confirmed) {
            return;
        }


        const card =
            button.closest(".application-card");


        card.dataset.status = "withdrawn";


        card.style.opacity = "0.55";


        button.textContent =
            "Withdrawn";


        button.disabled = true;


        button.style.cursor =
            "not-allowed";


        updateApplications();

    });

});


/* =========================================
   VIEW JOB BUTTONS
========================================= */

const viewButtons =
    document.querySelectorAll(".outline-btn");


viewButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".application-card");


        const jobTitle =
            card.querySelector("h3").textContent;


        alert(
            `Opening "${jobTitle}" job details...`
        );

    });

});


/* =========================================
   MESSAGE CLIENT
========================================= */

const messageButtons =
    document.querySelectorAll(".message-btn");


messageButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "Opening your conversation with the client..."
        );

    });

});


/* =========================================
   RATE CLIENT
========================================= */

const rateButtons =
    document.querySelectorAll(".rate-btn");


rateButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "Rating system will open here."
        );

    });

});


/* =========================================
   FIND MORE WORK
========================================= */

const findWorkButton =
    document.getElementById("findWorkBtn");


findWorkButton.addEventListener("click", () => {

    window.location.href =
        "worker-dashboard.html";

});


/* =========================================
   PAGINATION
========================================= */

const pageButtons =
    document.querySelectorAll(".page");


pageButtons.forEach(button => {

    button.addEventListener("click", () => {

        pageButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const page =
            button.textContent;


        console.log(
            "Loading application page:",
            page
        );

    });

});


/* =========================================
   PAGE SIZE
========================================= */

const pageSize =
    document.getElementById("pageSize");


pageSize.addEventListener("change", () => {

    console.log(
        "Page size changed to:",
        pageSize.value
    );

});


/* =========================================
   INITIAL LOAD
========================================= */

updateApplications();
