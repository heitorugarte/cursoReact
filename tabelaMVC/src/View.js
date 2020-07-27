class View {
    constructor() {
        this.tabela = document.getElementById("tabela");
        this.tBody = tabela.getElementsByTagName("tbody")[0];
        this.tFooter = tabela.getElementsByTagName("tfoot")[0];
        this.txtDescricao = document.getElementById("descricaoTxt");
        this.ddStatus = document.getElementById("dropdownStatus");
        this.btAdicionar = document.getElementById("btAdicionar");
        this.btRemover = document.getElementById("btRemover");
        this.divRemocao = document.getElementById("divRemocao");
        this.divInserir = document.getElementById("divInserir");
        this.btConfirmaRemocao = document.getElementById("btOK");
        this.ddRemover = document.getElementById("indiceRemover");
        this.adicionarListeners();
    }

    adicionarListeners = () => {
        this.btAdicionar.onclick = this.listenerAdicionar;
        this.btRemover.onclick = this.listenerRemover;
        this.btConfirmaRemocao.onclick = this.listenerConfirmaRemocao;
    }

    listenerAdicionar = () => {
        processController.criarTarefa(this.txtDescricao.value, this.ddStatus.value);
    }

    listenerRemover = () => {
        this.toggleDivRemocao();
        processController.popularDropdown();
    }

    listenerConfirmaRemocao = () => {
        this.removerLinhaTbody();
    }

    removerLinhaTbody = () => {
        let indice = parseInt(this.ddRemover.value);
        if (indice != NaN)
            this.tBody.deleteRow(indice);
        this.toggleDivRemocao();
    }

    adicionarTarefa = (tarefa) => {
        let novaLinha = this.adicionarLinhaTbody();

        let celId = this.adicionarCelula(novaLinha, 0);
        let celDesc = this.adicionarCelula(novaLinha, 1);
        let celStatus = this.adicionarCelula(novaLinha, 2);

        celId.innerHTML = tarefa.id;
        celDesc.innerHTML = tarefa.descricao;
        celStatus.innerHTML = tarefa.status;
        this.resetarCampoDescricao();
    }

    adicionarCelula = (linha, indice) => {
        return linha.insertCell(indice);
    }

    resetarCampoDescricao = () => {
        this.txtDescricao.value = '';
    }

    adicionarLinhaTbody = () => {
        return this.tBody.insertRow();
    }

    toggleDivRemocao = () => {
        if ((this.divRemocao.style.display != "inline") && (this.tBody.getElementsByTagName('tr').length > 0)) {
            this.divRemocao.style.display = "inline";
            this.divInserir.style.display = "none";
        } else {
            this.divRemocao.style.display = "none";
            this.divInserir.style.display = "inline";
        }
    }

    getQuantidadeOpcoesDropdown = () => {
        return this.ddRemover.options.length;
    }

    adicionarOpcaoDropdown = (index) => {
        let opcao = document.createElement("option");
        opcao.text = index;
        this.ddRemover.add(opcao);
    }

    removerOpcaoDropdown = (index) => {
        let opcao = this.ddRemover.options[index];
        this.ddRemover.remove(opcao);
    }

    getQuantidadeElementosTbody = () => {
        return this.tBody.getElementsByTagName("tr").length;
    }

    mostrarAlerta = (texto) => {
        alert(texto);
    }
}