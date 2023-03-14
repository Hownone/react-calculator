import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
    reducer, //实际上是reducer: reducer,因为Key和value一致时可以只写一个就好了
})

export default store;