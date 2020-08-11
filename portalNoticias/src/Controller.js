import { Api } from "./Api.js";

/**
 * @class Controller
 *
 * @summary Classe para manipular os dados da aplicação
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */
export class Controller {
  /**
   * @constructor
   *
   * @property {array} listaNoticias - Armazena a lista de notícias recebida da
   * API ou do banco de dados.
   */
  constructor() {
    this.listaNoticias = [];
  }

  /**
   * @summary Método recebe uma string de país e envia para a classe Api para renderizar
   * uma nova pesquisa.
   *
   * @param {String} valor
   */
  enviarParametroPais(valor) {
    new Api(valor);
  }

  /**
   * @summary Método recebe uma string de palavra chave e envia para a classe Api para renderizar
   * uma nova pesquisa.
   *
   * @param {String} valor
   */
  enviarParametroPesquisa(valor) {
    new Api(valor);
  }

  /**
   * Método para receber lista de notícias
   *
   * @summary Método que recebe por parâmetro uma lista
   * de objetos do tipo Notícia, popula o atributo listaNoticia
   * desta classe com estes objetos e passa o mesmo para a View
   * exibir na tela.
   *
   * @param {array} objetoLista
   */
  receberListaNoticias(objetoLista) {
    this.listaNoticias = [];
    for (let index = 0; index < objetoLista.articles.length; index++) {
      const element = objetoLista.articles[index];
      this.listaNoticias.push(Object.assign(new Noticia(), element));
    }
    view.limparTelaNoticias();
    view.exibirNoticias(this.listaNoticias);
  }

  /**
   * Método para buscar a lista de notícias salvas
   *
   * @summary Método para solicitar que o DAO busque a lista de notícias salvas no IndexedDB.
   */
  carregarNoticiasSalvas() {
    dao.getNoticiasSalvas();
  }

  excluirNoticia(noticia) {
    noticia.salvo = false;
    dao.excluirNoticia(noticia);
  }

  salvarNoticia(noticia) {
    noticia.salvo = true;
    dao.salvarNoticia(noticia);
  }

  /**
   * Método para exibir a lista de notícias salvas
   *
   * @summary Método que recebe por parâmetro a lista de notícias salvas no indexedDB e solicita
   * que a View limpe a lista de notícias salvas atualmente exibidas e exiba a nova lista de notícias.
   *
   * @param {array} listaNoticiasSalvas
   */
  mostrarNoticiasSalvas(listaNoticiasSalvas) {
    view.limparTelaNoticiasSalvas();
    view.exibirNoticias(listaNoticiasSalvas);
  }
}
