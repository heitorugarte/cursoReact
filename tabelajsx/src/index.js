import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { AppShell } from "./AppShell.js";
import * as serviceWorker from "./serviceWorker";
import TarefasController from "../src/TarefasController.js";

let tarefasController = new TarefasController();

tarefasController.getLista().then(lista => {
  ReactDOM.render(
    <React.StrictMode>
      <AppShell tarefasController={tarefasController} listaTarefas={lista} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
