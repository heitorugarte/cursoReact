class NoticiaTest {
  constructor() {
    console.log("Teste - Classe Noticia");
    this.testConstructorNoticia();
    Console.log("Teste - Classe Noticia FINALIZADO");
  }

  testConstructorNoticia() {
    try {
      let noticia = new Noticia();
      noticia.source.id = "0";
      noticia.source.name = "Source Name";
      noticia.author = "Author Test";
      noticia.title = "Title Test";
      noticia.description = "Description Test";
      noticia.url = "URL Test";
      noticia.urlToImage = "UrlToImage Test";
      noticia.publishedAt = "PublishedAt Test";
      noticia.content = "Content Test";
      noticia.card = document.createElement("div");
      noticia.salvo = false;
      noticia.id = 0;
    } catch (e) {
      console.log("Teste - Classe Notícia (CONSTRUCTOR) FALHOU");
      return;
    }
    console.log("Teste - Classe Notícia (CONSTRUCTOR) SUCESSO");
  }
}
