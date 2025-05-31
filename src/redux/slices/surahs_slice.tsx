import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSurahs = createAsyncThunk("surahs/getSurahs", async (number:number) => {
    const response = await axios.get(`http://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,en.sahih`);
    return response.data;
});

export const getSurahsDetails = createAsyncThunk("surahs/getSurahsDetails", async () => {
    const response = await axios.get("https://api.alquran.cloud/v1/surah");
    return response.data;
});

const surahsSlice = createSlice({
    name: "surahs",
    initialState: {
        surahsDetails:[],
        surahs: [],
        status: "idle",
        error: false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getSurahs.pending,(state)=>{
            state.status = "loading";
        });
        builder.addCase(getSurahs.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.surahs = action.payload.data;
        });
        builder.addCase(getSurahs.rejected,(state)=>{
            state.status = "failed";
            state.error = true;
        });
        builder.addCase(getSurahsDetails.pending,(state)=>{
            state.status = "loading";
        });
        builder.addCase(getSurahsDetails.fulfilled,(state,action)=>{
            state.status = "succeeded";
            state.surahsDetails = action.payload.data;
        });
        builder.addCase(getSurahsDetails.rejected,(state)=>{
            state.status = "failed";
            state.error = true;
        });
    }
});

export default surahsSlice.reducer;