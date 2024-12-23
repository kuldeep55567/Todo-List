let email = document.getElementById('email');
let password = document.getElementById('password');
let name = document.getElementById('name');
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let lastUser = 0
    try {
        await fetch("http://localhost:3000/user")
            .then(response => response.json())
            .then(data => {
                lastUser = data.length
                data.forEach(element => {
                    if (email.value === element.email) {
                      return  alert("Email already exists")
                    }
                });
            })
    } catch (error) {
        alert('Error: ', error.message)
    }
    let formData = JSON.stringify({
        id: lastUser + 1,
        email: email.value,
        profile: "https://www.w3schools.com/w3images/avatar2.png",
        password: password.value,
        name: name.value,
        todos: 0,
        role: "user"
    })


    try {
        await fetch("http://localhost:3000/user", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('User created successfully')
                }
            })
    } catch (error) {
        alert('Error: ', error.message)
    }
})