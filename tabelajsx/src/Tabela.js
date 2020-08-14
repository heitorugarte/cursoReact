import React from "react";
import Tarefa from "../src/Tarefa.js";

export default class Tabela extends React.Component {
  constructor(props) {
    super(props);
    this.tarefasController = props.tarefasController;
    this.state = { listaTarefas: props.listaTarefas };
  }

  render() {
    console.log("chamou render");
    return (
      <div id="divTabela">
        <table id="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição da Tarefa</th>
              <th>Situação</th>
            </tr>
          </thead>
          <Tcorpo listaTarefas={this.state.listaTarefas} />
          <tfoot>
            <tr>
              <td></td>
              <td>
                <input
                  id="descricaoTxt"
                  type="text"
                  placeholder="Descrição..."
                ></input>
              </td>
              <td>
                <div id="divInserir">
                  <select name="statusSelect" id="dropdownStatus">
                    <option value="A fazer">A fazer</option>
                    <option value="Fazendo">Fazendo</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                  <button
                    id="btAdicionar"
                    onClick={() => {
                      this.tarefasController
                        .adicionarTarefa(
                          document.getElementById("descricaoTxt").value,
                          document.getElementById("dropdownStatus").value
                        )
                        .then(() => {
                          this.setState({
                            listaTarefas: this.tarefasController.listaTarefas
                          });
                        });
                    }}
                  >
                    Adicionar
                  </button>
                  <button
                    id="btRemover"
                    onClick={() => {
                      document.getElementById("divInserir").style.display =
                        "none";
                      document.getElementById("divRemocao").style.display =
                        "block";
                      let dropdownIndices = document.getElementById(
                        "indiceRemover"
                      );
                      dropdownIndices.innerHTML = "";
                      for (
                        let index = 0;
                        index < this.tarefasController.listaTarefas.length;
                        index++
                      ) {
                        const tarefa = this.tarefasController.listaTarefas[
                          index
                        ];
                        let option = document.createElement("option");
                        option.innerHTML = tarefa.id;
                        option.value = tarefa.id;
                        dropdownIndices.appendChild(option);
                      }
                    }}
                  >
                    Remover
                  </button>
                </div>
                <div id="divRemocao">
                  <label>Informe o índice da tarefa:</label>
                  <select id="indiceRemover"></select>
                  <button
                    id="btOk"
                    onClick={() => {
                      let indiceEscolhido = document.getElementById(
                        "indiceRemover"
                      ).value;
                      this.tarefasController
                        .deleteTarefa(indiceEscolhido)
                        .then(result => {
                          this.tarefasController.listaTarefas = result;
                          this.setState({
                            listaTarefas: this.tarefasController.listaTarefas
                          });
                        });
                      document.getElementById("divInserir").style.display =
                        "block";
                      document.getElementById("divRemocao").style.display =
                        "none";
                    }}
                  >
                    OK
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export class Tcorpo extends React.Component {
  render() {
    return (
      <tbody>
        {this.props.listaTarefas ? (
          this.props.listaTarefas.map((tarefa, index) => {
            return (
              <Tr
                key={tarefa.id}
                id={tarefa.id}
                descricao={tarefa.descricao}
                situacao={tarefa.status}
              />
            );
          })
        ) : (
          <tr></tr>
        )}
      </tbody>
    );
  }
}

export class Tr extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.descricao}</td>
        <td>{this.props.situacao}</td>
      </tr>
    );
  }
}
