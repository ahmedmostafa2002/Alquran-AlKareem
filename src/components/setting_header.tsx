import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseFont, increaseFont } from '../redux/slices/fontsize_slice';

function SettingHeader (){

    const fSize = useSelector((state:RootState)=>state.Font.fontSize);
    const isSidebarOpen = useSelector((state:RootState)=>state.SideBar.isOpen);
    const dispatch = useDispatch();
    const handleIncreaseFontSize = ()=>{
        dispatch(increaseFont());
    }
    const handleDecreaseFontSize = ()=>{
        dispatch(decreaseFont());
    }

    const sidebarOffsetClasses = isSidebarOpen
        ? 'w-full lg:w-2/3 xl:w-3/4  lg:left-1/3 xl:left-1/4' 
        : 'w-full left-0'; 


    return (
        <div className={`fixed ${sidebarOffsetClasses} flex flex-col lg:flex-row gap-6 items-center justify-between bg-gradient-to-r from-purple-50  to-white py-7 sm:py-4 px-16 shadow-md`}> {/* Added fixed top-0 and dynamic classes */}
        <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
          <div className='flex items-center justify-center h-10 w-10 bg-linear-to-r from-purple-200 via-blue-200 to-indigo-200 rounded-lg'>
            <SettingsIcon className="text-2xl text-white" />
            </div>
            <div className='flex flex-col items-start'>
              <h2 className='text-lg font-bold text-purple-800'>Reading Controls</h2>
              <p className='text-purple-700 text-sm'>Customize your experience</p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-2'>
          <div className=' flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-50  to-blue-50'>
           <TitleIcon className='text-purple-600'/>
           <h3 className='bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent'>
           Font Size
           </h3>
           </div>
           <div className=' flex justify-center items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md'>
          <IconButton onClick={handleDecreaseFontSize}>
          <RemoveIcon fontSize='small' className='text-purple-600'/>
          </IconButton>
          <span className='bg-linear-to-r from-purple-50  to-blue-50 px-6 py-1 rounded-xl'>
          <h3 className='text-purple-800 font-bold'>
           {fSize}px
           </h3>
          </span>
           <IconButton onClick={handleIncreaseFontSize}>
           <AddIcon fontSize='small' className='text-purple-600'/>
           </IconButton>
           </div>
          </div>
        </div>
)
}

export default SettingHeader;