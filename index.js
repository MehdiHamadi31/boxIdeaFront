const addressBack = "http://localhost:3333"
// Navigation
const burger = document.querySelector(".burger");
const mobileNav = document.querySelector(".mobile-nav");

burger.addEventListener("click", () => {
  mobileNav.classList.toggle("hide");
});

if (localStorage.getItem('login')==='true') {
    document.querySelectorAll('a[href="index.html"]').forEach(a => {
        a.classList.add("hidden")
    });
}
    else{
        document.querySelectorAll('nav a:not([href="index.html"])').forEach(a =>{
            a.classList.add("hidden")
        })
        
    }

//Footer
document.querySelector("footer button")?.addEventListener("click",()=>{
    fetch(addressBack+"/logout")
    localStorage.setItem('login','false')
    window.location.href = "/ideaBoxFront/"
})


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
    localStorage.setItem('login','true')
    window.location.href = "/ideaBoxFront/membres.html";
  } else {
    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("error");
    });
  }
});

//  fetch() retourne ensuite une promesse contenant la réponse (si tout se passe bien). On ne peut pas exploiter la réponse renvoyée dans cette promesse en l’état : il faut indiquer le format de réponse souhaité. Ici, on choisit JSON avec response.json().
// //response.json() renvoie également une promesse contenant la réponse à votre demande en JSON. On utilise JSON.stringify() pour transformer notre objet JSON en une chaine JSON et on affiche cette chaine.
// fetch("http://localhost:3333/members/all", { method: "GET" })
//   .then((response) => response.json())
//   //.then(response => alert(JSON.stringify(response)))
//   .then((members) => console.log(members));

// fetch("http://localhost:3333/projects/all", { method: "GET" })
//   .then((response) => response.json())
//   //.then(response => alert(JSON.stringify(response)))
//   .then((projets) => console.log(projets));

// // fetch('http://localhost:3333/register',{method:"POST"})
// // .then(response => response.json())
// //.then(response => alert(JSON.stringify(response)))
// .then(members => (console.log(members)));

// fetch('http://localhost:3333/projects',{method:"POST"})
// .then(response => response.json())
// //.then(response => alert(JSON.stringify(response)))
// .then(projets => (console.log(projets)))
// .then((data) => {
//     let projects = data;

//     projects.map(function(project) {

//       let title = document.createElement('h2');
//       let description = document.createElement('span');
//         array.forEach(project => {

//         title.innerHTML = `${project.name}`;
//         description.innerHTML = `${project.description}`;
//       });
//     });
//   })

// let projet = {
//     member_id : 13,
//     title : "OM",
//     description : "projection du match de ligue des champions"
// }
// fetch('http://localhost:3333/projects',{
//     method:"POST",
//     headers:{
//         "Content-type": "application/json"
// },
//     body: JSON.stringify(projet)
// })
// .then((reponse) => {
//     if(reponse.ok) console.log("Projet crée")
// })
