class Tarefa {
    constructor(descricao, status) {
        this.id = processController.idTarefas++;
        this.descricao = descricao;
        this.status = status;
    }
}