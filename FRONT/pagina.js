const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

if(!user) {
    alert("No estan autorizado. redirigiendo al login");
    window.location.href = "login.html"
}

if(![1, 2].includes(user.rol)) {
    alert("No tienes permisos para acceder a esta pagina");
    window.location.href = "login.html";
}

document.getElementById("welcome").textContent = `Bienvenido ${user.nombre}`;