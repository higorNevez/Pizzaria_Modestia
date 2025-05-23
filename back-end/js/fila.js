document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.getElementById('lista-pedidos');

    tabela.addEventListener('click', (e) => {
        const btn = e.target;
        const linha = btn.closest('tr');
        const statusCell = linha.querySelector('.status-texto');

        if (btn.classList.contains('btn-aceitar')) {
            statusCell.textContent = 'Em preparo';
            linha.className = 'status-preparo';
            atualizarAcoes(linha, ['detalhes', 'concluir', 'cancelar']);
        }

        if (btn.classList.contains('btn-cancelar')) {
            statusCell.textContent = 'Cancelado';
            linha.className = 'status-cancelado';
            atualizarAcoes(linha, ['detalhes']);
        }

        if (btn.classList.contains('btn-concluir')) {
            statusCell.textContent = 'Entregue';
            linha.className = 'status-entregue';
            atualizarAcoes(linha, ['detalhes']);
        }

        atualizarContadores();
    });

    function atualizarAcoes(linha, acoes) {
        const td = linha.querySelector('td:last-child');
        td.innerHTML = ''; // limpa ações

        if (acoes.includes('detalhes')) {
            td.appendChild(criarBotao('📋 Detalhes', 'btn-detalhes'));
        }
        if (acoes.includes('aceitar')) {
            td.appendChild(criarBotao('✅ Aceitar', 'btn-aceitar'));
        }
        if (acoes.includes('rejeitar')) {
            td.appendChild(criarBotao('❌ Rejeitar', 'btn-cancelar'));
        }
        if (acoes.includes('cancelar')) {
            td.appendChild(criarBotao('❌ Cancelar', 'btn-cancelar'));
        }
        if (acoes.includes('concluir')) {
            td.appendChild(criarBotao('✔️ Concluir', 'btn-concluir'));
        }
    }

    function criarBotao(texto, classe) {
        const btn = document.createElement('button');
        btn.className = `btn ${classe}`;
        btn.textContent = texto;
        return btn;
    }

    function atualizarContadores() {
        const linhas = document.querySelectorAll('#lista-pedidos tr');
        let total = 0,
            concluido = 0,
            preparo = 0,
            cancelado = 0;

        linhas.forEach((linha) => {
            total++;
            if (linha.classList.contains('status-entregue')) concluido++;
            else if (linha.classList.contains('status-preparo')) preparo++;
            else if (linha.classList.contains('status-cancelado')) cancelado++;
        });

        document.getElementById('total-dia').textContent = total;
        document.getElementById('concluidos').textContent = concluido;
        document.getElementById('preparo').textContent = preparo;
        document.getElementById('cancelados').textContent = cancelado;
    }

    // Inicializa contadores ao carregar
    atualizarContadores();
});
