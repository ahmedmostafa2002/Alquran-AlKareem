import { useDispatch, useSelector } from "react-redux";
import SurahProps from "../utils/interfaces/surah.interface";
import SurahTitle from "./surah_title";
import { AppDispatch, RootState } from "../redux/store";
import Ayah from "./ayah";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { setCurrentSurah } from "../redux/slices/current_surah_slice";
import { useEffect } from "react";
import { getSurahs } from "../redux/slices/surahs_slice";
import SimpleBackdrop from "./spinner";

function Surah() {
  const isSidebarOpen = useSelector((state:RootState)=>state.SideBar.isOpen);
    const sidebarOffsetClasses = isSidebarOpen
    ? 'w-full lg:w-2/3 xl:w-3/4 lg:ms-[33.3%] xl:ms-[25%]'
    : 'w-full left-0'; 
      const surahNumber = useSelector((state:RootState)=>state.CurrentSurah.number);
      const Surahs:SurahProps[] = useSelector((state:RootState)=>state.Surah.surahs);
      const surahsStatus = useSelector((state:RootState)=>state.Surah.status); // Get loading status
      
      // Calculate currentSurah directly in the component body
      const currentSurah = Surahs[0];
      const englishSurah = Surahs[1];
      
      const dispatch = useDispatch<AppDispatch>();
      
      const handleNextSurah = ()=>{
        dispatch(setCurrentSurah(surahNumber+1));
        dispatch(getSurahs(surahNumber+1));
        window.scrollTo({
          top:0,
          behavior:"smooth"
      });
      }
      const handlePreviousSurah = ()=>{
        dispatch(setCurrentSurah(surahNumber-1))
        dispatch(getSurahs(surahNumber-1));
        window.scrollTo({
          top:0,
          behavior:"smooth"
      });
      }
      useEffect(()=>{
        if (surahsStatus === 'idle') {
          dispatch(getSurahs(surahNumber));
        }
      },[dispatch, surahsStatus , surahNumber]); 
      
      if (surahsStatus === 'loading' || !currentSurah) {
        return <div className="flex justify-center items-center h-screen"><SimpleBackdrop/></div>;
      }
      
      if (surahsStatus === 'failed') {
          return <div className="flex justify-center items-center font-semibold text-lg h-screen text-red-600">Please Check Your Internet!</div>;
      }
      
      return (
      
          <div className={`flex flex-col ${sidebarOffsetClasses} gap-4 px-0 sm:px-10 py-28`}>
              {/* Use currentSurah for title */}
              <SurahTitle name={currentSurah.englishName} arabicName={currentSurah.name}></SurahTitle>
              {/* Map over currentSurah's ayahs */}
              {currentSurah.ayahs.map((ayah, index) => (
                <Ayah
                  key={ayah.numberInSurah} // Use ayah.numberInSurah as a stable key
                  ayah={ayah}
                  englishText={englishSurah.ayahs[index].text}
                />
              ))}
              <div className="flex flex-col items-center gap-8 mt-10 w-full">
                {/* Use currentSurah name */}
                <div className="text-center py-2 px-12 rounded-full bg-blue-200 w-fit text-lg text-blue-600">End of Surah {currentSurah.name}</div>
                <div className="flex justify-center items-center gap-3">
                  <button onClick={handlePreviousSurah} className={`flex justify-center items-center rounded-md ${surahNumber === 1 ? "bg-blue-50":"bg-white"} border-2 border-blue-200 text-blue-600 py-2 px-4 ${surahNumber === 1 ? "cursor-default":"cursor-pointer"}`} disabled={surahNumber === 1}><ArrowLeftIcon/> Previous Surah</button>
                  {/* Use Surahs.length for total count */}
                  <h3 className="text-blue-500 font-semibold text-lg">Surah {surahNumber} of 114</h3>
                  <button onClick={handleNextSurah} className={`flex justify-center items-center rounded-md ${surahNumber === 114 ? "bg-blue-50":"bg-white"} border-2 border-blue-200 text-blue-600 py-2 px-4 ${surahNumber === 114 ? "cursor-default":"cursor-pointer"}`} disabled={surahNumber === 114}>Next Surah <ArrowRightIcon/></button>
                  </div>
              </div>
          </div>
      )
}

export default Surah;