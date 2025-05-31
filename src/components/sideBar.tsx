import  '@mui/icons-material/ArrowCircleRight';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SearchIcon from '@mui/icons-material/Search'; 
import SurahDetailsProps from '../utils/interfaces/surah_details.interface';
import SurahDetails from './surah_details';
import {v4 as uuid} from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect } from 'react';
import { getSurahsDetails } from '../redux/slices/surahs_slice';

function SideBar() {


  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state:RootState)=>state.SideBar.isOpen);
  const currentSurahNumber = useSelector((state:RootState)=>state.CurrentSurah.number);
  const surahs:SurahDetailsProps[] = useSelector((state:RootState)=>state.Surah.surahsDetails);

  useEffect(()=>{
    dispatch(getSurahsDetails());
  },[dispatch]);

  

  // Effect to scroll to the current surah when the sidebar opens or the current surah changes
  useEffect(() => {
    // Ensure sidebar is open, surahs data is loaded, and a current surah is selected
    if (isOpen && surahs.length > 0 && currentSurahNumber) {
      // Find the DOM element corresponding to the current surah using a class
      const currentSurahElement = document.querySelector(`.surah-item-${currentSurahNumber}`);

      if (currentSurahElement) {
        currentSurahElement.scrollIntoView({
          behavior: 'smooth', // Smooth scrolling animation
          // Change 'center' to 'start' to scroll the item to the top of the view
          block: 'start'
        });
      }
    }
  }, [isOpen, currentSurahNumber, surahs]); // Re-run effect when these dependencies change

  return (
    <>
    <div className={`fixed text-center hidden lg:block bg-gradient-to-b from-purple-50 via-white to-white shadow-md' ${isOpen ? 'w-1/2 lg:w-1/3 xl:w-1/4' : 'w-0'}
    duration-500 ease-in-out h-screen  flex flex-col rounded-e-xl shadow-md`}>
    {isOpen && (
    <>
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
    </>
    )}

    </div>
    </>
  )
}

export default SideBar;
