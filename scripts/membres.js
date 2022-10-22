//membres.js

fetch(addressBack + "/members/all", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
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
