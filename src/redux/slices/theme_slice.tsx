import {createSlice} from "@reduxjs/toolkit"


const getInitialTheme = ():string=>{
    if(typeof window !== "undefined"){
        const theme = localStorage.getItem("theme");
        if(theme){
            return theme;
        }else{
            return "light";
        }
    }else{
        return "light";
    }
}

const ThemeSlice = createSlice({
    name: "theme",
    initialState: {
        theme:getInitialTheme()
    },
    reducers: {
        toggleTheme: (state) => {
           state.theme = state.theme === "light" ? "dark" : "light";
           if(typeof window !== "undefined"){
            localStorage.setItem("theme", state.theme);
           }
        }
    }
});

export const {toggleTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;