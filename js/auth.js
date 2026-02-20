// ================= REGISTER =================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!email.includes("@") || password.length < 6) {
      message.innerText = "Invalid email or password (min 6 chars)";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.email === email)) {
      message.innerText = "Email already exists!";
      return;
    }

    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.classList.remove("text-red-500");
    message.classList.add("text-green-500");
    message.innerText = "Registered Successfully! Redirecting...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const message = document.getElementById("loginMessage");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      user => user.email === email && user.password === password
    );

    if (!validUser) {
      message.innerText = "Invalid credentials!";
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));

    message.classList.remove("text-red-500");
    message.classList.add("text-green-500");
    message.innerText = "Login Successful!";

    setTimeout(() => {
      window.location.href = "home.html"; // غيريها حسب مشروعك
    }, 1000);
  });
}