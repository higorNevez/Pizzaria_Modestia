function mostrarSecao(secaoId) {
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach((secao) => secao.classList.remove('ativa'));

    document.getElementById(secaoId).classList.add('ativa');
}

function sair() {
    alert('Você saiu da conta.');
    window.location.href = 'login.html';
}
