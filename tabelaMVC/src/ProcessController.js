/**
 * Classe ProcessController
 * 
 * @summary - Classe que trata exclusivamente do processamento e manipulação dos dados
 */
class ProcessController {

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
    }

    /**
     * CriarTarefa
     * 
     * @summary - Com base nas parâmetros informados pela classe View cria
     * um novo objeto Tarefa para ser adicionado posteriormente na tabela.
     * Primeiramente é feita uma validação se a descrição da tarefa é valida.
     * Caso seja, o objeto Tarefa é instanciado e informado à classe View para
     * que seja incluso na tabela.
     * Caso a descrição seja inválida, um alerta é exibido na tela informando do problema.
     * 
     * @param {string} descricao - descricao da tarefa
     * @param {string} status - status da tarefa
     * 
     * @returns {void}
     */
    criarTarefa = (descricao, status) => {
        if (!this.stringVazia(descricao)) {
            let tarefa = new Tarefa(descricao, status);
            tarefa.id = dataBase.persistirTarefa(tarefa);
        } else {
            view.mostrarAlerta("Descricao da tarefa inválida.");
        }
    }

    /**
     * StringVazia
     * 
     * @summary - Checa se a string informada por parâmetro é uma string válida,
     * ou seja, se possui ao menos um caracter.
     * 
     * @param {string} string - string a ser validada
     * 
     * @returns {boolean}
     */
    stringVazia = (string) => {
        if (string == "") {
            return true;
        } else return false;
    }

    /**
     * LimparDropdown
     * 
     * @summary - Limpa as opções presentes no dropdown de indices de linhas removiveis da tabela.
     * 
     * @returns {void}
     */
    limparDropdown = () => {
        let quantidade = view.getQuantidadeOpcoesDropdown();
        for (let index = 0; index < quantidade; index++) {
            view.removerOpcaoDropdown(index);
        }
    }

    /**
     * PopularDropdown
     * 
     * @summary - Popula o dropdown de indices de linha removives da tabela com base
     * na quantidade de linhas presentes no Tbody informadas pela classe View atraves do metodo
     * view.GetQuantidadeElementosTbody()
     * 
     * @returns {void}
     */
    popularDropdown = () => {
        processController.limparDropdown();
        let quantidade = this.listaTarefas.length;
        for (let index = 0; index < quantidade; index++) {
            view.adicionarOpcaoDropdown(this.listaTarefas[index]);
        }
    }

    /**
     * notifyAbertura
     * 
     * @summary - Ao finalizar a inicialização do banco, chama-se o metodo getTodosObjetos() para atualizar
     * a tabela de tarefas.
     * 
     * @returns {void}
     */
    notifyAbertura = () => {
        dataBase.getTodosObjetos();
    }

    /**
     * setTodosObjetos
     * 
     * @summary - Setter do atributo listaTarefas com as entradas mais recentes no banco de dados.
     * Chamado pela classe DataBase no método getTodosObjetos() após concluir a requisição
     * dos dados no banco.
     * 
     * @param {string} - lista de objetos atualmente armazenados no banco.
     * 
     * @returns {void}
     */
    setTodosObjetos = (listaTarefasBanco) => {
        this.listaTarefas = [];
        listaTarefasBanco.forEach((obj) => {
            this.listaTarefas.push(obj)
        })
        view.refreshTabela(this.listaTarefas);
    }

    /**
     * deleteTarefa
     * 
     * @summary - Método para deletar uma entrada no banco de dados.
     * 
     * @param {int} - ID do objeto à ser deletado no banco.
     * 
     * @returns {void}
     */
    deleteTarefa = (key) => {
        dataBase.deletarObjeto(key);
    }
}