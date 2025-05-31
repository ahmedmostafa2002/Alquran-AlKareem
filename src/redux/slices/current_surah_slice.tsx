import { createSlice } from "@reduxjs/toolkit";

const CurrentSurahSlice = createSlice({
    name:"currentSurah",
    initialState:{
        number:1
    },
    reducers:{
        setCurrentSurah:(state,action)=>{
            state.number = action.payload;
        }
    }
});

export const {setCurrentSurah} = CurrentSurahSlice.actions;
export default CurrentSurahSlice.reducer;
