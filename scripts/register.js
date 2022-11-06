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
      firstname: formR.firstname.value,
      lastname: formR.lastname.value,
      mail: formR.mail.value,
      password: formR.password.value,
    }),
  });
  const jsonR = await responseR.json();
  if (jsonR.login && !jsonR.error) {
    localStorage.setItem("login", "true");
    localStorage.setItem("token", jsonR.token);
    window.location.href = "/ideaBoxFront/membres.html";
  } else {
    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("error");
      input.nextElementSibling.classList.remove("hidden");
    });
  }
});
