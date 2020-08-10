import { Controller } from "./Controller.js";

/**
 * @class View
 *
 * @summary Classe View que é responsavel exclusivamente por manipulações no DOM
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */
export class View extends React.Component {
  /**
   * @constructor
   *
   * @summary Construtor da classe View; Busca todos os elementos no DOM que precisarão ser manipulados e
   * adiciona listeners nos botões.
   */
  constructor() {
    super();
    this.usOption = document.getElementById("us");
    this.usOption.addEventListener("click", () => {
      controller.enviarParametroPais("us");
    });
    this.brOption = document.getElementById("br");
    this.brOption.addEventListener("click", () => {
      controller.enviarParametroPais("br");
    });
    this.btnPesquisa = document.getElementById("btnPesquisa");
    this.btnPesquisa.addEventListener("click", () => {
      this.pesquisa = document.getElementById("pesquisa").value;
      if (this.pesquisa == "") return alert("O formulário não pode ser nulo!");
      controller.enviarParametroPesquisa("query," + this.pesquisa);
    });

    this.btnPesquisa = document.getElementById("btnPesquisa");
    this.telaNoticiasDestaque = document.getElementById("telaNoticiasDestaque");
    this.telaNoticias = this.telaNoticiasDestaque;
    this.telaNoticiasSalvas = document.getElementById("telaNoticiasSalvas");
    this.divBtNoticiasSalvas = document.getElementById("divBtNoticiasSalvas");
    this.divBtNoticiasDestaque = document.getElementById(
      "divBtNoticiasDestaques"
    );
    this.btNoticiasSalvas = document.getElementById("btNoticiasSalvas");
    this.btNoticiasEmDestaque = document.getElementById("btNoticiasDestaque");
    this.btNoticiasSalvas.addEventListener("click", () => {
      controller.carregarNoticiasSalvas();
      this.mostrarNoticiasSalvas();
    });
    this.btNoticiasEmDestaque.addEventListener("click", () => {
      this.mostrarNoticiasDestaque();
    });
  }

  /**
   * Método para exibir na tela a lista de notícias
   *
   * @summary Este método recebe por parâmetro uma lista de objetos do tipo Notícia
   * e, antes de fazer o append desta noticia no documento, a mesma é transformada em um objeto HTML
   * em forma de um card através do método noticiaToHtmlCard.
   *
   * @param {array} listaNoticias
   */
  exibirNoticias(listaNoticias) {
    let card;
    let noticiasDom = [];
    for (let index = 0; index < listaNoticias.length; index++) {
      const noticiaObj = listaNoticias[index];
      noticiasDom.push(
        React.createElement(
          ViewCard,
          { key: Math.random().toString(), noticia: noticiaObj },
          null
        )
      );
    }
    ReactDOM.render(noticiasDom, this.telaNoticiasDestaque);
  }

  /**
   * Método para transformar um objeto Notícia em um card HTML
   *
   * @summary Este método recebe um objeto Notícia por parâmetro e transforma-o
   * em um objeto HTML semelhante à um card para que seja inserido no DOM
   * e seja visualizado na tela.
   *
   * @param {Noticia} noticia
   */
  noticiaToHtmlCard(noticia) {
    noticia = Object.assign(new Noticia(), noticia);
    if (noticia.content) {
      let divCard = document.createElement("div");
      divCard.className = "card";

      let divCardManchete = document.createElement("div");
      divCardManchete.className = "cardManchete";
      let aManchete = document.createElement("a");
      aManchete.innerHTML = noticia.title;
      aManchete.href = noticia.url;
      divCardManchete.appendChild(aManchete);

      let divCardConteudo = document.createElement("div");
      divCardConteudo.className = "cardConteudo";
      let parConteudo = document.createElement("p");
      if (noticia.content.length > 500)
        parConteudo.innerHTML = noticia.content.slice(0, 500);
      else parConteudo.innerHTML = noticia.content;
      divCardConteudo.appendChild(parConteudo);

      let divCardImagem = document.createElement("div");
      divCardImagem.className = "cardImagem";
      let imgComponent = document.createElement("img");
      imgComponent.id = "imgComponent";
      imgComponent.src = noticia.urlToImage;
      divCardImagem.appendChild(imgComponent);

      if (!noticia.salvo) {
        let divCardSalvar = document.createElement("div");
        divCardSalvar.className = "cardSalvar";
        let btSalvar = document.createElement("button");
        btSalvar.innerHTML = "Salvar";
        btSalvar.className = "btSalvar";
        btSalvar.onclick = () => noticia.clickBtSalvar();
        divCardSalvar.appendChild(btSalvar);
        divCard.appendChild(divCardSalvar);
      } else {
        let divCardExcluir = document.createElement("div");
        divCardExcluir.className = "cardExcluir";
        let btExcluir = document.createElement("button");
        btExcluir.innerHTML = "Excluir";
        btExcluir.className = "btExcluir";
        btExcluir.onclick = () => noticia.clickBtExcluir();
        divCardExcluir.appendChild(btExcluir);
        divCard.appendChild(divCardExcluir);
      }

      let divCardData = document.createElement("div");
      let dataPartes = noticia.publishedAt.split("-");
      let ano, mes, dia;
      ano = dataPartes[0];
      mes = dataPartes[1];
      dia = dataPartes[2].split("T")[0];
      let dataFormatada = dia + "/" + mes + "/" + ano;
      divCardData.className = "cardData";
      divCardData.innerHTML =
        "Autor: " + noticia.source.name + "<br>Data: " + dataFormatada;

      divCard.appendChild(divCardManchete);
      divCard.appendChild(divCardConteudo);
      divCard.appendChild(divCardImagem);
      divCard.appendChild(divCardData);

      noticia.card = divCard;

      return divCard;
    }
  }

  /**
   * Método para inserir um elemento HTML (card de notícia) no DOM.
   *
   * @summary Este método recebe por parâmetro uma notícia que foi convertida para um
   * objeto HTML semelhante à um card e é inserido no DOM para visualização.
   *
   * @param {HTMLElement} card
   */
  appendNoticia(card) {
    if (card) this.telaNoticias.appendChild(card);
  }

  /**
   * Método para alternar o display das divs para exibir as noticias salvas
   *
   * @summary Este método altera o display das divs para que a div de notícias salvas seja
   * exibida e a div de notícias em destaque fique escondida. Também, ao mostrar a tela de notícias salvas,
   * esta é primeiramente limpa para que seja repopulada com as notícias salvas no banco.
   */
  mostrarNoticiasSalvas() {
    this.limparTelaNoticiasSalvas();
    this.telaNoticiasDestaque.style.display = "none";
    this.telaNoticiasSalvas.style.display = "flex";
    this.divBtNoticiasDestaque.style.display = "block";
    this.divBtNoticiasSalvas.style.display = "none";
    this.telaNoticias = this.telaNoticiasSalvas;
  }

  /**
   * Método para limpar visualização de notícias salvas
   *
   * @summary Este método exclui todo o HTML contido dentro da div de notícias salvas a fim de
   * limpar o display para receber as notícias salvas mais recentes.
   */
  limparTelaNoticiasSalvas() {
    this.telaNoticiasSalvas.innerHTML = "";
  }

  /**
   * Método para limpar visualização de notícias
   *
   * @summary Este método exclui todo o HTML contido dentro da div de notícias a fim de
   * limpar o display para receber as notícias mais recentes.
   */
  limparTelaNoticias() {
    this.telaNoticiasDestaque.innerHTML = "";
  }

  /**
   * Método para alternar o display das divs para exibir as notícias destaque
   *
   * @summary Este método altera o display das divs para que a div de notícias salvas fique escondida e
   * a div de notícias destaque seja exibida. Esta é a visualização padrão do portal.
   */
  mostrarNoticiasDestaque() {
    this.telaNoticiasDestaque.style.display = "flex";
    this.telaNoticiasSalvas.style.display = "none";
    this.divBtNoticiasDestaque.style.display = "none";
    this.divBtNoticiasSalvas.style.display = "block";
    this.telaNoticias = this.telaNoticiasDestaque;
  }
}

export class ViewCard extends React.Component {
  constructor(props) {
    super(props);
    this.noticia = props.noticia;
  }

  render() {
    const manchete = React.createElement(
      "div",
      { className: "cardManchete" },
      React.createElement("a", { href: this.noticia.url }, this.noticia.title)
    );

    const conteudo = React.createElement(
      "div",
      { className: "cardConteudo" },
      React.createElement("p", null, this.noticia.content)
    );

    const imagem = React.createElement(
      "div",
      { className: "cardImagem" },
      React.createElement("img", {
        id: "imgComponent",
        src: this.noticia.urlToImage
      })
    );

    var cardSalvar, cardExcluir;

    if (!this.noticia.salvo) {
      cardSalvar = React.createElement(
        "div",
        { className: "cardSalvar" },
        React.createElement(
          "button",
          { className: "btSalvar", onClick: this.noticia.clickBtSalvar },
          "Salvar"
        )
      );
    } else {
      cardExcluir = React.createElement(
        "div",
        {
          className: "cardExcluir"
        },
        React.createElement(
          "button",
          {
            className: "btExcluir",
            onClick: this.noticia.clickBtExcluir
          },
          "Excluir"
        )
      );
    }

    let dataPartes = this.noticia.publishedAt.split("-");
    let ano, mes, dia;
    ano = dataPartes[0];
    mes = dataPartes[1];
    dia = dataPartes[2].split("T")[0];
    let dataFormatada = dia + "/" + mes + "/" + ano;

    const data = React.createElement(
      "div",
      { className: "cardData" },
      "Autor: " + this.noticia.source.name + " -- Data: " + dataFormatada
    );

    return React.createElement("div", { className: "card" }, [
      manchete,
      conteudo,
      imagem,
      cardSalvar ? cardSalvar : cardExcluir,
      data
    ]);
  }
}
