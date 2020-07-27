class ProcessController {

    constructor() {
        this.idTarefas = 1;
    }

    criarTarefa = (descricao, status) => {
        if (!this.stringVazia(descricao)) {
            let tarefa = new Tarefa(descricao, status);
            view.adicionarTarefa(tarefa);
        } else {
            view.mostrarAlerta("Descricao da tarefa inválida.");
        }
    }

    stringVazia = (string) => {
        if (string == "") {
            return true;
        } else return false;
    }

    limparDropdown = () => {
        let quantidade = view.getQuantidadeOpcoesDropdown();
        for (let index = 0; index < quantidade; index++) {
            view.removerOpcaoDropdown(index);
        }
    }

    popularDropdown = () => {
        processController.limparDropdown();
        let quantidade = view.getQuantidadeElementosTbody();
        for (let index = 0; index < quantidade; index++) {
            view.adicionarOpcaoDropdown(index);
        }
    }
}