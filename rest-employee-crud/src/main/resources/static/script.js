document.addEventListener('DOMContentLoaded', function(){
    getAll();
});

let inputName = document.getElementById('nombre');
let inputLastName = document.getElementById('apellido');
let inputAge = document.getElementById('edad');
let inputSalary = document.getElementById('salario');
let inputId = document.getElementById('id');

const getAll = async() => {
    try{
        let response = await fetch('http://localhost:8080/api/employees'),
        data = await response.json();

        if(!response.ok) throw{status: response.status, statusText: response.statusText};
        console.log(data);
        data.forEach(element => {
            let table = document.getElementById('body-table');
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdLastName = document.createElement('td');
            let tdAge = document.createElement('td');
            let tdSalary = document.createElement('td');
            let btnEdit = document.createElement('button');
            let btnDelete = document.createElement('button');
            let tdBtn = document.createElement('td');
            tdName.innerHTML = element.nombre;
            tdLastName.innerHTML = element.apellido;
            tdAge.innerHTML = element.edad;
            tdSalary.innerHTML = element.salario;
            btnEdit.innerHTML = 'Editar';
            btnEdit.dataset.id = element.id;
            btnEdit.dataset.name = element.nombre;
            btnEdit.dataset.lastName = element.apellido;
            btnEdit.dataset.age = element.edad;
            btnEdit.dataset.salary = element.salario;
            btnEdit.classList.add("edit")
            btnDelete.innerHTML = 'Eliminar';
            btnDelete.dataset.id = element.id;
            btnDelete.classList.add("delete")
            tdBtn.appendChild(btnEdit);
            tdBtn.appendChild(btnDelete);

            tr.appendChild(tdName);
            tr.appendChild(tdLastName);
            tr.appendChild(tdAge);
            tr.appendChild(tdSalary);
            tr.appendChild(tdBtn);
            table.appendChild(tr);
        });
    }catch(error){
        console.log(error);
    }
}

document.addEventListener('click', function(e){
    if(e.target.matches(".edit")){
        inputName.value = e.target.dataset.name;
        inputLastName.value = e.target.dataset.lastName;
        inputAge.value = e.target.dataset.age;
        inputSalary.value = e.target.dataset.salary;
        inputId.value = e.target.dataset.id;
    }else if(e.target.matches(".delete")){
        console.log(e.target.dataset.id);
        deleteEmployee(e.target.dataset.id);
    }
});

document.addEventListener('submit', async e => {
    if(e.target === document.getElementById('form')){
        e.preventDefault();
        if(inputId.value == ""){
            try{
                let response = await fetch('http://localhost:8080/api/employees', {
                    method: 'POST',
                    body: JSON.stringify({
                        nombre: inputName.value,
                        apellido: inputLastName.value,
                        edad: inputAge.value,
                        salario: inputSalary.value
                    }),
                    headers:{
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }),
                data = await response.json();
                if(!response.ok) throw{status: response.status, statusText: response.statusText};
                console.log(data);
                cleanForm();
                location.reload();
            }catch(error){
                console.log(error);
            }finally{
                cleanForm();
                location.reload();
            }
        }else{
            try{
                console.log(inputId.value);
                let response = await fetch("http://localhost:8080/api/employees", {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: inputId.value,
                        nombre: inputName.value,
                        apellido: inputLastName.value,
                        edad: inputAge.value,
                        salario: inputSalary.value,
                        
                    }),
                    headers:{
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }),
                data = await response.json();
                if(!response.ok) throw{status: response.status, statusText: response.statusText};
                console.log(data);
                
            }catch(error){
                console.log(error);
            }finally{
                cleanForm();
                location.reload();
            }
        }    
    }     
});

document.getElementById("limpiar").addEventListener('click', function(){
    cleanForm();
});

const cleanForm = () => {
    inputName.value = "";
    inputLastName.value = "";
    inputAge.value = "";
    inputSalary.value = "";
    inputId.value = "";
}

const deleteEmployee = async(id) => {
    try{
        let response = await fetch(`http://localhost:8080/api/employees/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }),
        data = await response.json();
        if(!response.ok) throw{status: response.status, statusText: response.statusText};
        console.log(data);
    }catch(error){
        console.log(error);
    }finally{
        location.reload();
    }
}