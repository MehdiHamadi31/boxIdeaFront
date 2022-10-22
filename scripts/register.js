//traitement du form register

const formR = document.getElementById("form-register");
formR?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("firstname", formR.firstname.value);
  formData.append("lastname", formR.lastname.value);
  formData.append("profile", formR.profile.files[0]);
  formData.append("mail", formR.mail.value);
  formData.append("password", formR.password.value);

  const responseR = await fetch(addressBack + "/register", {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-type": undefined,
    },
    body: formData,
  });
  const jsonR = await responseR.json();
  if (jsonR.login && !jsonR.error) {
    localStorage.setItem("login", "true");
    localStorage.setItem("token", jsonR.token);
    window.location.href = "/ideaBoxFront/membres.html";
  } else {
    document.querySelectorAll("input").forEach((input) => {
      input.classList.add("error");
    });
  }
});
