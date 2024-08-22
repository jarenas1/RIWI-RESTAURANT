import "../scss/dashboard.scss";
import * as bootstrap from "bootstrap";

const table = document.querySelector("#elements");

//modal form elements
const save = document.querySelector("#btn-save");
const form = document.querySelector("#form-modal");

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const image = document.querySelector("#image");


//calling data from api, to print it on the table

async function callingData(table){
    const response = await fetch("http://localhost:3000/carta")
    const data = await response.json();
    console.log(data);
    

    //print data into table
    data.forEach(plato => {
        table.innerHTML += `  <tr>
                            <th scope="row">${plato.id}</th>
                            <td>${plato.nombre}</td>
                            <td class="table-desc"><p >${plato.descripcion}</p></td>
                            <td>${plato.precio}</td>
                            <td lass="table-desc"><img class="form-image" src="${plato.img}" alt=""></td>
                            <td><button id="${plato.id}" type="button" class="btn btn-danger">Delete</button> 
                                <button id="${plato.id}" type="button" class="btn btn-warning">Edit</button>
                            </td>
                        </tr>`
    });
}

callingData(table)


//create new element
async function create(name,description,price,image) {
    const newPlato = {
        nombre: name.value,
        descripcion: description.value,
        precio: price.value,
        img: image.value
    };
    
    //send new plato to api
    await fetch("http://localhost:3000/carta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlato)
    })
    
}


save.addEventListener('click', async function(e){
    e.preventDefault();
    await create(name, description, price,image)
    alert("Plate created successfully");
    form.reset();
})