import { createSlice } from "@reduxjs/toolkit";



const getInitialCurrentPath =  ():string=>{
    if(typeof window !== "undefined"){
        const currentPath = localStorage.getItem("currentPath");
        if(currentPath){
            return currentPath;
        }else{
            return "/"; 
        }
    }else{
        return "/";
    }
}

const CurrentPathSlice = createSlice({
    name:"currentPath",
    initialState:{
        path:getInitialCurrentPath()
        
    },
    reducers:{
        setCurrentPath:(state,action)=>{
            state.path = action.payload;
            if(typeof window !== "undefined"){
                localStorage.setItem("currentPath",action.payload);
            }
        }
    }
});

export const {setCurrentPath} = CurrentPathSlice.actions;
export default CurrentPathSlice.reducer;
