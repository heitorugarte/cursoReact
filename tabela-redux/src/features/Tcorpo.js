import React from "react";

export function Tcorpo(props) {
  return (
    <tbody>
      {props.listaTarefas ? (
        props.listaTarefas.map((tarefa, index) => {
          return (
            <Tr
              key={Math.random()}
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

export function Tr(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.descricao}</td>
      <td>{props.situacao}</td>
    </tr>
  );
}

export default Tcorpo;
