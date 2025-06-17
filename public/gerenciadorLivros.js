const isbn = document.getElementById("isbn");
const titulo = document.getElementById("titulo");
const autor = document.getElementById("autor");
const descricao = document.getElementById("descricao");
const genero = document.getElementById("genero");

// Pegar valores
function getTaskValues(){
    const isbn = document.getElementById("isbn").value;
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const descricao = document.getElementById("descricao").value;
    const genero = document.getElementById("genero").value;

    return {
        "isbn": isbn,
        "titulo": titulo, 
        "autor": autor,
        "descricao": descricao,
        "genero": genero
    }
}

// Limpar campos - limpar select
function limparCampos(){
    isbn.textContent = "";
    titulo.textContent = "";
    autor.textContent = "";
    descricao.textContent = "";
    genero.textContent = optionPadrao;

    isbn.value = "";
    titulo.value = "";
    autor.value = "";
    descricao.value = "";
    genero.value = "";
}

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

    // Gêneros
    generos.forEach(genero => {
        // console.log(genero);
        const option = document.createElement("option");
        option.value = genero.pk_idgenero;
        option.textContent = genero.nomegenero;
        lista.appendChild(option);
    });
}

async function salvarTarefa(){
    const valores = getTaskValues();

    try{
        await fetch('/livro', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify( valores )
        })

        // adicionar modal
    }catch(error){
        console.log(error);
}
    limparCampos();
}

window.addEventListener('DOMContentLoaded', () => {
    popularDropDownGenero();
})