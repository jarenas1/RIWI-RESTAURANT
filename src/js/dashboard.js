import "../scss/dashboard.scss";

const table = document.querySelector("#elements");
const btnCreate = document.querySelector(".btn-succes");

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