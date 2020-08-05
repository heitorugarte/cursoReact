class Test {
    constructor() {
        this.testeConstrutorView();
        this.testeAdicionarLinha();
        this.testeRemoverLinha();
        this.testeGetQuantidadeElementos();
        this.testeManipularDropdown();
        this.testeToggleDiv();
        this.testeCriarTarefa();
    }

    testeConstrutorView = () => {
        console.log('------------------------------');
        if (view.tabela && view.tBody && view.tFooter && view.txtDescricao &&
            view.ddStatus && view.btAdicionar && view.btRemover && view.divRemocao &&
            view.divInserir && view.btConfirmaRemocao && view.ddRemover)
            console.log('Teste do construtor da View: SUCESSO');
        else
            console.log('Teste do construtor da View: FALHA');
        console.log('------------------------------');
    }

    testeAdicionarLinha = () => {
        console.log('------------------------------');
        let quantidadeLinhas = view.getQuantidadeElementosTbody();
        view.adicionarLinhaTbody();
        if (this.assertEquals(view.getQuantidadeElementosTbody(), quantidadeLinhas + 1))
            console.log('Teste adicionar linha: SUCESSO');
        else
            console.log('Teste adicionar linha: FALHA');
        console.log('------------------------------')
    }

    testeRemoverLinha = () => {
        console.log('------------------------------');
        view.adicionarLinhaTbody();
        let quantidadeLinhas = view.getQuantidadeElementosTbody();
        view.removerLinhaTbody();
        if (this.assertEquals(view.getQuantidadeElementosTbody(), quantidadeLinhas - 1))
            console.log('Teste adicionar linha: SUCESSO');
        else
            console.log('Teste adicionar linha: FALHA');
        console.log('------------------------------')
    }

    testeGetQuantidadeElementos = () => {
        console.log('------------------------------')
        let quantidade = view.getQuantidadeElementosTbody();
        view.adicionarLinhaTbody();
        if (this.assertEquals(quantidade + 1, view.getQuantidadeElementosTbody()))
            console.log("Teste GetQuantidadeElementos: SUCESSO");
        else
            console.log("Teste GetQuantidadeElementos: FALHA");
        console.log('------------------------------')
    }

    testeManipularDropdown = () => {
        console.log('------------------------------')
        let quantidade = view.getQuantidadeOpcoesDropdown();
        let sucessos = 0;
        view.adicionarOpcaoDropdown(0);
        if (this.assertEquals(view.getQuantidadeOpcoesDropdown(), quantidade + 1))
            sucessos++;
        view.removerOpcaoDropdown(0);
        if (this.assertEquals(view.getQuantidadeOpcoesDropdown(), quantidade))
            sucessos++;
        if (this.assertEquals(sucessos, 2))
            console.log("Teste GetQuantidadeDropdown: SUCESSO");
        else
            console.log("Teste GetQuantidadeDropdown: FALHA");
        console.log('------------------------------')
    }

    testeToggleDiv = () => {
        console.log('------------------------------')
        let displayDivRemocao = view.divRemocao.style.display;
        view.toggleDivRemocao();
        if (!this.assertEquals(displayDivRemocao, view.divRemocao.style.display))
            console.log("Teste ToggleDiv: SUCESSO")
        else
            console.log("Teste ToggleDiv: FALHA")
        console.log('------------------------------')
    }

    testeCriarTarefa = () => {
        console.log('------------------------------')
        let descricao = 'Tarefa Teste'
        let status = 'Fazendo'
        let tarefa = processController.criarTarefa(descricao, status)
        if (tarefa)
            console.log("Teste CriarTarefa: SUCESSO")
        else
            console.log("Teste CriarTarefa: FALHA")
        console.log('------------------------------')
    }

    assertEquals = (objA, objB) => {
        let comparacao = objA == objB;
        if (comparacao) {
            console.log("SUCESSO: " + objA + " == " + objB);
            return true;
        }
        console.log("FALHA: " + objA + " != " + objB);
        return false;
    }
}