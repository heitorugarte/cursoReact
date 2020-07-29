class Controller {
    constructor() {
        this.numeroBase = '';
        this.numeroSucessor = '';
        this.apertouOperacao = false;
        this.operacao = '';
    }

    apertouNumero = (num) => {
        if (!this.apertouOperacao) {
            this.numeroBase += num;
        } else {
            this.numeroSucessor += num;
        }
        view.appendDisplay(num);
    }

    apertouOperador = (op) => {
        switch (op) {
            case '+':
            case '-':
            case '*':
            case '/':
                this.apertouOperacao = true;
                this.operacao = op;
                view.appendDisplay(op);
                break;
            case '=':
                this.realizarOperacao();
                break;
        }
    }

    realizarOperacao = () => {
        if (this.numerosValidos() && this.operacao != '') {
            let intBase = parseInt(this.numeroBase);
            let intSucessor = parseInt(this.numeroSucessor);
            switch (this.operacao) {
                case '+':
                    this.numeroBase = this.soma(intBase, intSucessor).toString();
                    break;
                case '-':
                    this.numeroBase = this.subtrai(intBase, intSucessor).toString();
                    break;
                case '*':
                    this.numeroBase = this.multiplica(intBase, intSucessor).toString();
                    break;
                case '/':
                    this.numeroBase = this.divide(intBase, intSucessor).toString();
                    break;
            }
            this.numeroSucessor = '';
            this.apertouOPeracao = false;
            this.operacao = '';
            view.setDisplay(this.numeroBase);
        }
    }

    soma = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 + elemento2;
    }

    subtrai = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 - elemento2;
    }

    divide = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 / elemento2;
    }

    multiplica = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 * elemento2;
    }

    numerosValidos = () => {
        if (this.numeroBase != '' && this.numeroSucessor != '')
            return true;
        return false;
    }
}