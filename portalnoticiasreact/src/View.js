import React from "react";
import Dao from "./DAO";
import { connect } from "react-redux";
import { Api } from "./Api";
/**
 * @class View
 *
 * @summary Classe View que é responsavel exclusivamente por manipulações no DOM
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */
export default class View extends React.Component {
  /**
   * @constructor
   *
   * @summary Construtor da classe View; Busca todos os elementos no DOM que precisarão ser manipulados e
   * adiciona listeners nos botões.
   */
  constructor(props) {
    super(props);
    this.dao = props.dao;
    this.api = props.api;
    this.listaNoticias = props.listaNoticias;
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
  render() {
    return this.props.listaNoticias ? (
      this.props.listaNoticias.map((noticiaObj, index) => {
        return (
          <ViewCard
            key={index}
            noticia={noticiaObj}
            dao={this.dao}
            appShell={this.props.appShell}
          />
        );
      })
    ) : (
      <div></div>
    );
  }
}

export class ViewCard extends React.Component {
  render() {
    return (
      <div className="card">
        <Manchete
          url={this.props.noticia.url}
          title={this.props.noticia.title}
        />
        <Conteudo content={this.props.noticia.content} />
        <Imagem urlToImage={this.props.noticia.urlToImage} />
        {!this.props.noticia.salvo ? (
          <Divsalvar dao={this.props.dao} noticia={this.props.noticia} />
        ) : (
          <DivExcluirConnected
            dao={this.props.dao}
            noticia={this.props.noticia}
          />
        )}
        <Dataautor
          source={this.props.noticia.source}
          publishedAt={this.props.noticia.publishedAt}
        />
      </div>
    );
  }
}

const parseData = data => {
  let dataPartes = data.split("-");
  let ano, mes, dia;
  ano = dataPartes[0];
  mes = dataPartes[1];
  dia = dataPartes[2].split("T")[0];
  return dia + "/" + mes + "/" + ano;
};

const Manchete = props => {
  return (
    <div className="cardManchete">
      <a href={props.url}>{props.title}</a>
    </div>
  );
};

const Conteudo = props => {
  return (
    <div className="cardConteudo">
      <p>{props.content}</p>
    </div>
  );
};

const Imagem = props => {
  return (
    <div className="cardImagem">
      <img
        id="imgComponent"
        src={props.urlToImage}
        alt="Erro ao carregar imagem"
      ></img>
    </div>
  );
};

const Divsalvar = props => {
  let noticia = props.noticia;
  return (
    <div className="cardSalvar">
      <button
        className="btSalvar"
        onClick={() => {
          props.dao.salvarNoticia(noticia);
        }}
      >
        Salvar
      </button>
    </div>
  );
};

const DivExcluir = props => {
  let noticia = props.noticia;
  return (
    <div className="cardExcluir">
      <button
        className="btExcluir"
        onClick={() => {
          props.dao.excluirNoticia(noticia).then(listaNoticiasSalvas => {
            props.dispatch({
              type: "noticia/updateLista",
              lista: listaNoticiasSalvas
            });
          });
        }}
      >
        Excluir
      </button>
    </div>
  );
};

const Dataautor = props => {
  return (
    <div className="cardData">
      <p>
        Autor: {props.source.name} -- Data: {parseData(props.publishedAt)}
      </p>
    </div>
  );
};

const DivExcluirConnected = connect()(DivExcluir);
