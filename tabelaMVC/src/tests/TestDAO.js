class TestDAO {
    constructor() {
        window.onload = this.testIniciarDb;
        console.log("Testes DataBase.js");
    }

    testIniciarDb = () => {
        console.log("------------------------------")
        console.log("function: testIniciarDb()")
        if (dataBase) {
            console.log("Banco de dados inicializado com sucesso.");
        }
        console.log("------------------------------")
    }

    testPersistirTarefa = () => {
        let tarefa = new tarefa("Tarefa Teste", "A fazer")
        dataBase.persistirTarefa(tarefa);
    }
}