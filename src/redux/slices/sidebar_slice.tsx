import { createSlice } from "@reduxjs/toolkit";

const SideBarSlice = createSlice({
    name:"SideBar",
    initialState:{
        isOpen:true,
        drawerOpen:false
    },
    reducers:{
        toggleSideBar:(state)=>{
            state.isOpen = !state.isOpen;
        },
        toogleDrawer:(state)=>{
            state.drawerOpen =!state.drawerOpen;
        },
        closeDrawer:(state)=>{
            state.drawerOpen =false;
        }
    }
});

export const {toggleSideBar,toogleDrawer,closeDrawer} = SideBarSlice.actions;
export default SideBarSlice.reducer;