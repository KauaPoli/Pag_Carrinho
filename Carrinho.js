// Função para gerar a tabela de produtos no carrinho
function gerarTabelaCarrinho() {
    const produtoCarrinho = JSON.parse(localStorage.getItem('produtoCarrinho'));
    const tabelaCarrinho = document.getElementById('tabela-carrinho');

    // Limpa a tabela antes de gerar novamente
    tabelaCarrinho.innerHTML = '';

    if (produtoCarrinho) {
        // Cria uma linha para o produto no carrinho
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>
                <img src="${produtoCarrinho.imagem}" alt="${produtoCarrinho.nome}" style="width: 80px; height: auto;">
                <br>${produtoCarrinho.nome} <br> Tamanho: ${produtoCarrinho.tamanho} | Cor: ${produtoCarrinho.cor}
            </td>
            <td><input type="number" value="${produtoCarrinho.quantidade}" min="1" class="quantidade"></td>
            <td class="preco-unitario">R$ ${produtoCarrinho.preco.toFixed(2).replace('.', ',')}</td>
            <td class="preco-total">R$ ${(produtoCarrinho.quantidade * produtoCarrinho.preco).toFixed(2).replace('.', ',')}</td>
            <td><button class="remover-produto">Remover</button></td>
        `;

        tabelaCarrinho.appendChild(linha);
    }

    calcularTotalFinal(); // Calcula o total inicial
}

// Função para calcular o total final do carrinho
function calcularTotalFinal() {
    const produtoCarrinho = JSON.parse(localStorage.getItem('produtoCarrinho'));
    let totalFinal = 0;

    if (produtoCarrinho) {
        totalFinal = produtoCarrinho.quantidade * produtoCarrinho.preco;
    }

    document.getElementById('total-final').innerText = `R$ ${totalFinal.toFixed(2).replace('.', ',')}`;
}

// Função para remover o produto do carrinho
function removerProduto() {
    localStorage.removeItem('produtoCarrinho'); // Remove o produto do localStorage
    gerarTabelaCarrinho(); // Atualiza a tabela
}

// Adiciona eventos de alteração de quantidade e remoção
document.addEventListener('DOMContentLoaded', () => {
    gerarTabelaCarrinho();

    document.getElementById('tabela-carrinho').addEventListener('input', (e) => {
        if (e.target.classList.contains('quantidade')) {
            const quantidade = e.target.value;
            const produtoCarrinho = JSON.parse(localStorage.getItem('produtoCarrinho'));
            produtoCarrinho.quantidade = parseInt(quantidade);
            localStorage.setItem('produtoCarrinho', JSON.stringify(produtoCarrinho)); // Atualiza o localStorage
            calcularTotalFinal(); // Recalcula o total final
        }
    });

    document.getElementById('tabela-carrinho').addEventListener('click', (e) => {
        if (e.target.classList.contains('remover-produto')) {
            removerProduto(); // Remove o produto
        }
    });
});
