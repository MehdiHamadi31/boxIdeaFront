// Navigation
const addressBack = "http://127.0.0.1:3333";
const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

burger.addEventListener("click", () => {
  mobileNav.classList.toggle("hide");
});

if (localStorage.getItem("login") === "true") {
  document.querySelectorAll('a[href="index.html"]').forEach((a) => {
    a.classList.add("hidden");
  });
} else {
  document.querySelectorAll('nav a:not([href="index.html"])').forEach((a) => {
    a.classList.add("hidden");
  });
}

//Footer
document.querySelector("footer button")?.addEventListener("click", () => {
  fetch(addressBack + "/logout");
  localStorage.setItem("login", "false");
  window.location.href = "/ideaBoxFront/";
});

//Index.js
const form = document.getElementById("form-index");
form?.addEventListener("submit", async (event) => {
  event.preventDefault(); //empeche le comportement par defaut
  const response = await fetch(addressBack, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      mail: form.mail.value,
      password: form.password.value,
    }),
  });
  const json = await response.json();
  if (json.login && !json.error) {
    localStorage.setItem("login", "true");
    window.location.href = "/ideaBoxFront/membres.html";
  } else {
    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("error");
    });
  }
});

//projet.js

fetch(addressBack + "/projects/all")
  .then((reponse) => reponse.json())
  .then((projects) => {
    console.log(projects);
    const template = document.querySelector("#templateProject");
    const container = document.querySelector(".container");
    projects.forEach((project) => {
      const clone = document.importNode(template.content, true);
      const button = clone.querySelector("button.vote");
      const totalVote = clone.querySelector(".total-vote");
      clone.querySelector("h3").textContent = project.title;
      clone.querySelector("h3+p").textContent = project.description;
      clone.querySelector("span.name").textContent = project.member.firstname;

      if (project.isAlreadyVoted) {
        button.remove();
        const plural = project.totalVotes > 1 ? "s" : "";
        totalVote.textContent = project.totalVotes + " vote" + plural;
      } else {
        totalVote.remove();
        button.addEventListener("click", async () => {
          const response = await fetch(addressBack + "/vote", {
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              projectId: project.id,
            }),
          });
          const isVoted = await response.json();

          if (isVoted) {
            button.style.backgroundColor = "green";
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            button.style.backgroundColor = "red";
          }
        });
      }
      container.appendChild(clone);
    });
  });
