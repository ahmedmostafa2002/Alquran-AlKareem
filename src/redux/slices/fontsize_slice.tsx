import { createSlice } from "@reduxjs/toolkit";


const FontSizeSlice = createSlice({
    name: "font",
    initialState: {
        fontSize: 20
    },
    reducers:{
        increaseFont:(state)=>{
            if(state.fontSize <= 30){
                state.fontSize += 2
            }
        },
        decreaseFont:(state)=>{
            if(state.fontSize >= 16){
                state.fontSize -= 2
            }
        }
    }
});

export const {increaseFont, decreaseFont} = FontSizeSlice.actions;
export default FontSizeSlice.reducer;