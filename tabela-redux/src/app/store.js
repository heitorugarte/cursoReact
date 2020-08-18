import { configureStore } from "@reduxjs/toolkit";
import tarefaReducer from "../features/tarefaSlice";

export default configureStore({
  reducer: {
    tarefa: tarefaReducer
  }
});
