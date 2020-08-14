import { Api } from "./Api.js";
import { Dao } from "./DAO.js";
import { Noticia } from "./Noticia.js";
import { View } from "./View.js";

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
    this.view = new View(this);
    this.api = new Api(this);
    this.dao = new Dao(this, this.api);
  }

  getListaNoticiasInicial() {
    return new Promise(async result => {
      let jsonLista = await this.api.buscarNoticiasPais("br");
      result(this.receberListaNoticias(jsonLista));
    });
  }

  /**
   * @summary Método recebe uma string de país e envia para a classe Api para renderizar
   * uma nova pesquisa.
   *
   * @param {String} valor
   */
  enviarParametroPais(valor) {
    this.api.initPesquisa(valor);
  }

  /**
   * @summary Método recebe uma string de palavra chave e envia para a classe Api para renderizar
   * uma nova pesquisa.
   *
   * @param {String} valor
   */
  enviarParametroPesquisa(valor) {
    this.api.initPesquisa(valor);
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
    //this.view.exibirNoticias(this.listaNoticias);
  }

  /**
   * Método para buscar a lista de notícias salvas
   *
   * @summary Método para solicitar que o DAO busque a lista de notícias salvas no IndexedDB.
   */
  async carregarNoticiasSalvas() {
    this.listaNoticias = await this.dao.getNoticiasSalvas();
    this.view.exibirNoticias(this.listaNoticias);
  }

  async excluirNoticia(noticia) {
    noticia.salvo = false;
    this.listaNoticias = await this.dao.excluirNoticia(noticia);
    this.view.exibirNoticias(this.listaNoticias);
  }

  salvarNoticia(noticia) {
    noticia.salvo = true;
    this.dao.salvarNoticia(noticia);
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
    this.view.limparTelaNoticiasSalvas();
    this.view.exibirNoticias(listaNoticiasSalvas);
  }
}
