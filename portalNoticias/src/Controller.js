class Controller {
  constructor() {
    this.listaNoticias = [];
  }

  receberListaNoticias(objetoLista) {
    for (let index = 0; index < objetoLista.articles.length; index++) {
      const element = objetoLista.articles[index];
      this.listaNoticias.push(Object.assign(new Noticia(), element));
    }
    view.exibirNoticias(this.listaNoticias);
  }

  carregarNoticiasSalvas() {
    dao.getNoticiasSalvas();
  }

  mostrarNoticiasSalvas(listaNoticiasSalvas) {
    view.limparTelaNoticiasSalvas();
    view.exibirNoticias(listaNoticiasSalvas);
  }

  encodeUrl(url) {
    return (
      "https://" +
      url
        .split("//")[1]
        .replace("(", encodeURIComponent("("))
        .replace(")", encodeURIComponent(")"))
        .replace(":", encodeURIComponent(":"))
    );
  }
}
