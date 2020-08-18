import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ViewDestaqueConnected, ViewFavoritosConnected } from "./View";
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

  render() {
    return (
      <div>
        <HeaderConnected dao={this.dao} api={this.api} />
        <div id="telaNoticiasDestaque">
          <Router>
            <Switch>
              <Route path="/favoritos">
                <ViewFavoritosConnected dao={this.dao} />
              </Route>
              <Route path={["/", "/destaque"]} exact={true}>
                <ViewDestaqueConnected dao={this.dao} api={this.api} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default connect()(AppShell);

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
                  this.props.dispatch({
                    type: "noticia/updateLista",
                    lista: listaNoticias
                  });
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
                  this.props.dispatch({
                    type: "noticia/updateLista",
                    lista: listaNoticias
                  });
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
                    this.props.dispatch({
                      type: "noticia/updateLista",
                      lista: listaNoticias
                    });
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
            <Router>
              <Switch>
                <Route path="/favoritos">
                  <div id="divBtNoticiasDestaques">
                    <a href="/destaque" id="btNoticiasDestaque">
                      Notícias em Destaque
                    </a>
                  </div>
                </Route>
                <Route path={["/", "/destaque"]} exact={true}>
                  <div id="divBtNoticiasSalvas">
                    <a href="/favoritos" id="btNoticiasSalvas">
                      Notícias Salvas
                    </a>
                  </div>
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}
const HeaderConnected = connect()(Header);
