import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./slices/theme_slice";
import FontSizeReducer from "./slices/fontsize_slice";
import SideBarReducer from "./slices/sidebar_slice";
import CurrentSurahReducer from "./slices/current_surah_slice";
import SurahsReducer from "./slices/surahs_slice";

const store = configureStore({
    reducer:{
        Theme:ThemeReducer,
        Font:FontSizeReducer,
        SideBar:SideBarReducer,
        CurrentSurah:CurrentSurahReducer,
        Surah:SurahsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;