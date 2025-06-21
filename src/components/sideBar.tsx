import  '@mui/icons-material/ArrowCircleRight';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SurahDetailsProps from '../utils/interfaces/surah_details.interface';
import SurahDetails from './surah_details';
import {v4 as uuid} from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useEffect, useState} from 'react';
import { getSurahsDetails } from '../redux/slices/surahs_slice';
import SimpleBackdrop from './spinner';
import CloseIcon from '@mui/icons-material/Close';

// Add isDrawer prop with a default value of false
function SideBar() {

  const drawerOpen = useSelector((state:RootState)=>state.SideBar.drawerOpen);
  const theme = useSelector((state:RootState) => state.Theme.theme);

  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state:RootState)=>state.SideBar.isOpen);
  const currentSurahNumber = useSelector((state:RootState)=>state.CurrentSurah.number);
  const surahs:SurahDetailsProps[] = useSelector((state:RootState)=>state.Surah.surahsDetails);
  const surahsStatus = useSelector((state:RootState)=>state.Surah.status);
  const [searchText,setSearchText] = useState("");
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchText(e.target.value);
  };

  const dark = theme === "dark"?true:false;
  useEffect(()=>{
    dispatch(getSurahsDetails());
  },[dispatch]);



  useEffect(() => {
    if ((isOpen || drawerOpen) && surahs.length > 0 && currentSurahNumber) {
      const sidebarContent = document.querySelector(".sidebar-content"); // Add this class to your sidebar's content container
      const currentSurahElement = document.getElementById(`surah-${currentSurahNumber}`);
      
      if (sidebarContent && currentSurahElement) {
          const sidebarRect = sidebarContent.getBoundingClientRect();
          const elementRect = currentSurahElement.getBoundingClientRect();
          
          sidebarContent.scrollTo({
              top: elementRect.top - sidebarRect.top + sidebarContent.scrollTop,
              behavior: "smooth"
          });
      }
    }
  }, [isOpen, drawerOpen, currentSurahNumber, surahs]); // Add isDrawer to dependencies

  const normalizeArabic = (text: string): string => {
    if (!text) return "";

    return text
        .normalize("NFD") // تفكيك الأحرف المركبة
        .replace(/[\u064B-\u0652\u0640\u200C]/g, "") // إزالة التشكيل والتطويل والفاصل الصفري
        .replace(/[\u0622\u0623\u0625\u0671]/g, "ا") // استبدال جميع أشكال الألف
        .replace(/[\u0629]/g, "ه") // تحويل التاء المربوطة إلى هاء
        .replace(/[\u0649]/g, "ي") // تحويل الياء المقصورة إلى ياء
        .replace(/[\u0660-\u0669]/g, match => String.fromCharCode(match.charCodeAt(0) - 1584)) // تحويل الأرقام العربية إلى الغربية
        .replace(/\s+/g, " ") // إزالة المسافات الزائدة
        .toLowerCase().trim();
};



  const handleClearSearch = () => {
    setSearchText('');
    
    // Wait for next frame to ensure DOM is updated
    requestAnimationFrame(() => {
      setTimeout(() => {
        const sidebarContent = document.querySelector(".sidebar-content");
        const currentSurahElement = document.getElementById(`surah-${currentSurahNumber}`);
        
        if (sidebarContent && currentSurahElement) {
          const sidebarRect = sidebarContent.getBoundingClientRect();
          const elementRect = currentSurahElement.getBoundingClientRect();
          
          sidebarContent.scrollTo({
            top: elementRect.top - sidebarRect.top + sidebarContent.scrollTop,
            behavior: "smooth"
          });
        }
      }, 300); // Increased timeout
    });
  };

  return (
    <>
    {/* Keep the main sidebar div's class conditional on isOpen for width */}
    <div id='sidebar' className={`fixed text-center ${drawerOpen?'block':'hidden'} lg:block ${dark?"bg-gradient-to-b from-slate-900 via-gray-900 to-indigo-950":"bg-gradient-to-b from-purple-50 via-white to-white"} ${isOpen || drawerOpen ? 'shadow-md' : ''} ${isOpen || drawerOpen ? 'w-[80vw] lg:w-1/3 xl:w-1/4' : 'w-0'}
    transition-all duration-500 ease-in-out h-screen ${drawerOpen?'pt-12':'pt-0'} flex flex-col`}>
    {(isOpen || drawerOpen) && (
    <>
    <div className='flex flex-col pt-12 items-start w-full flex-1'>
     <div className='flex flex-col px-4 items-start w-full'>
     <div className='flex justify-center items-center gap-3'>
      <div className='flex items-center justify-center h-10 w-10 bg-linear-to-r from-purple-600 to-indigo-500 rounded-lg'>
        <StarBorderOutlinedIcon className="text-2xl text-white" />
        </div>
        <div className='flex flex-col items-start'>
          <h2 className={`text-xl font-bold ${dark?"text-white":"text-purple-900"}`}>Surahs</h2>
          <p className={`${dark?"text-purple-400":"text-purple-700"} text-sm`}>Chapters of Quran</p>
        </div>
      </div>
      {/* ------------------search------------------- */}
      <div className='relative flex items-center my-6 w-full'>
        <SearchIcon className='absolute left-3 text-blue-500' />
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          className={`px-4 py-2 border-2 border-blue-200 outline-none ${dark?"text-white":"text-purple-900"} rounded-md w-full pl-10 pr-10`}
          placeholder='Search Surah...'
        />
        {searchText && (
          <CloseIcon
            className='absolute right-3 text-gray-500 cursor-pointer'
            onClick={handleClearSearch} // Change this line to use the new handler
          />
        )}
      </div>
     </div>
      <hr className='w-full text-gray-300 mb-2' />
      {/* ------------------surahs------------------- */}
      {surahsStatus === 'loading' ?
       <div className="flex justify-center items-center"><SimpleBackdrop/></div>:
       surahsStatus === "failed"?
       <div className="flex justify-center items-center font-semibold text-lg  text-red-600">Something Went Wrong Please Visit US later!</div>:
      <div className='flex flex-col gap-2 px-4 pb-20 w-full flex-1 sidebar-content overflow-y-auto max-h-[61vh]'> {/* Added flex-1 */}
        {surahs.map((surah)=>(
          (normalizeArabic(surah.name).includes(normalizeArabic(searchText))||surah.englishName.toLowerCase().includes(searchText.toLowerCase()))&&
          <SurahDetails  key={uuid()} {...surah} />
        ))}
      </div>
      }
    </div>
    </>
    )}
    </div>
    </>
  )
}

export default SideBar;
