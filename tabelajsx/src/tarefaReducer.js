export default function reducer(state = { listaTarefas: [] }, action) {
  let novaLista = [];
  switch (action.type) {
    case "tarefa/updateLista":
      novaLista = action.lista;
      return {
        ...state,
        listaTarefas: novaLista
      };
    default:
      return state;
  }
}
