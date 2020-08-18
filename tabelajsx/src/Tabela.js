import React, { Component } from "react";
import Tarefa from "../src/Tarefa.js";
import { connect } from "react-redux";
import DataBase from "./DataBase.js";

class Tabela extends Component {
  constructor(props) {
    super(props);
    this.dataBase = new DataBase();
  }

  async componentDidMount() {
    await this.dataBase.getListaTarefas().then(listaTarefas => {
      this.createDispatch(listaTarefas);
    });
  }

  async addTarefa(descricao, situacao) {
    let tarefa = new Tarefa(descricao, situacao);
    await this.dataBase.persistirTarefa(tarefa).then(listaTarefas => {
      this.createDispatch(listaTarefas);
    });
  }

  async removeTarefa(id) {
    await this.dataBase.deletarObjeto(id).then(listaTarefas => {
      this.createDispatch(listaTarefas);
      document.getElementById("divInserir").style.display = "block";
      document.getElementById("divRemocao").style.display = "none";
    });
  }

  createDispatch(listaTarefas) {
    this.props.dispatch({
      type: "tarefa/updateLista",
      lista: listaTarefas
    });
  }

  mostrarPainelRemocao() {
    document.getElementById("divInserir").style.display = "none";
    document.getElementById("divRemocao").style.display = "block";
    let dropdownIndices = document.getElementById("indiceRemover");
    dropdownIndices.innerHTML = "";
    for (let index = 0; index < this.props.listaTarefas.length; index++) {
      const tarefa = this.props.listaTarefas[index];
      let option = document.createElement("option");
      option.innerHTML = tarefa.id;
      option.value = tarefa.id;
      dropdownIndices.appendChild(option);
    }
  }

  mostrarPainelAdicionar() {
    document.getElementById("divInserir").style.display = "block";
    document.getElementById("divRemocao").style.display = "none";
  }

  async apagarTudo() {
    await this.dataBase.deletarTodos().then(listaTarefas => {
      this.props.dispatch({
        type: "tarefa/updateLista",
        lista: listaTarefas
      });
    });
    this.mostrarPainelAdicionar();
  }

  render() {
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
          <Tcorpo listaTarefas={this.props.listaTarefas} />
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
                      this.addTarefa(
                        document.getElementById("descricaoTxt").value,
                        document.getElementById("dropdownStatus").value
                      );
                      document.getElementById("descricaoTxt").value = "";
                    }}
                  >
                    Adicionar
                  </button>
                  <button
                    id="btRemover"
                    onClick={() => this.mostrarPainelRemocao()}
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
                      let id = document.getElementById("indiceRemover").value;
                      if (id === "") this.mostrarPainelAdicionar();
                      else this.removeTarefa(id);
                    }}
                  >
                    OK
                  </button>
                  <button
                    id="btApagarTodos"
                    onClick={() => {
                      this.apagarTudo();
                    }}
                  >
                    Apagar Tudo
                  </button>
                  <button
                    id="btCancelar"
                    onClick={() => {
                      this.mostrarPainelAdicionar();
                    }}
                  >
                    Cancelar
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

const mapStateToProps = state => {
  return {
    listaTarefas: state.listaTarefas
  };
};

export default connect(mapStateToProps)(Tabela);

//-----------------------------------------------------------------------------------------------------
class Tcorpo extends React.Component {
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
                situacao={tarefa.situacao}
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

class Tr extends React.Component {
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
