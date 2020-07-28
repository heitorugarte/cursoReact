/**
 * Classe Tarefa
 * 
 * @summary - Modelo de um objeto Tarefa
 */
class Tarefa {
    constructor(descricao, status) {
        this.id = processController.idTarefas++;
        this.descricao = descricao;
        this.status = status;
    }
}