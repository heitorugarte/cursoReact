class View {
  constructor() {
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

  exibirNoticias(listaNoticias) {
    let card;
    for (let index = 0; index < listaNoticias.length; index++) {
      const noticiaObj = listaNoticias[index];
      this.appendNoticia(this.noticiaToHtmlCard(noticiaObj));
    }
  }

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

  appendNoticia(card) {
    if (card) this.telaNoticias.appendChild(card);
  }

  appendNoticiaSalva(card) {
    if (card) this.telaNoticiasSalvas.appendChild(card);
  }

  mostrarNoticiasSalvas() {
    this.limparTelaNoticiasSalvas();
    this.telaNoticiasDestaque.style.display = "none";
    this.telaNoticiasSalvas.style.display = "flex";
    this.divBtNoticiasDestaque.style.display = "block";
    this.divBtNoticiasSalvas.style.display = "none";
    this.telaNoticias = this.telaNoticiasSalvas;
  }

  limparTelaNoticiasSalvas() {
    this.telaNoticiasSalvas.innerHTML = "";
  }

  mostrarNoticiasDestaque() {
    this.telaNoticiasDestaque.style.display = "flex";
    this.telaNoticiasSalvas.style.display = "none";
    this.divBtNoticiasDestaque.style.display = "none";
    this.divBtNoticiasSalvas.style.display = "block";
    this.telaNoticias = this.telaNoticiasDestaque;
  }
}
