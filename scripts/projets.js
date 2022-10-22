//projet.js

fetch(addressBack + "/projects/all", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((reponse) => reponse.json())
  .then((projects) => {
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
              Authorization: `Bearer ${localStorage.getItem("token")}`,

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

//formulaire d'ajout de projet.js

function masquer_div(masquer) {
  if (document.getElementById(masquer).style.display == "none") {
    document.getElementById(masquer).style.display = "block";
  } else {
    document.getElementById(masquer).style.display = "none";
  }
}
//traitement de la création de projet

const formP = document.getElementById("create-form");
formP?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const responseP = await fetch(addressBack + "/projects/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,

      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: formP.title.value,
      description: formP.description.value,
    }),
  });
  const jsonP = await responseP.json();
  if (jsonP.title && jsonP.description && !jsonP.error) {
    localStorage.setItem("login", "true");
    window.location.href = addressBack + "/projects/all";
  } else {
    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("error");
    });
  }
});
