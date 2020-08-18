import { createSlice } from "@reduxjs/toolkit";

let id = 0;

export const tarefaSlice = createSlice({
  name: "tarefas",
  initialState: {
    listaTarefas: []
  },
  reducers: {
    addTarefa: (state, dados) => {
      let novaTarefa = {
        id: (id += 1),
        descricao: dados.payload.descricao,
        situacao: dados.payload.situacao
      };
      let novaListaTarefas = state.listaTarefas;
      novaListaTarefas.push(novaTarefa);
      state.listaTarefas = novaListaTarefas;
    }
  }
});

export const { addTarefa } = tarefaSlice.actions;

export default tarefaSlice.reducer;
