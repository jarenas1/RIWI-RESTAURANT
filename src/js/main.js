// Import our custom CSS
import '../scss/styles.scss';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

//Check if the user has initialized his session to change the navbar
const buttons = document.querySelector("#btns");

if(localStorage.getItem('userOnline')==null){
    buttons.innerHTML = `<button type="button" class="btn btn-outline-primary"><a href="./src/pages/signin.html" class="nav-link ">Sign-in</a></button>
                    <button type="button" class="btn btn-outline-primary"><a href="./src/pages/signup.html" class="nav-link ">sign-up</a></button>`;
}else{
    buttons.innerHTML = `<button type="button" id="logout1" class="btn btn-outline-primary"><a href="./signin.html" class="nav-link ">Logout</a></button>
                    <button type="button" class="btn btn-outline-primary"><a href="./src/pages/dashboard.html" class="nav-link ">Dashboard</a></button>`;
                    const logout = document.querySelector('#logout1');
                    logout.addEventListener('click', function(){
                        localStorage.removeItem('userOnline');
                        window.location.href=".index.html";
                    });
                    
}

