import React from "react";
import Styles from "../src/css/styles.css";
import Tabela from "./Tabela";
import TarefasController from "./TarefasController.js";

export class AppShell extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.tarefasController = props.tarefasController;
    this.listaTarefas = props.listaTarefas;
  }

  render() {
    return (
      <div id="corpo">
        <div id="divMenuEsquerda">
          <h2>Menu Lateral Esquerda</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            posuere pretium dui, vel ultricies mauris luctus et. Morbi metus
            elit, iaculis sit amet ultricies nec, semper vitae nunc. Aenean id
            tincidunt diam, ac ultrices diam. Praesent sed ex tempor, hendrerit
            mauris id, consequat sapien. Duis aliquam velit non tortor tempus,
            quis feugiat nisi ultricies. Phasellus viverra luctus tortor vel
            sagittis. Integer vel velit porttitor, accumsan magna vel, varius
            arcu. Curabitur semper tincidunt interdum. Phasellus sollicitudin
            pretium scelerisque. Donec vel porta quam, eu placerat purus. Duis
            ligula sapien, facilisis non dapibus sed, faucibus eget est.
            Praesent ac auctor erat, id dictum sapien. In sollicitudin feugiat
            ante, non sagittis lacus ornare tristique.
          </p>
        </div>
        <div id="divMenuDireita">
          <h2>Menu Lateral Direita</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            posuere pretium dui, vel ultricies mauris luctus et. Morbi metus
            elit, iaculis sit amet ultricies nec, semper vitae nunc. Aenean id
            tincidunt diam, ac ultrices diam. Praesent sed ex tempor, hendrerit
            mauris id, consequat sapien. Duis aliquam velit non tortor tempus,
            quis feugiat nisi ultricies. Phasellus viverra luctus tortor vel
            sagittis. Integer vel velit porttitor, accumsan magna vel, varius
            arcu. Curabitur semper tincidunt interdum. Phasellus sollicitudin
            pretium scelerisque. Donec vel porta quam, eu placerat purus. Duis
            ligula sapien, facilisis non dapibus sed, faucibus eget est.
            Praesent ac auctor erat, id dictum sapien. In sollicitudin feugiat
            ante, non sagittis lacus ornare tristique.
          </p>
        </div>
        <Tabela
          tarefasController={this.tarefasController}
          listaTarefas={this.listaTarefas}
        />
      </div>
    );
  }
}
