class ProcessController {

    constructor() {
        this.idTarefas = 1;
    }

    criarTarefa = (descricao, status) => {
        if (!this.stringVazia(descricao)) {
            let tarefa = new Tarefa(descricao, status);
            viewController.adicionarTarefa(tarefa);
        } else {
            viewController.mostrarAlerta("Descricao da tarefa inválida.");
        }
    }

    stringVazia = (string) => {
        if (string == "") {
            return true;
        } else return false;
    }

    limparDropdown = () => {
        let quantidade = viewController.getQuantidadeOpcoesDropdown();
        for (let index = 0; index < quantidade; index++) {
            viewController.removerOpcaoDropdown(index);
        }
    }

    popularDropdown = () => {
        let quantidade = viewController.getQuantidadeElementosTbody();
        for (let index = 0; index < quantidade; index++) {
            viewController.adicionarOpcaoDropdown(index);
        }
    }
}