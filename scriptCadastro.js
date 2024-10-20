const userFormRegister = document.getElementById('user-form-register')
const userList = document.getElementById('user-list')

function listUsers() {
    fetch('http://localhost:3000/usuario')
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = ''
            data.forEach(user => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${user.id} - Nome: ${user.nome} - Email: ${user.email} - Senha: ${user.senha}`

                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Excluir'
                deleteButton.addEventListener('click', () => deleteUser(user.id))
                li.appendChild(deleteButton)

                const updateButton = document.createElement('button')
                updateButton.textContent = 'Atualizar'
                updateButton.addEventListener('click', () => updateUser(user.id))
                li.appendChild(updateButton)

                userList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

userFormRegister.addEventListener('submit', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('emailRegister').value
    const senha = document.getElementById('senhaRegister').value

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, email: email, senha: senha}),
    })
        .then(response => response.json())
        .then(() => {
            userList()
            userFormRegister.reset()
            window.location.href = "../screens/login.html"
        })
        .catch(error => console.error('Erro:', error))
})

var checarSenha = function() {
    if (document.getElementById('senhaRegister').value ==
      document.getElementById('confirmar-senha').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'As senhas estão iguais';
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'As senhas não estão iguais';
    }
}

// delete
function deleteUser(id) {
    fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'DELETE'
    })
        .then(() =>  {
            listUsers()
        })
        .catch(error => console.error('Erro', error))
}

// update
function updateUser(id){

    const nome = document.getElementById('nome').value
    const email = document.getElementById('emailRegister').value
    const senha = document.getElementById('senhaRegister').value

    if(nome.trim() === '' && email.trim() === '' && senha.trim() === ''){
        alert("Preencha ao menos um dos campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome: nome, email: email, senha: senha}),
        })
            .then(response => response.json())
            .then(() => {
                listUsers()
                userFormRegister.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listUsers()