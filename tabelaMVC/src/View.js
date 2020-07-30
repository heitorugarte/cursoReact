/**
 * @class View
 * 
 * @summary - Trata exclusivamente de manipulações no arquivo HTML
 */
class View {
    /**
     * @construtor
     * 
     * @summary - Cria referências à todos os elementos à serem utilizados no documento e por fim
     * adiciona os listeners correspondentes.
     */
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

    /**
     * @method adicionarListeners
     * 
     * @summary - Adiciona os listeners nos botões para os eventos correspondentes
     */
    adicionarListeners = () => {
        this.btAdicionar.onclick = this.listenerAdicionar;
        this.btRemover.onclick = this.listenerRemover;
        this.btConfirmaRemocao.onclick = this.listenerConfirmaRemocao;
    }

    /**
     * @listens btAdicionar
     * 
     * @summary - Adiciona um callback para a função criarTarefa do ProcessController ao clicar no botão
     *           'Adicionar'
     */
    listenerAdicionar = () => {
        processController.criarTarefa(this.txtDescricao.value, this.ddStatus.value);
    }

    /**
     * @listens btRemover
     * 
     * @summary - Callback para apresentar o painel de remoção de entrada na tabela,
     * onde o usuário pode especificar o índice da linha à ser removida.
     * Além disso, invoca o método popularDropdown do ProcessController para popular o dropdown de indices com o 
     * número atual de linhas na tabela.
     */
    listenerRemover = () => {
        this.toggleDivRemocao();
        processController.popularDropdown();
    }

    /**
     * @listens btConfirmaRemocao
     * 
     * @summary - Callback para o método removerLinhaTbody.
     */
    listenerConfirmaRemocao = () => {
        processController.deleteTarefa(this.ddRemover.value);
        view.toggleDivRemocao();
    }

    /**
     * @method refreshTabela
     * 
     * @summary - Limpa a tabela dos dados atualmente apresentados e depois insere novamente
     * os dados (tarefas) atualizadas.
     * 
     * @param {array} listaTarefas - Lista de tarefas atualizadas
     */
    refreshTabela = (listaTarefas) => {
        this.limparTabela();
        listaTarefas.forEach((tarefa) => {
            this.adicionarTarefa(tarefa);
        });
    }

    /**
     * @method limparTabela
     * 
     * @summary - Limpa todas as linhas do tBody na tabela.
     */
    limparTabela = () => {
        while (this.tBody.hasChildNodes()) {
            this.tBody.removeChild(this.tBody.firstChild);
        }
    }

    /**
     * @method RemoverLinhaTbody
     * 
     * @summary - Após o usuário especificar o índice da linha a ser removida e clicar no botão OK para confirmar,
     * este método é invocado pelo listener do botão para remover a linha especificada no dropdown.
     * Esta linha é removida do 'tbody' na tabela de dados.
     * Após feita a remoção, o método toggleDivRemocao é invocado para alternar de volta para a visualização padrão
     * da tabela, permitindo adicionar novas tarefas.
     */
    removerLinhaTbody = () => {
        let indice = parseInt(this.ddRemover.value);
        if (indice != NaN)
            this.tBody.deleteRow(indice);
        this.toggleDivRemocao();
    }

    /**
     * @method removerLinhaTbody
     * 
     * @summary - Sobrecarga do metodo removerLinhaTbody para que seja possível remover uma linha
     * de um índice específico por parâmetro.
     * 
     * @param {int} index - indice da linha a ser removida do tbody.
     */
    removerLinhaTbody = (index) => {
        this.tBody.deleteRow(index);
    }

    /**
     * @method adicionarTarefa
     * 
     * @summary - Adiciona uma nova tarefa à tabela com base no objeto Tarefa
     * fornecido por parâmetro vindo do ProcessController.
     * Primeiramente, uma nova linha é adicionada ao tBody, inicialmente sem dados
     * em suas células. Após isso, as células correspondentes à cada campo são instanciadas
     * e populadas com os dados do objeto Tarefa correspondente, sendo apresentados
     * diretamente na tabela.
     * Feita a inserção da nova linha, o método resetarCampoDescricao é invocado
     * para resetar o campo de descrição de tarefa.
     * 
     * @param {Tarefa} tarefa - Objeto do tipo Tarefa sendo adicionado ao tBody.
     */
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

    /**
     * @method adicionarCelula
     * 
     * @summary - Com base nos parametros linha e indice, é inserida uma nova celula
     * na linha correspondente da tabela e retorna esta nova célula para manipulação.
     * 
     * @param {int} linha - Linha da célula correspondente
     * @param {int} indice - Indice da célula correspondente (na linha, horizontalmente)
     * 
     * @returns {Cell} - Objeto Cell criado
     */
    adicionarCelula = (linha, indice) => {
        return linha.insertCell(indice);
    }

    /**
     * @method resetarCampoDescricao
     * 
     * @summary - Reseta o campo txtDescricao para uma string vazia para
     * fins de usabilidade.
     */
    resetarCampoDescricao = () => {
        this.txtDescricao.value = '';
    }

    /**
     * @method adicionarLinhaTbody
     * 
     * @summary - Adiciona uma nova linha em branco no tBody da tabela do documento e retorna
     * esta nova linha para manipulação.
     * 
     * @returns {TableRow} - Nova linha inserida na tabela.
     */
    adicionarLinhaTbody = () => {
        return this.tBody.insertRow();
    }

    /**
     * @method toggleDivRemocao
     * 
     * @summary - Alterna o metodo de display das divs de remover e adicionar linha entre 'inline' e 'none' a fim de
     * esconder / mostrar a div em questão.
     * Uma verificação é feita antes de habilitar a divRemocao para constatar se existe ao menos uma linha no tBody que possa ser removida,
     * caso contrário, a divRemocao não é exibida.
     */
    toggleDivRemocao = () => {
        if ((this.divRemocao.style.display != "inline") && (this.tBody.getElementsByTagName('tr').length > 0)) {
            this.divRemocao.style.display = "inline";
            this.divInserir.style.display = "none";
        } else {
            this.divRemocao.style.display = "none";
            this.divInserir.style.display = "inline";
        }
    }

    /**
     * @method getQuantidadeOpcoesDropdown
     * 
     * @summary - Retorna a quantidade de opções no componente Dropdown de indices de linhas removíveis da tabela.
     * 
     * @returns {int} - quantidade de opções presentes no dropdown
     */
    getQuantidadeOpcoesDropdown = () => {
        return this.ddRemover.options.length;
    }

    /**
     * @method adicionarOpcaoDropdown
     * 
     * @summary - Inclui uma opção no dropdown de índices de linhas removiveis.
     * 
     * @param {Tarefa} tarefa - objeto Tarefa sendo adicionado como opção de remoção da tabela. 
     */
    adicionarOpcaoDropdown = (tarefa) => {
        let opcao = document.createElement("option");
        opcao.text = tarefa.id;
        this.ddRemover.add(opcao);
    }

    /**
     * @method removerOpcaoDrodown
     * 
     * @summary - Remove uma opção especificada pelo index do dropdown de índices de linhas removíveis.
     * 
     * @param {int} index - indice da opção a ser removida do dropdown
     */
    removerOpcaoDropdown = (index) => {
        let opcao = this.ddRemover.options[index];
        this.ddRemover.remove(opcao);
    }

    /**
     * @method getQuantidadeElementosTbody
     * 
     * @summary - Retorna a quantidade de linhas no tBody da tabela no documento.
     * 
     * @returns {int} - Quantidade de elementos presentes no tBody.
     */
    getQuantidadeElementosTbody = () => {
        return this.tBody.getElementsByTagName("tr").length;
    }

    /**
     * @method mostrarAlerta
     * 
     * @summary - Exibe um Alert com mensagem de texto genérica informada por parâmetro.
     * 
     * @param {string} texto - Mensagem a ser exibida.
     */
    mostrarAlerta = (texto) => {
        alert(texto);
    }
}