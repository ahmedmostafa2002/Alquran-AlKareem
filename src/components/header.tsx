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

  return(
    <div className="fixed z-50 w-full flex items-center justify-between bg-white p-4 shadow-md">
     <div className='flex flex-col gap-3'>
     <div className="flex items-center">
      <div className='lg:hidden me-3'>
        <IconButton onClick={handleDrawer}>
        <MenuIcon className='text-purple-800'/>
        </IconButton>
      </div>
        <div className='flex items-center justify-center h-10 w-10 bg-linear-to-r from-indigo-500 via-blue-500 to-indigo-500 rounded-lg'>
        <ImportContactsIcon className="text-2xl text-white" />
        </div>
        <h1 className="text-xl font-bold ml-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
          ALQuran AlKareem
        </h1>
      </div>
      <button onClick={handleSideBar} className="text-xl w-fit hidden lg:block font-bold ml-2 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent cursor-pointer">
         Al-Fatihah {isOpen?<ArrowDropUpIcon className='text-blue-400'/>:<ArrowDropDownIcon className='text-blue-400'/>}
        </button>
     </div>
      <div className='flex gap-4'>
      <IconButton onClick={handleTheme}>
        {theme === "light" ? <BedtimeOutlinedIcon/> : <LightModeOutlinedIcon/>}
      </IconButton>
      <div className=' flex justify-center items-center gap-3 px-8 py-1 rounded-full bg-linear-to-r from-indigo-50 via-blue-100 to-indigo-50'>
      <span className='bg-green-500 h-2 w-2 rounded-full animate-pulse'></span>
      <h3 className='bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent'>
        Reading Mode
      </h3>
      </div>
      </div>
    </div>
  )
}

export default Header;
