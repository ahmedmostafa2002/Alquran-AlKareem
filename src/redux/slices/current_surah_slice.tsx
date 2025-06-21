import { createSlice } from "@reduxjs/toolkit";

const getInitialCurrentSurahNumber =  ():number=>{
    if(typeof window !== "undefined"){
        const currentSurahNumber = localStorage.getItem("currentSurahNumber");
        if(currentSurahNumber){
            return parseInt(currentSurahNumber);
        }else{
            return 0;
        }
    }else{
        return 0;
    }
}

const CurrentSurahSlice = createSlice({
    name:"currentSurah",
    initialState:{
        number:getInitialCurrentSurahNumber()
    },
    reducers:{
        setCurrentSurah:(state,action)=>{
            state.number = action.payload;
            if(typeof window !== "undefined"){
                localStorage.setItem("currentSurahNumber",action.payload);
            }
        }
    }
});

export const {setCurrentSurah} = CurrentSurahSlice.actions;
export default CurrentSurahSlice.reducer;
