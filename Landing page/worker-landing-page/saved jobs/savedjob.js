/* =========================
   LUCIDE ICONS
========================= */

lucide.createIcons();



/* =========================
   ELEMENTS
========================= */

const savedJobs =
    document.querySelector("#savedJobs");

const emptyState =
    document.querySelector("#emptyState");

const searchInput =
    document.querySelector("#searchInput");

const sortSelect =
    document.querySelector("#sortSelect");

const resultText =
    document.querySelector("#resultText");

const filters =
    document.querySelectorAll(".filter");

const toast =
    document.querySelector("#toast");



/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}



/* =========================
   GET JOBS
========================= */

function getJobs() {

    return [
        ...document.querySelectorAll(".saved-job")
    ];

}



/* =========================
   UPDATE RESULT COUNT
========================= */

function updateResultCount() {

    const visibleJobs =
        getJobs().filter(
            job => job.style.display !== "none"
        );

    resultText.textContent =
        `${visibleJobs.length} ${
            visibleJobs.length === 1
                ? "job"
                : "jobs"
        } saved`;

}



/* =========================
   FILTER
========================= */

let currentFilter = "all";


filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(item => {

            item.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        filterJobs();

    });

});



/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    filterJobs
);



/* =========================
   FILTER JOBS
========================= */

function filterJobs() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    getJobs().forEach(job => {

        const title =
            job.dataset.title
                .toLowerCase();

        const category =
            job.dataset.category
                .toLowerCase();


        const matchesSearch =
            title.includes(search);


        const matchesFilter =
            currentFilter === "all"
            ||
            category === currentFilter;


        if (
            matchesSearch &&
            matchesFilter
        ) {

            job.style.display = "";

        } else {

            job.style.display = "none";

        }

    });


    updateResultCount();

    checkEmptyState();

}



/* =========================
   SORT
========================= */

sortSelect.addEventListener(
    "change",
    sortJobs
);


function sortJobs() {

    const jobs =
        getJobs();


    const mode =
        sortSelect.value;


    jobs.sort((a, b) => {

        if (mode === "pay") {

            return (
                Number(b.dataset.pay)
                -
                Number(a.dataset.pay)
            );

        }


        if (mode === "distance") {

            return (
                Number(a.dataset.distance)
                -
                Number(b.dataset.distance)
            );

        }


        return (
            Number(b.dataset.saved)
            -
            Number(a.dataset.saved)
        );

    });


    jobs.forEach(job => {

        savedJobs.appendChild(job);

    });

}



/* =========================
   REMOVE SAVED JOB
========================= */

document.addEventListener(
    "click",
    event => {

        const removeButton =
            event.target.closest(
                ".remove-save"
            );


        if (!removeButton) {
            return;
        }


        const job =
            removeButton.closest(
                ".saved-job"
            );


        if (!job) {
            return;
        }


        job.style.opacity = "0";

        job.style.transform =
            "translateY(-6px)";


        setTimeout(() => {

            job.remove();

            updateResultCount();

            checkEmptyState();

            showToast(
                "Job removed from saved jobs."
            );

        }, 200);

    }
);



/* =========================
   APPLY BUTTON
========================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".apply-btn"
            );


        if (!button) {
            return;
        }


        const job =
            button.closest(
                ".saved-job"
            );


        const title =
            job.querySelector(
                ".job-title-row h3"
            ).textContent.trim();


        showToast(
            `Opening application for ${title}`
        );

    }
);



/* =========================
   VIEW DETAILS
========================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".details-btn"
            );


        if (!button) {
            return;
        }


        const job =
            button.closest(
                ".saved-job"
            );


        const title =
            job.querySelector(
                ".job-title-row h3"
            ).textContent.trim();


        showToast(
            `Opening ${title}`
        );

    }
);



/* =========================
   EMPTY STATE
========================= */

function checkEmptyState() {

    const jobs =
        getJobs();


    if (jobs.length === 0) {

        emptyState.classList.add("show");

        savedJobs.style.display =
            "none";

        return;

    }


    const visibleJobs =
        jobs.filter(
            job => job.style.display !== "none"
        );


    if (visibleJobs.length === 0) {

        emptyState.classList.add("show");

        savedJobs.style.display =
            "none";

    } else {

        emptyState.classList.remove("show");

        savedJobs.style.display =
            "";

    }

}


document.querySelectorAll(".remove-save").forEach(button => {

    button.addEventListener("click", function () {

        const icon = this.querySelector("svg");

        this.classList.toggle("saved");

        if (this.classList.contains("saved")) {
            icon.setAttribute("fill", "currentColor");
            icon.setAttribute("stroke", "currentColor");
        } else {
            icon.setAttribute("fill", "none");
            icon.setAttribute("stroke", "currentColor");
        }

    });

});


/* =========================
   INITIAL
========================= */

sortJobs();

updateResultCount();

checkEmptyState();