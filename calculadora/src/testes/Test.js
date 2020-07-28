function testeDisplay() {
    console.log("---Teste de Display---")
    let viewTest = new View();
    viewTest.display.value = 'TESTE';

    if (viewTest.display.value == 'TESTE') {
        console.log("Teste de display concluído com SUCESSO.");
    }
    console.log("----------------------")
}

function testeGetElementosView() {
    console.log("---Teste do Construtor da View---")
    let viewTest = new View();
    if (viewTest.botoesNumero && viewTest.botoesOperador && viewTest.display) {
        console.log("Teste de GetElementos concluído com SUCESSO.");
    } else {
        console.log("Teste de GetElementos FALHOU.");
    }
    console.log("---------------------------------")
}

function testeSoma() {
    console.log("---Teste de Soma---")
    let sucessos = 0;
    let testCases = [{
            "a": '1',
            "b": '1',
            "r": 2
        },
        {
            "a": '5',
            "b": '3',
            "r": 8
        },
        {
            "a": '-2',
            "b": '5',
            "r": 3
        },
        {
            "a": '150',
            "b": '230',
            "r": 380
        },
        {
            "a": 'b',
            "b": '230',
            "r": NaN
        }
    ]

    testCases.forEach((caso) => {
        resultado = Controller.soma(caso['a'], caso['b']);
        if (resultado == caso['r']) {
            console.log("Passou no caso: " + caso['a'] + " + " + caso['b']);
            sucessos++;
        } else {
            console.log("Falhou no caso: " + caso['a'] + " + " + caso['b'] + " --> Resultado: " + resultado + " (Esperado: " + caso['r'] + ").");
        }
    })
    if (sucessos == testCases.length) {
        console.log("Teste de soma concluído com SUCESSO.");
    } else {
        console.log("Teste de soma FALHOU.");
    }
    console.log("-------------------")
}

function testeSubtracao() {
    console.log("---Teste de Subtração---")
    let sucessos = 0;
    let testCases = [{
            "a": '1',
            "b": '1',
            "r": 0
        },
        {
            "a": '5',
            "b": '3',
            "r": 2
        },
        {
            "a": '9',
            "b": '6',
            "r": 3
        },
        {
            "a": '230',
            "b": '150',
            "r": 80
        },
        {
            "a": 'b',
            "b": '230',
            "r": NaN
        }
    ]

    testCases.forEach((caso) => {
        resultado = Controller.divide(caso['a'], caso['b']);
        if (resultado == caso['r']) {
            console.log("Passou no caso: " + caso['a'] + " + " + caso['b']);
            sucessos++;
        } else {
            console.log("Falhou no caso: " + caso['a'] + " + " + caso['b'] + " --> Resultado: " + resultado + " (Esperado: " + caso['r'] + ").");
        }
    })
    if (sucessos == testCases.length) {
        console.log("Teste de divisão concluído com SUCESSO.");
    } else {
        console.log("Teste de divisão FALHOU.");
    }
    console.log("------------------------")
}

function testeMultiplicacao() {
    console.log("---Teste de Multiplicacao---")
    let sucessos = 0;
    let testCases = [{
            "a": '1',
            "b": '1',
            "r": 1
        },
        {
            "a": '5',
            "b": '3',
            "r": 15
        },
        {
            "a": '-2',
            "b": '5',
            "r": -10
        },
        {
            "a": '150',
            "b": '230',
            "r": 34500
        },
        {
            "a": 'b',
            "b": '230',
            "r": NaN
        }
    ]

    testCases.forEach((caso) => {
        resultado = Controller.multiplica(caso['a'], caso['b']);
        if (resultado == caso['r']) {
            console.log("Passou no caso: " + caso['a'] + " + " + caso['b']);
            sucessos++;
        } else {
            console.log("Falhou no caso: " + caso['a'] + " + " + caso['b'] + " --> Resultado: " + resultado + " (Esperado: " + caso['r'] + ").");
        }
    })
    if (sucessos == testCases.length) {
        console.log("Teste de multiplicação concluído com SUCESSO.");
    } else {
        console.log("Teste de multiplicação FALHOU.");
    }
    console.log("----------------------------")
}

function testeDivisao() {
    console.log("---Teste de Divisao---")
    let sucessos = 0;
    let testCases = [{
            "a": '1',
            "b": '1',
            "r": 1
        },
        {
            "a": '6',
            "b": '3',
            "r": 2
        },
        {
            "a": '15',
            "b": '5',
            "r": 3
        },
        {
            "a": '500',
            "b": '100',
            "r": 5
        },
        {
            "a": 'b',
            "b": '230',
            "r": NaN
        }
    ]

    testCases.forEach((caso) => {
        resultado = controller.divide(caso['a'], caso['b']);
        if (resultado == caso['r']) {
            console.log("Passou no caso: " + caso['a'] + " + " + caso['b']);
            sucessos++;
        } else {
            console.log("Falhou no caso: " + caso['a'] + " + " + caso['b'] + " --> Resultado: " + resultado + " (Esperado: " + caso['r'] + ").");
        }
    })
    if (sucessos == testCases.length) {
        console.log("Teste de divisão concluído com SUCESSO.");
    } else {
        console.log("Teste de divisão FALHOU.");
    }
    console.log("----------------------");
}