function handleSignup(role = "user") {
    document.querySelector("form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await res.json();
        alert(data.message || data.error);
        if (res.ok) {
            window.location.href = role === "admin" ? "adminlogin.html" : "login.html";
        }
    });
}

function handleLogin(isAdmin = false) {
    document.querySelector("form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        alert(data.message || data.error);
        if (res.ok) {
            if (isAdmin && data.role === "admin") {
                window.location.href = "server/public/admin.html";
            } else if (!isAdmin && data.role === "user") {
                window.location.href = "mainafterlogin.html"; 
            } else {
                alert("Access denied: wrong role");
            }
        }
    });
}
