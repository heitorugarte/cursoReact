class View {
    constructor() {
        this.display = document.getElementById("display");
        this.botoesNumero = document.getElementsByClassName("btNumero");
        this.botoesOperador = document.getElementsByClassName("btOperador");
    }

    adicionarListeners = () => {
        this.botoesNumero.forEach((element) =>
            element.addEventListener('click', (e) => this.listenerBotaoNumero(element)), this);
        this.botoesOperador.forEach((element) =>
            element.addEventListener('click', (e) => this.listenerBotaoOperador(element)), this);
    }

    listenerBotaoNumero = (element) => {
        switch (element.innerHTML) {

        }
    }

    listenerBotaoOperador = (element) => {
        switch (element.innerHTML) {

        }
    }
}