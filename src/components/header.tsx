import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { IconButton } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store"
import { toggleTheme } from '../redux/slices/theme_slice';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toggleSideBar, toogleDrawer } from '../redux/slices/sidebar_slice';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation} from 'react-router-dom';
import { setCurrentSurah } from '../redux/slices/current_surah_slice';
import { setCurrentPath } from '../redux/slices/current_path_slice';

function Header(){

  const theme = useSelector((state:RootState) => state.Theme.theme);
  const dispatch = useDispatch();
  const handleTheme = ()=>{
    dispatch(toggleTheme())
  }

  const isOpen  = useSelector((state:RootState) => state.SideBar.isOpen);
  const handleSideBar = ()=>{
    dispatch(toggleSideBar())
  }
  const handleDrawer = ()=>{
    dispatch(toogleDrawer())
  }
  
  const handleTitleClick = ()=>{
    dispatch(setCurrentSurah(0));
    dispatch(setCurrentPath("/"));
  }
  const location = useLocation();
  const currentPath = location.pathname;


  const dark = theme === "dark"?true:false;
  return(
    <div className={`fixed z-50 w-full flex items-center justify-between ${theme === "light"?"bg-white":"bg-gradient-to-r from-slate-900 via-gray-900 to-indigo-950"} p-4 shadow-md ${dark?"shadow-purple-950":"shadow-gray-100"} transition-all duration-500`}>
     <div className='flex flex-col gap-3'>
     <div className="flex items-center">
      <div className={`${currentPath !== "/" ? "block":"hidden"} lg:hidden me-3`}>
        <IconButton onClick={handleDrawer}>
        <MenuIcon className='text-purple-800'/>
        </IconButton>
      </div>
        <Link to="/" onClick={handleTitleClick} className='flex items-center gap-1 cursor-pointer'>
        <div className='flex items-center justify-center h-10 w-10 bg-linear-to-r from-indigo-500 via-blue-500 to-indigo-500 rounded-lg'>
        <ImportContactsIcon className="text-2xl text-white" />
        </div>
        <h1 className={`text-xl font-bold ml-2 ${dark?"bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-400":"bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700"} bg-clip-text text-transparent`}>
          ALQuran
        </h1>
        </Link>
      </div>
      <button onClick={handleSideBar} className={`text-xl w-fit hidden lg:${currentPath !== "/" ? "block":"hidden"}  font-bold ml-2 ${dark?"bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-400":"bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700"} bg-clip-text text-transparent cursor-pointer`}>
         Al-Fatihah {isOpen?<ArrowDropUpIcon className='text-blue-400'/>:<ArrowDropDownIcon className='text-blue-400'/>}
        </button>
     </div>
      <div className='flex gap-4'>
      <IconButton onClick={handleTheme}>
        {theme === "light" ? <BedtimeOutlinedIcon/> : <LightModeOutlinedIcon sx={{color:'white'}}/>}
      </IconButton>
      <div className={`flex justify-center items-center gap-3 px-8 py-1 rounded-full ${dark?"bg-linear-to-r from-purple-900 to-indigo-800":"bg-linear-to-r from-indigo-50 via-blue-100 to-indigo-50"}`}>
      <span className='bg-green-500 h-2 w-2 rounded-full animate-pulse'></span>
      <h3 className={`${dark?"bg-gradient-to-r from-purple-200 via-purple-200 to-indigo-100":"bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-700"} bg-clip-text text-transparent`}>
        Reading Mode
      </h3>
      </div>
      </div>
    </div>
  )
}

export default Header;
