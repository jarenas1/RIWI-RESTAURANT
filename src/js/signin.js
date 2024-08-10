// Import our custom CSS
import "../scss/signin.scss";

import * as bootstrap from "bootstrap";

let form = document.querySelector("#form");
let password = document.querySelector("#password");
let email = document.querySelector("#email");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent form submission
  const user = validateEmail(email);
  if (!user) {
    alert("you are not registered"); //If user is false, it means the user  is not registered
  } else {
    if (user.password === password.value && user.email === email.value) { //we use user.value because user is the object that return the validateEmail
                                                                        //So when we put user. we can acces to the "user" values like emau, password, mail,etc
      alert("Login success"); 
      localStorage.setItem('userOnline', JSON.stringify(user)) //put the sesion in the localStorage, we need pass the user from object to json

    window.location.href="#" //redirect the user
    } else {
      alert("Incorrect password");
    }
  }
});

async function validateEmail(email) {
  const response = await fetch(
    `http://localhost:3000/users?email=${email.value}`
  ); //getting the user where email = request,  using ?
  const data = await response.json(); //tranform the response of the endpoint from json to jsObject to can play whit it

  //if the reques cant get the user with the specified email, will return 0, so the conditionals will be returning false because the user dont exist
  if (data.lenght === 0) {
    return false;
  } else {
    return data[0]; //if the response has any data with this email, they will return an array with the users, we will return only the first position1
  }
}