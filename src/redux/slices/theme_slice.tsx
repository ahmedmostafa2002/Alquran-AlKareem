import {createSlice} from "@reduxjs/toolkit"


const ThemeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: "light"
    },
    reducers: {
        toggleTheme: (state) => {
            if (state.theme === "light") {
                state.theme = "dark"
            } else {
                state.theme = "light"
            }
        }
    }
});

export const {toggleTheme} = ThemeSlice.actions;
export default ThemeSlice.reducer;