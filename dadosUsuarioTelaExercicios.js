async function carregarDadosUsuario(userId) {
    try {
        const response = await fetch(`http://localhost:3000/usuario`);
        const dados = await response.json();

        const usuarioDados = dados.find(user => user.id === userId);

        if (!usuarioDados) {
            alert('Usuário não encontrado.');
            return;
        }

        const totalExercicios = usuarioDados.niveis['exercicios-base'] +
                                usuarioDados.niveis['exercicios-estrutura'] +
                                usuarioDados.niveis['exercicios-musical'];

        usuarioDados.niveis['nivel-atual'] = calcularNivel(totalExercicios);

        document.getElementById('nome-usuario').innerText = usuarioDados.nome;
        document.getElementById('email-usuario').innerText = usuarioDados.email;
        document.getElementById('nivel-atual').innerText = usuarioDados.niveis['nivel-atual'];
        document.getElementById('exercicios-base').innerText = usuarioDados.niveis['exercicios-base'];
        document.getElementById('exercicios-estrutura').innerText = usuarioDados.niveis['exercicios-estrutura'];
        document.getElementById('exercicios-musical').innerText = usuarioDados.niveis['exercicios-musical'];

    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }
}

function calcularNivel(totalExercicios) {
    if (totalExercicios >= 17) return 'Profissional';
    if (totalExercicios >= 13) return 'Avançado';
    if (totalExercicios >= 9) return 'Intermediário';
    if (totalExercicios >= 5) return 'Fácil';
    if (totalExercicios <= 4) return 'Iniciante';
}

async function atualizarExercicios(userId, categoria) {
    try {
        const response = await fetch('http://localhost:3000/usuario');
        const dados = await response.json();

        const usuarioDados = dados.find(user => user.id === userId);

        if (!usuarioDados) {
            alert('Usuário não encontrado.');
            return;
        }

        if (categoria === 'base') usuarioDados.niveis['exercicios-base'] += 1;
        if (categoria === 'estrutura') usuarioDados.niveis['exercicios-estrutura'] += 1;
        if (categoria === 'musical') usuarioDados.niveis['exercicios-musical'] += 1;

        const totalExercicios = usuarioDados.niveis['exercicios-base'] +
                                usuarioDados.niveis['exercicios-estrutura'] +
                                usuarioDados.niveis['exercicios-musical'];

        usuarioDados.niveis['nivel-atual'] = calcularNivel(totalExercicios);

        const updateResponse = await fetch(`http://localhost:3000/usuario/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioDados)
        });

        if (!updateResponse.ok) {
            throw new Error('Falha na atualização do servidor');
        }

        document.getElementById('nivel-atual').innerText = usuarioDados.niveis['nivel-atual'];
        document.getElementById('exercicios-base').innerText = usuarioDados.niveis['exercicios-base'];
        document.getElementById('exercicios-estrutura').innerText = usuarioDados.niveis['exercicios-estrutura'];
        document.getElementById('exercicios-musical').innerText = usuarioDados.niveis['exercicios-musical'];

    } catch (error) {
        console.error('Erro ao atualizar exercícios:', error);
    }
}

window.onload = () => {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (isNaN(userId)) {
        alert('Usuário não autenticado. Redirecionando para login...');
        window.location.href = '../index.html';
        return;
    }

    carregarDadosUsuario(userId);
};