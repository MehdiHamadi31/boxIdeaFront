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
    const myProjectContainer = document.querySelector(".my-projects-container");

    projects.forEach((project) => {
      const clone = document.importNode(template.content, true);
      const button = clone.querySelector("button.vote");
      const totalVote = clone.querySelector(".total-vote");
      const deleteButton = clone.querySelector(".delete-project");
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
      if (project.owner) {
        deleteButton.dataset.projectId = project.id;
        myProjectContainer.appendChild(clone);
      } else {
        deleteButton.remove();
        container.appendChild(clone);
      }
    });
    addDeleteListeners();
  });

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
  const isOk = await responseP.json();
  if (isOk) {
    location.reload();
  } else {
    document.getElementById("create-project-error").classList.remove("hidden");
  }
});

//Suppression de projet
function addDeleteListeners() {
  document.querySelectorAll(".delete-project").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const projectId = deleteButton.dataset.projectId;

      deleteProjet(projectId);
    });
  });
}

async function deleteProjet(projectId) {
  const response = await fetch(addressBack + "/projects/delete", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      projectId,
    }),
  });
  const isOk = await response.json();
  if (isOk) {
    location.reload()
  }

}

//masquage du form de creation de projet
const cover = document.getElementById("create-project");
const buttonAddProject = document.getElementById("add-project");
cover.querySelector("form").addEventListener("click", (event) => {
  event.stopPropagation();
});
cover.addEventListener("click", () => {
  cover.classList.add("hidden");
  buttonAddProject.classList.remove("hidden");
});
buttonAddProject.addEventListener("click", () => {
  cover.classList.remove("hidden");
  buttonAddProject.classList.add("hidden");
});
