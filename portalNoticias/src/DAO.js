//Variável para armazenar a instancia do indexedDB.
let db;

/**
 * @class Dao
 *
 * @summary Classe responsável por fazer as requisições para a API newsapi e também
 * armazenar e consultar os dados presentes no indexedDB.
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */
class Dao {
  /**
   * @constructor
   *
   * @summary Construtor da classe DAO; Seta a URL base da newsapi para fazer requisições,
   * a key para acesso à API e adiciona um listener para o evento 'load' da janela, onde
   * o banco de dados será iniciado e ao final da execução uma requisição é feita para consultar
   * as notícias em destaque mais recentes para que sejam exibidas.
   */
  constructor() {
    this.iniciarAplicacao()
  }

  /**
   * Método para inicalizar a aplicação e seus recursos
   *
   * @summary Este método abre o indexedDB para que sejam feitas persistências e consultas e
   * ao fim de sua execução é feita uma chamada à newsapi para consultar as notícias em destaque do momento
   * à fim de exibi-las assim que o site é carregado.
   */
  iniciarAplicacao = () => {
    let request = window.indexedDB.open("noticias", 1);

    request.onerror = function() {
      console.log("Erro na abertura do banco de dados.");
    };

    request.onsuccess = function() {
      console.log("Banco de dados aberto com sucesso.");
      db = request.result;
    };

    request.onupgradeneeded = function(e) {
      let db = e.target.result;

      let objectStore = db.createObjectStore("noticias", {
        autoIncrement: true
      });

      objectStore.createIndex("source", "source", { unique: false });
      objectStore.createIndex("author", "author", { unique: false });
      objectStore.createIndex("title", "title", { unique: false });
      objectStore.createIndex("description", "description", { unique: false });
      objectStore.createIndex("url", "url", { unique: false });
      objectStore.createIndex("urlToImage", "urlToImage", { unique: false });
      objectStore.createIndex("publishedAt", "publishedAt", { unique: false });
      objectStore.createIndex("content", "content", { unique: false });
      objectStore.createIndex("salvo", "salvo", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });

      console.log("Setup do Banco de Dados concluído.");
    };
    var api = new Api()
    api.buscarNoticiasPais("br")
  };

  /**
   * Método para persistir notícia no indexedDB
   *
   * @summary Este método recebe um objeto Noticia por parâmetro e insere-o no indexedDB.
   *
   * @param {Noticia} noticia
   */
  salvarNoticia(noticia) {
    let novaEntrada = this.criarEntrada(noticia);
    let transacao = db.transaction(["noticias"], "readwrite");
    let objectStore = transacao.objectStore("noticias");
    objectStore.add(novaEntrada).onsuccess = function(persistencia) {
      noticia.id = persistencia.target.result;
      novaEntrada = dao.criarEntrada(noticia);
      objectStore.put(novaEntrada, noticia.id).onsuccess = function() {
        console.log("Sucesso!");
      };
    };
  }

  /**
   * Este método cria um objeto 'genérico' para entrada no banco.
   *
   * @summary Este método recebe um objeto Noticia por parametro e o transforma
   * em um objeto genérico com as chaves e valores de um objeto Noticia a fim de
   * inseri-lo no indexedDB.
   *
   * @param {Noticia} noticia
   */
  criarEntrada(noticia) {
    let novaEntrada = {
      source: {
        id: noticia.source.id,
        name: noticia.source.name
      },
      id: noticia.id,
      author: noticia.author,
      title: noticia.title,
      description: noticia.description,
      url: noticia.url,
      urlToImage: noticia.urlToImage,
      publishedAt: noticia.publishedAt,
      content: noticia.content,
      salvo: noticia.salvo
    };
    return novaEntrada;
  }

  /**
   * Método para excluir noticia do indexedDB.
   *
   * @summary Este método recebe um objeto Noticia por parametro e o exclui do indexedDB.
   * Após isto, refaz a lista de noticias salvas para atualizar a view.
   *
   * @param {Noticia} noticia
   */
  excluirNoticia(noticia) {
    let transacao = db.transaction(["noticias"], "readwrite");
    let objectStore = transacao.objectStore("noticias");
    objectStore.delete(parseInt(noticia.id)).onsuccess = function() {
      console.log("Noticia excluida da da lista com sucesso.");
      dao.getNoticiasSalvas();
    };
  }

  /**
   * Método para consultar as noticias salvas no indexedDB.
   *
   * @summary Este método consulta o indexedDB e passa para o controller a lista de todos os objetos Noticia
   * salvos.
   *
   */
  getNoticiasSalvas() {
    let transacao = db.transaction(["noticias"], "readonly");
    let objectStore = transacao.objectStore("noticias");
    objectStore.getAll().onsuccess = function(consulta) {
      controller.mostrarNoticiasSalvas(consulta.target.result);
    };
  }
}