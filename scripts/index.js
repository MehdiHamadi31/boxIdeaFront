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
document.querySelector("footer button")?.addEventListener("click", () => {
  //on va sur la route qui permet de se delogger
  fetch(addressBack + "/logout");
  //vu qu on se delogue on passe le login a false ce qui va permmettre de faire disparaitre les onglets interdits
  localStorage.setItem("login", "false");
  localStorage.setItem("token", null);
  //une fois delogué on est renvoyer a l 'accueil
  window.location.href = "/ideaBoxFront/";
});
