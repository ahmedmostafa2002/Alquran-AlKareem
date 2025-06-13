import { createSlice } from "@reduxjs/toolkit";

const getInitialFontSize = ()=>{
    if(typeof window !== "undefined"){
        const fontSize = localStorage.getItem("fontSize");
        if(fontSize){
            return parseInt(fontSize);
        }else{
            return 20;
        }
    }else{
        return 20;
    }
}

const FontSizeSlice = createSlice({
    name: "font",
    initialState: {
        fontSize: getInitialFontSize()
    },
    reducers:{
        increaseFont:(state)=>{
            if(state.fontSize <= 30){
                state.fontSize += 2
                if(typeof window !== "undefined"){
                    localStorage.setItem("fontSize", state.fontSize.toString());
                }
            }
        },
        decreaseFont:(state)=>{
            if(state.fontSize >= 16){
                state.fontSize -= 2
                if(typeof window !== "undefined"){
                    localStorage.setItem("fontSize", state.fontSize.toString());
                }
            }
        }
    }
});

export const {increaseFont, decreaseFont} = FontSizeSlice.actions;
export default FontSizeSlice.reducer;