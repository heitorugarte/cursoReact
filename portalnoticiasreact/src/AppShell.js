import View from "./View";
import React from "react";
import Dao from "./DAO";
import { Api } from "./Api";
import { connect } from "react-redux";

class AppShell extends React.Component {
  constructor(props) {
    super(props);
    this.dao = new Dao();
    this.api = new Api();
  }

  componentDidMount() {
    this.buscarNoticiasDefault();
  }

  buscarNoticiasDefault() {
    this.api.buscarNoticiasPais("br").then(listaNoticias => {
      this.createDispatch(listaNoticias);
    });
  }

  createDispatch(listaNoticias) {
    this.props.dispatch({
      type: "noticia/updateLista",
      lista: listaNoticias
    });
  }

  render() {
    return (
      <div>
        <Header
          dao={this.dao}
          api={this.api}
          appShell={this}
          listaNoticiasDestaque={this.props.listaNoticias}
        />
        <div id="telaNoticiasDestaque">
          <View
            dao={this.dao}
            api={this.api}
            listaNoticias={this.props.listaNoticias}
            appShell={this}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listaNoticias: state.listaNoticias
  };
};

export default connect(mapStateToProps)(AppShell);

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  mostrarBtNoticiasSalvas() {
    document.getElementById("divBtNoticiasSalvas").style.display = "block";
    document.getElementById("divBtNoticiasDestaques").style.display = "none";
  }

  mostrarBtNoticiasDestaque() {
    document.getElementById("divBtNoticiasSalvas").style.display = "none";
    document.getElementById("divBtNoticiasDestaques").style.display = "block";
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline">
            <button
              className="btn btn-outline-info btn-sm mr-sm-2"
              type="button"
              id="us"
              href="#"
              onClick={() => {
                this.props.api.buscarNoticiasPais("us").then(listaNoticias => {
                  this.props.appShell.createDispatch(listaNoticias);
                });
              }}
            >
              US
            </button>
            <button
              className="btn btn-outline-info btn-sm mr-sm-2"
              type="button"
              id="br"
              href="#"
              onClick={() => {
                this.props.api.buscarNoticiasPais("br").then(listaNoticias => {
                  this.props.appShell.createDispatch(listaNoticias);
                });
              }}
            >
              BR
            </button>
            <input
              className="form-control form-control-sm mr-sm-2"
              type="search"
              type="text"
              id="pesquisa"
              placeholder="Tipo de Matéria"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success btn-sm"
              id="btnPesquisa"
              type="button"
              onClick={() => {
                this.props.api
                  .buscarNoticiasPorPalavra(
                    document.getElementById("pesquisa").value
                  )
                  .then(listaNoticias => {
                    this.props.appShell.createDispatch(listaNoticias);
                  });
              }}
            >
              Search
            </button>
          </form>
        </nav>
        <div id="container">
          <div id="cabecalho">
            <h1>Notícias BizuMaximus</h1>
            <h2>Aqui não tem só notícia: tem novas, news e niubilis.</h2>
          </div>
          <div id="menu">
            <div id="divBtNoticiasSalvas">
              <a
                href="#"
                id="btNoticiasSalvas"
                onClick={() => {
                  this.props.dao.getNoticiasSalvas().then(listaNoticias => {
                    this.props.appShell.createDispatch(listaNoticias);
                    this.mostrarBtNoticiasDestaque();
                  });
                }}
              >
                Notícias Salvas
              </a>
            </div>
            <div id="divBtNoticiasDestaques">
              <a
                href="#"
                id="btNoticiasDestaque"
                onClick={() => {
                  this.props.appShell.buscarNoticiasDefault();
                  this.mostrarBtNoticiasSalvas();
                }}
              >
                Notícias em Destaque
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
