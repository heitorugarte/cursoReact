export default function reducer(state = { listaNoticias: [] }, action) {
  let novaLista = [];
  switch (action.type) {
    case "noticia/updateLista":
      novaLista = action.lista;
      return {
        ...state,
        listaNoticias: novaLista
      };
    default:
      return state;
  }
}
