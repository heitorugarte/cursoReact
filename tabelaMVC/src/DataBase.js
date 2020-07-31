let db;
/**
 * @class - DataBase
 * 
 * @summary - Classe para manipular o banco de dados.
 */
class DataBase {
    /**
     * @constructor
     * 
     * @summary - no evento onload, o método iniciarDb é chamado para inicializar o banco de dados
     * ao carregar a página.
     */
    constructor() {
        window.onload = this.iniciarDb;
    }

    /**
     * @method iniciarDb
     * 
     * @summary - Inicializa o banco de dados ao carregar a página principal.
     * Ao finalizar a inicialização, notifica o processController para que atualize
     * a tabela de tarefas.
     * 
     * @returns {void}
     */
    iniciarDb = () => {
        let request = window.indexedDB.open('tarefas', 1);

        request.onerror = function () {
            console.log("Erro na abertura do banco de dados.");
        };

        request.onsuccess = function () {
            console.log("Banco de dados aberto com sucesso.");
            db = request.result;
            processController.notifyAbertura();
        };

        request.onupgradeneeded = function (e) {
            let db = e.target.result;

            let objectStore = db.createObjectStore('tarefas', { autoIncrement: true });

            objectStore.createIndex('id', 'id', { unique: true });
            objectStore.createIndex('descricao', 'descricao', { unique: false });
            objectStore.createIndex('status', 'status', { unique: false });

            console.log("Setup do Banco de Dados concluído.");
        }
    }

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
    persistirTarefa = (tarefa) => {
        let novaEntrada = { descricao: tarefa.descricao, status: tarefa.status }

        let transacao = db.transaction(['tarefas'], 'readwrite');

        let objectStore = transacao.objectStore('tarefas');

        objectStore.add(novaEntrada).onsuccess = function (persistencia) {
            tarefa.id = persistencia.target.result;
            novaEntrada = { id: tarefa.id, descricao: tarefa.descricao, status: tarefa.status }
            objectStore.put(novaEntrada, tarefa.id).onsuccess = function () {
                dataBase.getTodosObjetos();
            }
        }

        transacao.oncomplete = function () {
            console.log("Transação concluída.");
        }

        transacao.onerror = function () {
            console.log("Transação deu erro.");
        }
    }

    /**
     * @method getTodosObjetos
     * 
     * @summary - Consulta todos os objetos Tarefa armazenados no banco de dados e retorna em uma lista
     * para o processController atualizar os dados em exposição na tabela.
     * 
     * @returns {void}
     */
    getTodosObjetos = () => {
        let transacao = db.transaction('tarefas', 'readonly')
        let objectStore = transacao.objectStore('tarefas')
        objectStore.getAll().onsuccess = function (consulta) {
            processController.setTodosObjetos(consulta.target.result)
        }
    }

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
    deletarObjeto = (key) => {
        let transacao = db.transaction(['tarefas'], 'readwrite')
        let objectStore = transacao.objectStore('tarefas')
        objectStore.delete(parseInt(key)).onsuccess = function () {
            console.log("Entrada deletada com sucesso.");
            dataBase.getTodosObjetos();
        }
    }
}