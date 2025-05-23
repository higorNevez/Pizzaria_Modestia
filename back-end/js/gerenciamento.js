// Função para adicionar pizza
function adicionarPizza(nome, descricao, precoP, precoM, precoG, imagem) {
    let pizzas = JSON.parse(localStorage.getItem('pizzas')) || [];
    const novaPizza = {
        nome,
        descricao,
        precoP,
        precoM,
        precoG,
        imagem,
    };

    pizzas.push(novaPizza);
    localStorage.setItem('pizzas', JSON.stringify(pizzas));

    // Enviar dados para o servidor com FormData
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('precoP', precoP);
    formData.append('precoM', precoM);
    formData.append('precoG', precoG);
    formData.append('imagem', imagem);

    fetch('../../back-end/php/salvar_pizza.php', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.sucesso) {
                console.log('Pizza salva no banco de dados!');
                atualizarListaPizzas();
            } else {
                console.error('Erro ao salvar pizza:', data.erro);
            }
        })
        .catch((err) => console.error('Erro de comunicação:', err));
}

// Função para atualizar lista de pizzas
function atualizarListaPizzas() {
    const listaPizzas = document.getElementById('lista-pizzas');
    listaPizzas.innerHTML = '';

    fetch('../../back-end/php/buscar_pizzas.php') // Endpoint que retorna as pizzas do banco
        .then((response) => response.json())
        .then((pizzas) => {
            if (Array.isArray(pizzas)) {
                pizzas.forEach((pizza) => {
                    listaPizzas.innerHTML += `
                                <li>
                                    <img src="${pizza.imagem}" alt="${pizza.nome}" style="width: 50px; height: 50px;"/>
                                    <strong>${pizza.nome}</strong> - ${pizza.descricao}<br>
                                    Preços: P - R$${pizza.precoP}, M - R$${pizza.precoM}, G - R$${pizza.precoG}
                                    <button onclick="removerPizza(${pizza.id})">Remover</button>
                                </li>
                            `;
                });
            } else {
                console.error('Formato de dados inválido.');
            }
        });
}

// Função para remover pizza
function removerPizza(id) {
    fetch('../../back-end/php/remover_pizza.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.sucesso) {
                console.log('Pizza removida com sucesso!');
                atualizarListaPizzas(); // Atualiza a lista após a remoção
            } else {
                console.error('Erro ao remover pizza:', data.erro);
            }
        })
        .catch((err) => console.error('Erro de comunicação:', err));
}

// Evento para enviar o formulário de adição de pizza
document
    .getElementById('form-add-pizza')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('pizza-nome').value;
        const descricao = document.getElementById('pizza-descricao').value;
        const precoP = document.getElementById('pizza-preco-p').value;
        const precoM = document.getElementById('pizza-preco-m').value;
        const precoG = document.getElementById('pizza-preco-g').value;

        const imagemInput = document.getElementById('imagem');
        const imagemUrl = imagemInput.files[0];

        adicionarPizza(nome, descricao, precoP, precoM, precoG, imagemUrl);
    });

// Atualiza a lista de pizzas quando a página for carregada
window.onload = function () {
    atualizarListaPizzas();
};

// Função para pré-visualizar a imagem selecionada
document.getElementById('imagem').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
