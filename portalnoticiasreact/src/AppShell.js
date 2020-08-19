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

  componentDidMount() {
    this.popularDropdownPaises();
  }

  mostrarBtNoticiasSalvas() {
    document.getElementById("divBtNoticiasSalvas").style.display = "block";
    document.getElementById("divBtNoticiasDestaques").style.display = "none";
  }

  mostrarBtNoticiasDestaque() {
    document.getElementById("divBtNoticiasSalvas").style.display = "none";
    document.getElementById("divBtNoticiasDestaques").style.display = "block";
  }

  popularDropdownPaises() {
    let paises = {
      br: "Brasil",
      ae: "United Arab Emirates",
      ar: "Argentina",
      at: "Austria",
      au: "Australia",
      be: "Belgium",
      bg: "Bulgaria",
      ca: "Canada",
      ch: "Switzerland",
      cn: "China",
      co: "Colombia",
      cu: "Cuba",
      cz: "Czechia",
      de: "Germany",
      eg: "Egype",
      fr: "France",
      gb: "United Kingdom",
      gr: "Greee",
      hk: "Hong Kong",
      hu: "Hungary",
      id: "Indonesia",
      ie: "Ireland",
      il: "Israel",
      in: "India",
      it: "Italy",
      jp: "Japan",
      kr: "Korea",
      lt: "Lithuania",
      lv: "Latvia",
      ma: "Morocco",
      mx: "Mexico",
      my: "Malaysia",
      ng: "Nigeria",
      nl: "Netherlands",
      no: "Norway",
      nz: "New Zealand",
      ph: "Philippines",
      pl: "Poland",
      pt: "Portugal",
      ro: "Romania",
      rs: "Serbia",
      ru: "Russia",
      sa: "Saudi Arabia",
      se: "Sweden",
      sg: "Singapore",
      si: "Slovenia",
      sk: "Slovakia",
      th: "Thailand",
      tr: "Turkey",
      tw: "Taiwan",
      ua: "Ukraine",
      us: "United States of America",
      ve: "Venezuela",
      za: "South Africa"
    };

    let ddPais = document.getElementById("ddPais");
    let countryKeys = Object.keys(paises);

    for (let index = 0; index < countryKeys.length; index++) {
      const sigla = countryKeys[index];
      const pais = paises[sigla];
      let option = document.createElement("option");
      option.appendChild(document.createTextNode(pais));
      option.value = sigla;
      ddPais.appendChild(option);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline">
            <select
              id="ddPais"
              className="form-control"
              onChange={() => {
                this.props.api
                  .buscarNoticiasPais(document.getElementById("ddPais").value)
                  .then(listaNoticias => {
                    this.props.dispatch({
                      type: "noticia/updateLista",
                      lista: listaNoticias
                    });
                  });
              }}
            ></select>
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
