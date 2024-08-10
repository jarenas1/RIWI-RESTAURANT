import "../scss/signup.scss"
import * as bootstrap from "bootstrap";

//All ids and classes calleds

const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordSpan = document.querySelector("#password-span");
const confirmPassword = document.querySelector("#confirm");

//event


//Functions

//check if the email is already registered
async function checkEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`);
    const data = await response.json(); //pass the response from json to jsObject
    if (data.length === 0) {
        return true;
    }else{
        return false;
    }
}

//check if the passwords are the same
function checkPaswords(password,confirmPassword){
    if (confirmPassword.value === password.value){
        return true;
    }else{
        return false;
    }
}

//Create the user and put it on the db

async function add(name,email,password){
    await fetch("http://localhost:3000/users",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //create the object that will be added to the database, remind pass it to jJSON
            name: name.value,
            email: email.value,
            password: password.value
        }),
    })
}



//SPANS

//check if the passwords has +8 characters to dont let continue
function checkPasswordLength(password) {
   if(password.length >= 8){
    return true;
   }else{
    alert("The password cant be less tha 9 characters")
   }
}

//add event for passwordLength and put text in the spans
password.addEventListener("input",(event)=>{
    if (password.value.length < 9) {
        passwordSpan.textContent = "Password must be at least 9 characters long";
    } else {
        passwordSpan.textContent = "";
    }
})