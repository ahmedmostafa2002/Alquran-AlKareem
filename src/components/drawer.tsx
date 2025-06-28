import { useDispatch, useSelector } from "react-redux";
import { closeDrawer} from "../redux/slices/sidebar_slice";
import { AppDispatch, RootState } from "../redux/store";
import { Drawer } from "@mui/material";
import SideBar from "./sideBar";
import { useEffect } from "react"; 

function MyDrawer(){

    const drawerOpen = useSelector((state:RootState)=>state.SideBar.drawerOpen);
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = ()=>{
        dispatch(closeDrawer());
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && drawerOpen) {
                dispatch(closeDrawer()); 
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();
        

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [drawerOpen, dispatch]); 

    return (
        <Drawer
         open={drawerOpen} onClose={handleClose} className="lg:hidden" sx={{zIndex:3}}>
         <SideBar></SideBar>
        </Drawer>
    )
}

export default MyDrawer;
