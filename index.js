// Navigation
const addressBack = "http://127.0.0.1:3333";
const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

burger.addEventListener("click", () => {
  mobileNav.classList.toggle("hide"); // toggle agit comme un interrupteur apparait/disparait
});

//on cherche la clé loggin si elle est a true  c 'est que la personne est logger et on supprime alors l accueil
if (localStorage.getItem("login") === "true") {
  document.querySelectorAll('a[href="index.html"]').forEach((a) => {
    a.classList.add("hidden");
  });
  // sinon il n 'est pas connecté et on supprime alors les onglets membres et  projets
} else {
  document.querySelectorAll('nav a:not([href="index.html"])').forEach((a) => {
    a.classList.add("hidden");
  });
}

//Footer

//on selectionne le bouton dans le footer si le footer existe
document.querySelector("footer button") ?.addEventListener("click", () => {
  //on va sur la route qui permet de se delogger
  fetch(addressBack + "/logout");
  //vu qu on se delogue on passe le login a false ce qui va permmettre de faire disparaitre les onglets interdits
  localStorage.setItem("login", "false");
  //une fois delogué on est renvoyer a l 'accueil
  window.location.href = "/ideaBoxFront/";
});


//Index.js

//on capture l 'element qui a l ID form-index, si il existe on va ecouter l'evenement submit et désactiver le comportement par defaut
const form = document.getElementById("form-index");
form ?.addEventListener("submit", async (event) => {
  event.preventDefault();


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

                                                          //TENTATIVES...

//membres.js

fetch(addressBack + "/members/all")
  .then((reponse) => reponse.json())
  .then((members) => {
    const templateM = document.querySelector("#templateMembre");
    const grid = document.querySelector(".grid");
    members.forEach((member) => {
      const cloneM = document.importNode(templateM.content, true);
      cloneM.querySelector("h3").textContent = member.firstname;
      cloneM.querySelector("h3+p").textContent = member.mail;
      grid.appendChild(cloneM);
    });
  });


//formulaire d'ajout de projet.js

function masquer_div(masquer) {
  if (document.getElementById(masquer).style.display == 'none') {
    document.getElementById(masquer).style.display = 'block';
  } else {
    document.getElementById(masquer).style.display = 'none';
  }
}

//traitement du form register

const formR = document.getElementById("form-register");
formR?.addEventListener("submit", async (event) => {
  event.preventDefault();


  const responseR = await fetch(addressBack + "/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      prenom: formR.firstname,
      nom: formR.lastname,
      mail: formR.mail.value,
      password: formR.password.value,
      confirmation: formR.password.value
    }),
  });
  const jsonR = await responseR.json();
  if (jsonR.firstname && jsonR.lastname && jsonR.mail && jsonR.password && !jsonR.error) {
    localStorage.setItem("login", "true");
    window.location.href = "/ideaBoxFront/membres.html";
  } else {
    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("error");
    });
  }
});