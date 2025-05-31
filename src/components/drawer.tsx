import { useDispatch, useSelector } from "react-redux";
import { toogleDrawer } from "../redux/slices/sidebar_slice";
import { RootState } from "../redux/store";
import { Drawer } from "@mui/material";
import SurahDetails from "./surah_details";
import {v4 as uuid} from "uuid"
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SearchIcon from '@mui/icons-material/Search'; 
import SurahDetailsProps from "../utils/interfaces/surah.interface";


function MyDrawer(){

    const drawerOpen = useSelector((state:RootState)=>state.SideBar.drawerOpen);
    const dispatch = useDispatch();
    const handleClose = ()=>{
    dispatch(toogleDrawer());
    }
    const surahs:SurahDetailsProps[] = useSelector((state:RootState)=>state.Surah.surahsDetails);

 

    return (
        <Drawer open={drawerOpen} onClose={handleClose} className="lg:hidden" sx={{zIndex:3}}>
         <div className={`fixed text-center lg:block bg-gradient-to-b from-purple-50 via-white to-white shadow-md' w-[90vw] sm:w-[60vw] md:w-[40vw]
    duration-500 ease-in-out h-screen pt-12  flex flex-col rounded-e-xl shadow-md`}>
    
    <div className='flex flex-col pt-12 items-start w-full flex-1'> {/* Added flex-1 */}
     <div className='flex flex-col px-4 items-start w-full'>
     <div className='flex justify-center items-center gap-3'>
      <div className='flex items-center justify-center h-10 w-10 bg-linear-to-r from-purple-600 to-indigo-500 rounded-lg'>
        <StarBorderOutlinedIcon className="text-2xl text-white" />
        </div>
        <div className='flex flex-col items-start'>
          <h2 className='text-xl font-bold text-purple-900'>Surahs</h2>
          <p className='text-purple-700 text-sm'>Chapters of Quran</p>
        </div>
      </div>
      {/* ------------------search------------------- */}
      <div className='relative flex items-center my-6 w-full'>
        <SearchIcon className='absolute left-3 text-blue-500' />
        <input
          type="text"
          className='px-4 py-2 border-2 border-blue-200 outline-none rounded-md w-full pl-10'
          placeholder='Search Surah...'
        />
      </div>
     </div>
      <hr className='w-full text-gray-300 mb-2' />
      {/* ------------------surahs------------------- */}
      <div className='flex flex-col gap-2 px-4 pb-20 w-full flex-1 overflow-y-auto max-h-[70vh]'> {/* Added flex-1 */}
        {surahs.map((surah)=>(
          <SurahDetails  key={uuid()} {...surah} />
        ))}
      </div>
    </div>
    </div>
    </Drawer>
    )

}

export default MyDrawer;
