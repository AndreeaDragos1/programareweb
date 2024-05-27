async function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    alert(data.message);
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.success) {
        const token = data.token;
        showMessage(token);
    } else {
        alert(data.message);
    }
}

async function showMessage(token) {
    const response = await fetch('/message', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (data.success) {
        document.getElementById('messageContent').innerText = data.message;
        document.getElementById('message').style.display = 'block';
    } else {
        alert(data.message);
    }
}
