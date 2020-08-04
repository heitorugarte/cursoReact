class Noticia {
  constructor() {
    this.source = new Source();
    this.author;
    this.title;
    this.description;
    this.url;
    this.urlToImage;
    this.publishedAt;
    this.content;
    this.card;
    this.salvo;
    this.id;
  }

  clickBtSalvar() {
    this.salvo = true;
    dao.salvarNoticia(this);
  }

  clickBtExcluir() {
    dao.excluirNoticia(this);
  }
}

class Source {
  constructor() {
    this.id;
    this.name;
  }
}
