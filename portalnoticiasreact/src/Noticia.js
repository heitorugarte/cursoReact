/**
 * @class Noticia
 *
 * @summary Classe modelo para o objeto Notícia contendo todas as propriedades necessárias.
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */

export class Noticia {
  /**
   * @constructor
   *
   * @summary Construtor da classe Noticia; Não é necessário informar seus atributos no momento da construção.
   * Devem ser atribuídos após instanciar o objeto.
   */
  constructor() {
    this.source = new Source();
    this.author = null;
    this.title = null;
    this.description = null;
    this.url = null;
    this.urlToImage = null;
    this.publishedAt = null;
    this.content = null;
    this.card = null;
    this.salvo = null;
    this.id = null;
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
    this.id = null;
    this.name = null;
  }
}
