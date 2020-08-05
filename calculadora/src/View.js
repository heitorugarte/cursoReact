class View {
    constructor() {
        this.display = document.getElementById("display");
        this.botoesNumero = document.getElementsByClassName("btNumero");
        this.botoesOperador = document.getElementsByClassName("btOperador");
        this.adicionarListeners();
    }

    adicionarListeners = () => {
        for (let index = 0; index < this.botoesNumero.length; index++) {
            const botaoNumero = this.botoesNumero[index];
            botaoNumero.addEventListener('click', (e) => this.listenerBotaoNumero(botaoNumero));
        }
        for (let index = 0; index < this.botoesOperador.length; index++) {
            const botaoOperador = this.botoesOperador[index];
            botaoOperador.addEventListener('click', (e) => this.listenerBotaoOperador(botaoOperador));
        }
    }

    listenerBotaoNumero = (element) => {
        controller.apertouNumero(element.innerHTML);
    }

    listenerBotaoOperador = (element) => {
        controller.apertouOperador(element.innerHTML);
    }

    appendDisplay = (texto) => {
        this.display.value += texto;
    }

    setDisplay = (texto) => {
        this.display.value = texto;
    }
}