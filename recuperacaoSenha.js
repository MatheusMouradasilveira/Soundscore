const recoveryForm = document.getElementById('recovery-form');
const successMessage = document.getElementById('success-message');

recoveryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('emailRecover').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    fetch('http://localhost:3000/usuario')
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar dados dos usuários');
            }
            return response.json();
        })
        .then(data => {
            const usuarioEncontrado = data.find(user => user.email === email);

            if (usuarioEncontrado) {
                if (novaSenha === confirmarSenha) {
                    const id = usuarioEncontrado.id;

                    fetch(`http://localhost:3000/usuario/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ senha: novaSenha }),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Falha ao atualizar a senha do usuário');
                            }
                            return response.json();
                        })
                        .then(() => {
                            window.location.href = "../index.html";
                        })
                        .catch(error => console.error('Erro:', error))
                } else {
                    alert('As senhas não coincidem. Por favor, tente novamente.');
                }
            } else {
                alert("Email não encontrado. Por favor, verifique o email e tente novamente.");
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});