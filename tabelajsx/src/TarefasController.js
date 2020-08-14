import Tarefa from "../src/Tarefa.js";
import DataBase from "../src/DataBase.js";
/**
 * Classe ProcessController
 *
 * @summary - Classe que trata exclusivamente do processamento e manipulação dos dados
 */
export default class TarefasController {
  /**
   * Construtor
   *
   * @summary - Inicializa variáveis que serão utilizadas no decorrer do documento.
   *
   * @var {array} listaTarefas - Lista de tarefas atualmente alocadas (apresentadas na tabela)
   *
   * @returns {void}
   */
  constructor() {
    this.listaTarefas = [];
    this.dataBase = new DataBase(this);
  }

  async adicionarTarefa(descricao, status) {
    let novaTarefa = new Tarefa(descricao, status);
    novaTarefa = await this.dataBase
      .persistirTarefa(novaTarefa)
      .then(novaTarefa => {
        this.listaTarefas.push(novaTarefa);
        return this.listaTarefas;
      });
  }

  mostrarAlerta = mensagem => {
    alert(mensagem);
  };

  /**
   * notifyAbertura
   *
   * @summary - Ao finalizar a inicialização do banco, chama-se o metodo getTodosObjetos() para atualizar
   * a tabela de tarefas.
   *
   * @returns {void}
   */
  getLista = async () => {
    this.listaTarefas = await this.dataBase.getListaTarefas();
    return this.listaTarefas;
  };

  /**
   * deleteTarefa
   *
   * @summary - Método para deletar uma entrada no banco de dados.
   *
   * @param {int} - ID do objeto à ser deletado no banco.
   *
   * @returns {void}
   */
  deleteTarefa = async key => {
    let retorno = await this.dataBase.deletarObjeto(key);
    return retorno;
  };
}
