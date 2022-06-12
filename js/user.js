let token = window.localStorage.getItem('token')

if (!token) {
  window.location.replace("login.html");
}