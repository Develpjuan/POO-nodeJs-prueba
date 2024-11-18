const params = new URLSearchParams(window.location.search);
const userId = params.get("id");
const btnActualizar = document.getElementById("btnActualizar");

fetch(`http://localhost:3000/api/user/${userId}`)
    .then(response => {
        if(!response.ok) {
            throw new Error('Error al cargar los datos del usuario')
        }
        return response.json();
    })
    .then(user => {
        console.log(user);
        document.getElementById("name").value = user.nombre;
        document.getElementById("email").value = user.email;
    })
    .catch(err => console.error("error al cargar los datos del usuario:", err));


btnActualizar.addEventListener("click", () => {
    const actualizarUsuario = {
        nombre: document.getElementById("name").value,
        email: document.getElementById("email").value
    }

    fetch(`http://localhost:3000/api/user/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(actualizarUsuario)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("Error al actualizar el usuario");
        }
        return response.text();
    })
    .then(message => {
        alert(message);
        window.location.href = "index.html";
    })
    .catch(err => console.error("Error al actualizar el usuario:", err));
});