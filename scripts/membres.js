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
      if (!member.owner) {
        const cloneM = document.importNode(templateM.content, true);
        cloneM.querySelector("h3").textContent = member.firstname;
        cloneM.querySelector("h3+p").textContent = member.mail;
        cloneM.querySelector("p.score").textContent = member.voted;
        if (member.profile) {
          
        
          cloneM.querySelector(".wraperImage img").src = addressBack + member.profile;
        }
        grid.appendChild(cloneM);
      } else {
        const ownerContainer = document.getElementById("owner");
        const templateM = document.querySelector("#owner-template");
        const cloneM = document.importNode(templateM.content, true);
        cloneM.querySelector("#owner-lastname").value = member.lastname;
        cloneM.querySelector("#owner-firstname").value = member.firstname;
        cloneM.querySelector("#owner-mail").value = member.mail;
        cloneM.querySelector("#mon-score").textContent = member.voted;
        if (member.profile) {
          
          cloneM.querySelector("#owner-profile").src = addressBack + member.profile;
        }
        ownerContainer.appendChild(cloneM);
        addListenerToForm(document.getElementById("owner-form"));
      }
    });
  });

//Update Member

function addListenerToForm(form) {
  let lastInputsValue = {};
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    
    if (input.name === "profile") {
      
      input.addEventListener("change", async () => {
        const response = await updateProfileValue(input);
      });
    } else {
      input.addEventListener("focus", () => {
        lastInputsValue[input.name] = input.value;
      });
      input.addEventListener("blur", async () => {
        const response = await updateStringValue(input);
        const isOk = await response.json();

        if (!isOk) {
          
          input.value = lastInputsValue[input.name];
        }
      });
    }
  });
}

async function updateStringValue(input) {
  const response = await fetch(addressBack + "/member/update", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      [input.name]: input.value,
    }),
  });
  return response;
}

async function updateProfileValue(input) {
  const formData = new FormData()
  formData.append('profile',input.files[0])
  const response = await fetch(addressBack + '/member/update/profile', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      
    },
    method: "post",
    body: formData
  });
  return response;
}
