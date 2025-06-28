import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseFont, increaseFont } from '../redux/slices/fontsize_slice';
import { useEffect, useState } from 'react';

function SettingHeader (){

    const fSize = useSelector((state:RootState)=>state.Font.fontSize);
    const isSidebarOpen = useSelector((state:RootState)=>state.SideBar.isOpen);
    const theme = useSelector((state:RootState) => state.Theme.theme);
    const dark = theme === 'dark';
    const dispatch = useDispatch();
    const handleIncreaseFontSize = ()=>{
        dispatch(increaseFont());
    }
    const handleDecreaseFontSize = ()=>{
        dispatch(decreaseFont());
    }

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(()=>{
    const checkScreenSize = ()=>{
      setIsSmallScreen(window.innerWidth <= 500);
    }
    checkScreenSize();
    window.addEventListener('resize',checkScreenSize);
    return ()=>{
      window.removeEventListener('resize',checkScreenSize);
    }
  },[])


    const sidebarOffsetClasses = isSidebarOpen
        ? 'w-full lg:w-2/3 xl:w-3/4  lg:left-1/3 xl:left-1/4' 
        : 'w-full left-0'; 


    return (
        <div className={`fixed ${sidebarOffsetClasses} flex flex-col lg:flex-row gap-6 items-center justify-between ${dark?"bg-gradient-to-r from-slate-900 via-gray-900 to-indigo-950":"bg-gradient-to-r from-purple-50  to-white"} py-5 sm:py-4 px-16 shadow-md transition-all duration-500 z-40`}>
        <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
          <div className={`${isSmallScreen? "hidden":"flex"} items-center justify-center h-10 w-10 ${dark?"bg-linear-to-r from-purple-800 via-blue-800 to-indigo-800":"bg-linear-to-r from-purple-200 via-blue-200 to-indigo-200"} rounded-lg`}>
            <SettingsIcon className="text-2xl text-white" />
            </div>
            <div className={`${isSmallScreen? "hidden":"flex"} flex-col items-start`}>
              <h2 className={`text-lg font-bold ${dark?"text-blue-100":"text-purple-800"}`}>Reading Controls</h2>
              <p className={`${dark?"text-purple-500":"text-purple-700"} text-sm`}>Customize your experience</p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-2'>
          <div className={`${isSmallScreen? "hidden":"flex"} justify-center items-center gap-2 px-4 py-2 rounded-xl  ${dark?"bg-linear-to-r from-purple-950 via-blue-950 to-indigo-950":"bg-linear-to-r from-purple-50  to-blue-50"}`}>
           <TitleIcon className={`${dark?"text-purple-300":"text-purple-600"}`}/>
           <h3 className={`${dark?"bg-gradient-to-r from-purple-100 via-purple-100 to-indigo-100":"bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-700"} bg-clip-text text-transparent`}>
           Font Size
           </h3>
           </div>
           <div className={`flex justify-center items-center gap-2 px-4 py-2 rounded-xl  ${dark?"bg-gray-700/70":"bg-white"} shadow-md`}>
          <IconButton onClick={handleDecreaseFontSize}>
          <RemoveIcon fontSize='small' className={`${dark?"text-purple-50":"text-purple-600"}`}/>
          </IconButton>
          <span className={`${dark?"bg-linear-to-r from-purple-900 via-blue-900 to-indigo-900":"bg-linear-to-r from-purple-50  to-blue-50"} px-6 py-1 rounded-xl`}>
          <h3 className={`${dark?"text-purple-100":"text-purple-800"} font-bold`}>
           {fSize}px
           </h3>
          </span>
           <IconButton onClick={handleIncreaseFontSize}>
           <AddIcon fontSize='small' className={`${dark?"text-purple-50":"text-purple-600"}`}/>
           </IconButton>
           </div>
          </div>
        </div>
)
}

export default SettingHeader;