let tabela = document.getElementById("tabela");
let tBody = tabela.getElementsByTagName("tbody")[0];
let tFooter = tabela.getElementsByTagName("tfoot")[0];
let txtDescricao = document.getElementById("descricaoTxt");
let ddStatus = document.getElementById("dropdownStatus");
let btAdicionar = document.getElementById("btAdicionar");
let btRemover = document.getElementById("btRemover");
let divRemocao = document.getElementById("divRemocao");
let divInserir = document.getElementById("divInserir");
let btOk = document.getElementById("btOK");
let ddRemover = document.getElementById("indiceRemover");
btAdicionar.onclick = adicionarLinha;
btRemover.onclick = toggleDivRemocao;
btOk.onclick = removerLinha;

var idTarefa = 1;

function adicionarLinha() {
    if (txtDescricao.value == '') {
        alert("Insira uma descrição para a tarefa.");
        return;
    }
    novaLinha = tBody.insertRow();
    let celId = novaLinha.insertCell(0);
    let celDesc = novaLinha.insertCell(1);
    let celStatus = novaLinha.insertCell(2);

    celId.innerHTML = idTarefa++;
    celDesc.innerHTML = txtDescricao.value;
    celStatus.innerHTML = ddStatus.value;
    txtDescricao.value = '';
}

function toggleDivRemocao() {
    if ((divRemocao.style.display != "inline") && (tBody.getElementsByTagName('tr').length > 0)) {
        divRemocao.style.display = "inline";
        divInserir.style.display = "none";
        popularDropdown();
    } else {
        divRemocao.style.display = "none";
        divInserir.style.display = "inline";
    }
}

function removerLinha() {
    indice = parseInt(ddRemover.value);
    if (indice != NaN)
        tBody.deleteRow(indice);
    toggleDivRemocao();
}

function limparDropdown() {
    quantidade = ddRemover.options.length;
    for (let index = 0; index < quantidade; index++) {
        opcao = ddRemover.options[index];
        ddRemover.remove(opcao);
    }
}

function popularDropdown() {
    limparDropdown();
    quantidade = tBody.getElementsByTagName("tr").length;
    for (let index = 0; index < quantidade; index++) {
        let opcao = document.createElement("option");
        opcao.text = index;
        ddRemover.add(opcao);
    }
}