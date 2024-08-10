import "../scss/signup.scss"
import * as bootstrap from "bootstrap";

//All ids and classes calleds

const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const emailSpan = document.querySelector("#email-span");
const password = document.querySelector("#password");
const passwordSpan = document.querySelector("#password-span");
const confirmPassword = document.querySelect("#confirm");
const confirmSpan = document.querySelector("#confirm-span");

//event


//Functions

//check if the email is already registered
async function checkEmail(email) {
    const response = await fetch(`http://localhost:3000/users`);
    const data = await response.json(); //pass the response from json to jsObject
    if (data.length === 0) {
        return true;
    }else{
        return false;
    }
}