import { View } from "./src/View.js";
import { Controller } from "./src/Controller.js";
import { Dao } from "./src/DAO.js";

/**
 * @class Main
 *
 * @summary Classe principal da aplicação; Instancia todos os objetos à serem utilizados no portal
 * e adiciona o listener no evento 'onload' para que o serviceWorker seja registrado.
 * Cria as variaveis controller, dao e view de acesso global para que sejam acessadas
 * entre todos os scripts da aplicação.
 *
 * @since 1.0.0
 * @author Heitor Silveira <heitorsilveirafurb@gmail.com>
 *
 */

window.view = new View();
window.controller = new Controller();
window.dao = new Dao();

window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
};
