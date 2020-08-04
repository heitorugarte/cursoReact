let db;

class Dao {
  constructor() {
    this.baseUrl = "http://newsapi.org/v2";
    this.apiKey = "f9cf82cb0f564cafa2d4871eb1e65723";
    window.addEventListener("load", this.iniciarAplicacao);
  }

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
    this.buscarNoticiasPais("br");
  };

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

  excluirNoticia(noticia) {
    let transacao = db.transaction(["noticias"], "readwrite");
    let objectStore = transacao.objectStore("noticias");
    objectStore.delete(parseInt(noticia.id)).onsuccess = function() {
      console.log("Noticia excluida da da lista com sucesso.");
      dao.getNoticiasSalvas();
    };
  }

  getNoticiasSalvas() {
    let transacao = db.transaction(["noticias"], "readonly");
    let objectStore = transacao.objectStore("noticias");
    objectStore.getAll().onsuccess = function(consulta) {
      controller.mostrarNoticiasSalvas(consulta.target.result);
    };
  }

  buscarNoticiasPais(country) {
    let urlRequisicao =
      this.baseUrl +
      "/top-headlines?country=" +
      country +
      "&apiKey=" +
      this.apiKey;
    let myHeaders = new Headers().append("Content-type", "application/json");
    const myInit = {
      method: "GET",
      headers: myHeaders
    };
    fetch(urlRequisicao, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        controller.receberListaNoticias(json);
      })
      .catch(function(e) {
        console.log(e);
      });
  }
}
