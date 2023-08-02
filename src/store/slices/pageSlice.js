import { createSlice } from "@reduxjs/toolkit"

export const pageSlice =  createSlice({

    name: 'trainer',
    initialState: 0,
    reducers: {
        setPageG: (state, action) => action.payload,
    }
    
})

export const {setPageG} = pageSlice.actions;
export default pageSlice.reducer;
