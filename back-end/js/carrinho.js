let carrinho = [];

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarCarrinho();
    }
}

function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        carrinhoDiv.innerHTML += `
                    <div class="carrinho-item">
                        <span>${item.pizza}</span>
                        <span>R$ ${item.preco}</span>
                        <button class="remover-btn" onclick="removerDoCarrinho(${index})">Remover</button>
                    </div>`;
        total += item.preco;
    });

    document.getElementById('total').innerText =
        'Total: R$ ' + total.toFixed(2);
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

carregarCarrinho();

const modal = document.getElementById('enderecoModal');

function abrirModal() {
    modal.style.display = 'block';
}

function fecharModal() {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        fecharModal();
    }
};

document.getElementById('enderecoForm').onsubmit = async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;

    const itens = carrinho.map(item => ({
        nome: item.pizza,
        preco: item.preco,
        quantidade: 1
    }));
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);

    try {
        const response = await fetch('../../back-end/php/salvar_pedido.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome,
                endereco: endereco,
                cidade: cidade,
                cep: cep,
                pagamento: formaPagamento,
                itens: itens,
                total: total
            })
        });

        const resultado = await response.json();

        if (resultado.sucesso) {
            alert('Pedido enviado com sucesso!');
            localStorage.removeItem('carrinho');
            carrinho = [];
            atualizarCarrinho();
            fecharModal();
            window.location.href = "perfil.html";
        } else {
            alert('Erro ao enviar pedido: ' + (resultado.erro || 'Erro desconhecido'));
        }
    } catch (err) {
        console.error(err);
        alert('Erro de conexão com o servidor.');
    }
};