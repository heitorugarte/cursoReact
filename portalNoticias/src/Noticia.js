/**
 * @class Noticia
 *
 * @summary Classe modelo para o objeto Notícia contendo todas as propriedades necessárias.
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */

class Noticia {
  /**
   * @constructor
   *
   * @summary Construtor da classe Noticia; Não é necessário informar seus atributos no momento da construção.
   * Devem ser atribuídos após instanciar o objeto.
   */
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

  /**
   * Método chamado ao clicar no botão de salvar notícia.
   *
   * @summary Este método é atribuído como um callback no listener de clique do botão de salvar.
   * Ao ser chamado, requisitará que a classe DAO salve a notícia em questão no indexedDB.
   */
  clickBtSalvar() {
    this.salvo = true;
    dao.salvarNoticia(this);
  }

  /**
   * Método chamado ao clicar no botão de excluir notícia.
   *
   * @summary Este método é atribuído como um callback no listener de clique do botão de salvar.
   * Ao ser chamado, requisitará que a classe DAO exclua a notícia em questão no indexedDB.
   */
  clickBtExcluir() {
    dao.excluirNoticia(this);
  }
}

/**
 * @class Source
 *
 * @summary Classe que faz parte do Modelo notícia, sendo utilizada como um dos atributos do objeto Notícia
 * para armazenar o ID do objeto Source assim como seu nome, a fim de identificar a fonte da notícia.
 */
class Source {
  constructor() {
    this.id;
    this.name;
  }
}
