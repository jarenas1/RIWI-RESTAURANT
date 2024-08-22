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
let idToUpdate = null;

//calling data from api, to print it on the table
async function callingData(table) {
  const response = await fetch("http://localhost:3000/carta");
  const data = await response.json();

  //print data into table
  data.forEach((plato) => {
    table.innerHTML += `  <tr>
                            <th scope="row">${plato.id}</th>
                            <td>${plato.nombre}</td>
                            <td class="table-desc"><p >${plato.descripcion}</p></td>
                            <td>${plato.precio}</td>
                            <td lass="table-desc"><img class="form-image" src="${plato.img}" alt=""></td>
                            <td><button id="${plato.id}" type="button" class="btn btn-danger">Delete</button> 
                                <button id="${plato.id}" type="button" class="btn btn-warning"data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                            </td>
                        </tr>`;
  });
}
callingData(table);

//create new element
async function create(name, description, price, image) {
    const newPlato = {
        nombre: name.value,
        descripcion: description.value,
        precio: price.value,
        img: image.value,
};

  //send new plato to api
    await fetch("http://localhost:3000/carta", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
    body: JSON.stringify(newPlato),
    });
}

//FIND PLATE BY ID, THIS METHOD IS CREATED TO IMPROVE THE UPDATE METHOD
async function findById(id) {
    const response = await fetch(`http://localhost:3000/carta/${id}`);
    const plato = await response.json();
    return plato;
}

//UPDATE
async function update(id, name, description, price, image) {
    const productUpdated = {
        nombre: name.value,
        descripcion: description.value,
        precio: price.value,
        img: image.value,
    };
    await fetch(`http://localhost:3000/carta/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(productUpdated),
    });
}

//WE NEED TO DECIDE WHAT FUNCION WE WILL HAVE BEEN USING, UPDATE OR CREATE
save.addEventListener("click", async function (e) {
    e.preventDefault();
    if (idToUpdate === null) {
        await create(name, description, price, image);
        alert("Plate created successfully");
        form.reset();
    }else {
        await update(idToUpdate, name, description, price, image);
        alert("Plate updated successfully");
        idToUpdate = null;
        form.reset();
        location.reload();
    }
});

//TABLE EVENT, DELETE AND UPDATE
table.addEventListener("click", async function (e) {
  //DELETE
    if (e.target.classList.contains("btn-danger")) {
        const idToDelete = e.target.getAttribute("id");
        await fetch(`http://localhost:3000/carta/${idToDelete}`, {
        method: "DELETE",
    });
    alert("Plate deleted successfully");
    location.reload();

    //UPDATE
    }else if (e.target.classList.contains("btn-warning")) {
    idToUpdate = e.target.getAttribute("id");
    let data = await findById(idToUpdate); //IT IS CALLED TO FILL THE INPUT OF THE MODAL WITH THE PLATE INFORMATION USING THW ID

    //FILL THE INPUTS WITH DE OBJECT DATA
    name.value = data.nombre;
    description.value = data.descripcion;
    price.value = data.precio;
    image.value = data.img;
    }
});
