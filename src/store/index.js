import { configureStore } from "@reduxjs/toolkit";
import trainer from "./slices/trainer.slice";
import pageSlice from "./slices/pageSlice";
export default configureStore({
    reducer: {
        trainer,
        pageSlice
    }
})