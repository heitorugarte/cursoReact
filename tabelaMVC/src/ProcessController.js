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
     * @var {int} idTarefas - Utilizada para controlar o ID único de cada tarefa adicionada.
     */
    constructor() {
        this.idTarefas = 1;
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
     * @param {string} descricao
     * @param {string} status
     */
    criarTarefa = (descricao, status) => {
        if (!this.stringVazia(descricao)) {
            let tarefa = new Tarefa(descricao, status);
            view.adicionarTarefa(tarefa);
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
     * @param {string} string
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
     */
    popularDropdown = () => {
        processController.limparDropdown();
        let quantidade = view.getQuantidadeElementosTbody();
        for (let index = 0; index < quantidade; index++) {
            view.adicionarOpcaoDropdown(index);
        }
    }
}