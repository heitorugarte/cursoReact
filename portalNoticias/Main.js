/**
 * @class Main
 *
 * @summary Classe principal da aplicação; Instancia todos os objetos à serem utilizados no portal
 * e adiciona o listener no evento 'onload' para que o serviceWorker seja registrado.
 * Cria as variaveis controller, dao e view de acesso global para que sejam acessadas
 * entre todos os scripts da aplicação.
 */

var controller, dao, view;
view = new View();
controller = new Controller();
dao = new Dao();

window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
};
