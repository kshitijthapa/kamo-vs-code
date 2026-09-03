function openModal(type) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modalTitle");
  const text = document.getElementById("modalText");

  if (type === "post") {
    title.textContent = "Post a Job";
    text.textContent =
      "Tell nearby workers exactly what you need, where, when and your budget.";
  }

  if (type === "login") {
    title.textContent = "Log in";
    text.textContent =
      "Login is a prototype for now. We will connect authentication in the next build.";
  }

  if (type === "signup") {
    title.textContent = "Create your account";
    text.textContent =
      "Choose whether you want to find work, hire workers, or both.";
  }

  modal.classList.add("open");
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
}

document.getElementById("modal").addEventListener("click", function (event) {
  if (event.target.id === "modal") {
    closeModal();
  }
});

function openJob(title, distance, time, price) {
  openModal("post");

  document.getElementById("modalTitle").textContent = title;

  document.getElementById("modalText").textContent =
    `${distance} · ${time} · ${price}. Job details and applications will be connected to the backend next.`;
}

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const query = document.getElementById("q").value.trim();

  document.getElementById("jobs").scrollIntoView({
    behavior: "smooth"
  });

  if (query) {
    setTimeout(function () {
      alert(`Prototype search for: "${query}"`);
    }, 450);
  }
});