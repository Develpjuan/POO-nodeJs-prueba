const loadUsersButton = document.getElementById("loadUsers");
const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");


window.addEventListener("load", () => {
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(users => {
            console.log(users);
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                const button = document.createElement('button');
                button.textContent = "Actualizar";
                button.addEventListener("click", () => {
                    window.location.href = `actualizarUsuario.html?id=${user.id}`
                });

                const buttonEliminar = document.createElement('button');
                buttonEliminar.textContent = "Eliminar";
                buttonEliminar.addEventListener("click", () => {
                    eliminarUsuario(user.id);
                })

                li.textContent = `${user.nombre} - ${user.email}`;
                li.appendChild(button);
                li.appendChild(buttonEliminar);
                userList.appendChild(li);
            });
        })
        .catch(err => console.error('Error al cargar los usuarios:', err));
});

userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newUser = {
        nombre: nameInput.value,
        email: emailInput.value,
        password: passInput.value
    };

    fetch('http://localhost:3000/api/users', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })

    .then(response => {
        if(!response.ok) {
            throw new Error('Error al crear el usuario');
        }
        return response.text();
    })
    .then(message => {
        alert(message);
        nameInput.value = '';
        emailInput.value = '';
        passInput.value = '';
    })
    .catch(err => console.error('Error al crear el usuario:', err));
});

function eliminarUsuario(userId) {
    fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("Error al eliminar el usuario");
        }
        return response.text();
    })
    .then(message => {
        alert(message);
        document.getElementById("loadUsers").click();
    })
    .catch(err => console.error("Error al eliminar el usuario:", err));
}