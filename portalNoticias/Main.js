var controller, dao, view;
view = new View();
controller = new Controller();
dao = new Dao();

window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
};