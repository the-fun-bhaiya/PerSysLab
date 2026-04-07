(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });
  const eye = document.getElementById("eye");
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");

  eye.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });

  const submitBtn = document.querySelector("#submitBtn");
  document
    .querySelector("#form")
    .addEventListener("keypress", async (event) => {
      event.key == "Enter"
        ? submitBtn.click()
        : console.log("you're typing. hehehe...😏");
    });

  submitBtn.addEventListener("click", async (event) => {
    console.log("clicked and blocked");
    event.target.disabled = true;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const data = { username, password };
    console.dir(data);
    const endpoint = submitBtn.dataset.endpoint;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(JSON.stringify(data));

    if (res) event.target.disabled = false;

    const resData = await res.json();
    if (typeof resData.redirectedUrl !== "undefined")
      window.location.assign(resData.redirectedUrl);
    else showPSLToast(resData.msgType, resData.msg);
  });
})();
