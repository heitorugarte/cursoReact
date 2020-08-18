import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTarefa } from "./tarefaSlice";
import Tcorpo from "./Tcorpo";

export function Tabela() {
  const dispatch = useDispatch();

  return (
    <div className="divTabela">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Descrição</td>
            <td>Situação</td>
          </tr>
        </thead>
        <Tcorpo />
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                id="inputDescricao"
                type="text"
                placeholder="Descrição..."
              ></input>
            </td>
            <td>
              <select id="ddSituacao">
                <option>A fazer</option>
                <option>Fazendo</option>
                <option>Feito</option>
              </select>
              <button
                onClick={() =>
                  dispatch(
                    addTarefa({
                      descricao: document.getElementById("inputDescricao")
                        .value,
                      situacao: document.getElementById("ddSituacao").value
                    })
                  )
                }
              >
                OK
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
