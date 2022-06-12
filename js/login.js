const elLoginInputUsername = document.querySelector(".login__input-username");
const elLoginInputPassword = document.querySelector(".login__input-password");
const elLoginForm = document.querySelector(".login__form");
const elSignupFullname = document.querySelector(".signup__fullname");
const elSignupUsername = document.querySelector(".signup__username");
const elSignuppassword = document.querySelector(".signup__password");
const elSignupPhone = document.querySelector(".signup__phone");
const elSignupForm = document.querySelector(".signup__form");

elSignupForm.addEventListener("submit", (evt) => {
  
  evt.preventDefault();

  let signupFullnameValue = elSignupFullname.value.trim();
  let signupUsernameValue = elSignupUsername.value.trim();
  let signupPasswordValue = elSignuppassword.value.trim();
  let signupPhoneValue = elSignupPhone.value.trim();

  fetch("https://online-excel-heroku.herokuapp.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      fullName: signupFullnameValue,
      username: signupUsernameValue,
      password: signupPasswordValue,
      phone: signupPhoneValue,
    }),
  }).then((res) => console.log(res));

  elSignupFullname.value = null;
  elSignupUsername.value = null;
  elSignuppassword.value = null;
  elSignupPhone.value = null;
});

elLoginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let loginUsernameValue = elLoginInputUsername.value.trim();
  let loginPasswordValue = elLoginInputPassword.value.trim();

  fetch("https://online-excel-heroku.herokuapp.com/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: loginUsernameValue,
      password: loginPasswordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
        let token = data?.data.data.accessToken
        console.log(token);
      if (token && loginPasswordValue == 10062001) {
        window.localStorage.setItem("token", token);
        window.location.replace("index.html");
      }
    });
});
