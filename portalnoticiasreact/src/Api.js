/**
 * @class Api
 *
 * @summary Classe para manipular os dados da aplicação
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */
export class Api {
  /**
   * @summary Método recebe uma string ou será 'us' e 'br' ou será uma pesquisa, por exemplo:
   * 'query palavras' será retirado o query e a url recebera apenas 'palavras'
   *
   * @param {String} value
   */
  initPesquisa(value) {
    if (value === "" || value === undefined || value === null) {
      value = "br";
      this.buscarNoticiasPais(value);
    } else {
      var pesquisa = value.split(",");
      if (pesquisa[0] === "query") {
        let palavra = value.replace("query,", "");
        this.buscarNoticiasPorPalavra(palavra);
      } else {
        this.buscarNoticiasPais(value);
      }
    }
  }

  /**
   * Método para fazer requisição na newsAPI e pegar notícias destaque por país.
   *
   * @summary Este método faz uma requisição para a newsAPI utilizando os atributos
   * urlBase e apiKey para consultar as notícias em destaque no país informado por parametro.
   * Após a consulta, a lista de notícias retornada pela API é informada para o controller através
   * do método receberListaNoticias.
   *
   * @param {string} country
   */
  buscarNoticiasPais(country) {
    return new Promise(async result => {
      var url = `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=f9cf82cb0f564cafa2d4871eb1e65723`;
      var req = new Request(url);
      result(await this.fazerFetch(req));
    });
  }

  buscarNoticiasPorPalavra(palavra) {
    if (palavra == "") return this.buscarNoticiasPais("br");
    let query = palavra.trim();
    return new Promise(async result => {
      var url = `http://newsapi.org/v2/everything?q=${query}&apiKey=f9cf82cb0f564cafa2d4871eb1e65723`;
      var req = new Request(url);
      result(await this.fazerFetch(req));
    });
  }

  /**
   * @summary Resolve a requisição e retorna uma resposta JSON.
   *
   * @param {Request} req
   */
  fazerFetch(req) {
    return new Promise(result => {
      fetch(req)
        .then(response => {
          return response.json();
        })
        .then(json => {
          result(json.articles);
        })
        .catch(e => {
          alert(e);
        });
    });
  }
}
