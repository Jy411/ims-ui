const apiUrl = "https://go-gin-hello-world-puce.vercel.app";
// const apiUrl = "http://localhost:3000";

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // const username = document.getElementById("username").value;
  // const password = document.getElementById("password").value;

  // const response = await fetch(`${apiUrl}/login`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ username, password }),
  // });

  // if (response.ok) {
  //   const data = await response.json();
  //   localStorage.setItem("token", data.token);
  //   window.location.href = "dashboard.html";
  // } else {
  //   const error = await response.json();
  //   alert(error.message);
  // }
});
