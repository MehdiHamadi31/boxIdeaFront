//Index.js

//on capture l 'element qui a l ID form-index, si il existe on va ecouter l'evenement submit et désactiver le comportement par defaut
const form = document.getElementById("form-index");
form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const response = await fetch(addressBack, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,

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
    localStorage.setItem("token", json.token);
    window.location.href = "/ideaBoxFront/membres.html";
  } else {
    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("error");
      input.nextElementSibling.classList.remove("hidden");
    });
  }
});

