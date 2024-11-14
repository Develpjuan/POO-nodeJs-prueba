const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data);

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));

            alert("login exitoso")

            window.location.href = 'pagina.html';
        } else {
            document.getElementById("message").textContent = data.message || "Error al iniciar sesion";
        }
    } catch(err) {
        console.error("Error:", err);
        document.getElementById("message").textContent = "Error al conectar con el servidor";
    }
})