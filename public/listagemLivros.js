// Adicionar gêneros ao select
async function popularDropDownGenero(){
    const lista = document.getElementById("genero");

    const resposta = await fetch('/genero', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const generos = await resposta.json(); // Corrigido aqui

    // Opção não selecionavel padrao
    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione um gênero";
    optionPadrao.disabled = true;
    optionPadrao.selected = true;
    lista.appendChild(optionPadrao);

    // Generos
    generos.forEach(genero => {
        // console.log(genero);
        const option = document.createElement("option");
        option.value = genero.pk_idgenero;
        option.textContent = genero.nomegenero;
        lista.appendChild(option);
    });
}

// Adicionar livros
async function popularDropDownGeneroLivro(){
    const lista = document.getElementById("livros");

    const resposta = await fetch('/livro', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const livros = await resposta.json();
    const genero = document.getElementById("genero");

    const itens = ['isbn', 'titulo', 'autor', 'descricao', 'genero'];
    const corpoTabela = document.getElementById("corpo-tabela");

    livros.forEach(livro => {

            const linha = document.createElement("tr");
        
            itens.forEach(campo => {
                const td = document.createElement("td");
                td.textContent = livro[campo];
                linha.appendChild(td);
        });
        corpoTabela.appendChild(linha);
    });
    
}

window.addEventListener('DOMContentLoaded', () => {
    popularDropDownGenero();
    popularDropDownGeneroLivro();
})