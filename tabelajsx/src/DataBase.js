/**
 * @class - DataBase
 *
 * @summary - Classe para manipular o banco de dados.
 */
export default class DataBase {
  /**
   * @constructor
   */
  constructor() {
    window.onload = this.iniciarDb;
    this.dbInicializado = false;
  }

  iniciarDb = () => {
    let request = window.indexedDB.open("tarefas", 1);

    request.onerror = function() {
      console.log("Erro na abertura do banco de dados.");
    };

    request.onsuccess = function() {
      console.log("Banco de dados aberto com sucesso.");
    };

    request.onupgradeneeded = function(e) {
      let db = e.target.result;

      let objectStore = db.createObjectStore("tarefas", {
        keyPath: "id",
        autoIncrement: true
      });

      objectStore.createIndex("descricao", "descricao", { unique: false });
      objectStore.createIndex("situacao", "situacao", { unique: false });

      console.log("Setup do Banco de Dados concluído.");
    };
  };

  /**
   * @method getListaTarefas
   *
   * @summary - Consulta todos os objetos Tarefa armazenados no banco de dados e retorna em uma lista
   * para o tarefasController atualizar os dados em exposição na tabela.
   *
   * @returns {void}
   */
  getListaTarefas = () => {
    return new Promise(result => {
      let request = window.indexedDB.open("tarefas", 1);

      request.onerror = function() {
        console.log("Erro na abertura do banco de dados.");
      };

      request.onsuccess = function() {
        console.log("Banco de dados aberto com sucesso.");
        let db = request.result;
        let transacao = db.transaction("tarefas", "readonly");
        let objectStore = transacao.objectStore("tarefas");
        objectStore.getAll().onsuccess = function(consulta) {
          result(consulta.target.result);
        };
      };

      request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore("tarefas", {
          keyPath: "id",
          autoIncrement: true
        });

        objectStore.createIndex("descricao", "descricao", { unique: false });
        objectStore.createIndex("situacao", "situacao", { unique: false });

        console.log("Setup do Banco de Dados concluído.");
      };
    });
  };

  /**
   * @method persistirTarefa
   *
   * @summary - Persiste uma tarefa no banco de dados através de um add primeiramente,
   * após feita a inclusão, o ID único gerado pelo banco para o objeto em questão é retornado
   * através de 'persistencia.target.result', este ID é atribuido ao objeto e é feito
   * um put para persistir este ID no modelo da classe.
   * Após inserir o dado, o metodo getTodosObjetos() é chamado para atualizar a tabela
   * de tarefas com a(s) nova(s) entrada(s).
   *
   * @param {Tarefa} tarefa - objeto à ser persistido no banco.
   * @returns {void}
   */
  persistirTarefa = tarefa => {
    return new Promise(result => {
      let request = window.indexedDB.open("tarefas", 1);

      request.onerror = function() {
        console.log("Erro na abertura do banco de dados.");
      };

      request.onsuccess = function() {
        console.log("Banco de dados aberto com sucesso.");
        let db = request.result;
        let novaEntrada = {
          descricao: tarefa.descricao,
          situacao: tarefa.situacao
        };

        let transacao = db.transaction(["tarefas"], "readwrite");

        let objectStore = transacao.objectStore("tarefas");

        objectStore.add(novaEntrada).onsuccess = function(persistencia) {
          tarefa.id = persistencia.target.result;
          objectStore.getAll().onsuccess = function(consulta) {
            result(consulta.target.result);
          };
        };

        transacao.oncomplete = function() {
          console.log("Transação concluída.");
        };

        transacao.onerror = function() {
          console.log("Erro na transação.");
        };
      };

      request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore("tarefas", {
          keyPath: "id",
          autoIncrement: true
        });

        objectStore.createIndex("descricao", "descricao", { unique: false });
        objectStore.createIndex("situacao", "situacao", { unique: false });

        console.log("Setup do Banco de Dados concluído.");
      };
    });
  };

  /**
   * @method deletarObjeto
   *
   * @summary - Deleta uma entrada do banco de dados através de um identificador (key).
   * Após deletar, chama o método getTodosObjetos() para atualizar a tabela em exibição
   * com os dados atualizados.
   *
   * @param {int} key - ID do objeto a ser deletado do banco.
   *
   * @returns {void}
   */
  deletarObjeto = key => {
    return new Promise(result => {
      let request = window.indexedDB.open("tarefas", 1);

      request.onerror = function() {
        console.log("Erro na abertura do banco de dados.");
      };

      request.onsuccess = function() {
        console.log("Banco de dados aberto com sucesso.");
        let db = request.result;
        let transacao = db.transaction(["tarefas"], "readwrite");
        let objectStore = transacao.objectStore("tarefas");
        objectStore.delete(parseInt(key)).onsuccess = function() {
          console.log("Entrada deletada com sucesso.");
          objectStore.getAll().onsuccess = function(consulta) {
            result(consulta.target.result);
          };
        };
      };

      request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore("tarefas", {
          keyPath: "id",
          autoIncrement: true
        });

        objectStore.createIndex("descricao", "descricao", { unique: false });
        objectStore.createIndex("status", "status", { unique: false });

        console.log("Setup do Banco de Dados concluído.");
      };
    });
  };

  deletarTodos = () => {
    return new Promise(result => {
      let request = window.indexedDB.open("tarefas", 1);

      request.onerror = function() {
        console.log("Erro na abertura do banco de dados.");
      };

      request.onsuccess = function() {
        console.log("Banco de dados aberto com sucesso.");
        let db = request.result;
        let transacao = db.transaction(["tarefas"], "readwrite");
        let objectStore = transacao.objectStore("tarefas");
        objectStore.clear().onsuccess = function() {
          console.log("Banco apagado com sucesso.");
          objectStore.getAll().onsuccess = function(consulta) {
            result(consulta.target.result);
          };
        };
      };

      request.onupgradeneeded = function(e) {
        let db = e.target.result;

        let objectStore = db.createObjectStore("tarefas", {
          keyPath: "id",
          autoIncrement: true
        });

        objectStore.createIndex("descricao", "descricao", { unique: false });
        objectStore.createIndex("status", "status", { unique: false });

        console.log("Setup do Banco de Dados concluído.");
      };
    });
  };
}
