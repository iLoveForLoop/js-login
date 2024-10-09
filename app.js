const alertPop = document.getElementById("alert");
let usersList = JSON.parse(localStorage.getItem("users"));

const storeToStorage = () => {
  localStorage.setItem("users", JSON.stringify(usersList));
};

const alert = (type, message) => {
  alertPop.classList.add(type);
  alertPop.innerHTML = message;
  alertPop.classList.add("visible-element");
  setTimeout(() => {
    alertPop.classList.remove("visible-element");
    alertPop.classList.remove(type);
  }, 2000);
};

document.addEventListener("DOMContentLoaded", function () {
  // Check if loginForm exists before adding event listener
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMessage = document.getElementById("error-message");

      try {
        if (username === "" || password === "") {
          throw new Error("Please fill in both fields.");
        }

        if (
          usersList.some((data) => data.username === username) &&
          usersList.some((data) => data.password === password)
        ) {
          alert("alert-success", "Log in successfull.");

          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
        } else {
          alert("alert-danger", "Invalid username or password.");
          //   throw new Error("Invalid username or password.");
        }

        errorMessage.textContent = "";
      } catch (error) {
        errorMessage.textContent = error.message;
      }
    });
  }

  // Check if signupForm exists before adding event listener
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const sUsername = document.getElementById("s-username").value;
      const sPassword = document.getElementById("s-password").value;
      const csPassword = document.getElementById("cs-password").value;

      const checker = () => {
        if (
          sPassword === csPassword &&
          !usersList.some((obj) => obj.username === sUsername)
        ) {
          return true;
        }

        return false;
      };

      if (checker()) {
        let newUser = { username: sUsername, password: sPassword };
        usersList.push(newUser);
        storeToStorage();
        alert("alert-success", "Account created successfully.");
      } else {
        alert("alert-danger", "Username already exist!");
      }
    });
  }
});
