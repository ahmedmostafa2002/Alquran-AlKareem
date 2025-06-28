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
      const surah:SurahProps = useSelector((state:RootState)=>state.Surah.surah);
      const surahsStatus = useSelector((state:RootState)=>state.Surah.status);
      const theme = useSelector((state:RootState)=>state.Theme.theme);
      const dark = theme === "dark";

      const dispatch = useDispatch<AppDispatch>();
      const currentPath = useSelector((state: RootState) => state.CurrentPath.path);

      useEffect(() => {
        if (surahNumber > 0) { 
          dispatch(getSurahs(surahNumber));
        }
        
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, [currentPath, dispatch, surahNumber]); 


      const handleNextSurah = async () => {
        if (surahNumber < 114) {
          dispatch(setCurrentSurah(surahNumber + 1));
          await dispatch(getSurahs(surahNumber + 1));

          // Scroll main content to top
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

          // Scroll sidebar to next surah
          const sidebarContent = document.querySelector(".sidebar-content");
          const nextSurahElement = document.getElementById(`surah-${surahNumber + 1}`);

          if (sidebarContent && nextSurahElement) {
            const sidebarRect = sidebarContent.getBoundingClientRect();
            const elementRect = nextSurahElement.getBoundingClientRect();

            sidebarContent.scrollTo({
              top: elementRect.top - sidebarRect.top + sidebarContent.scrollTop,
              behavior: "smooth"
            });
          }
        }
      }

      const handlePreviousSurah = async () => {
        if (surahNumber > 1) {
          dispatch(setCurrentSurah(surahNumber - 1));
          await dispatch(getSurahs(surahNumber - 1));

          // Scroll main content to top
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

          // Scroll sidebar to previous surah
          const sidebarContent = document.querySelector(".sidebar-content");
          const prevSurahElement = document.getElementById(`surah-${surahNumber - 1}`);

          if (sidebarContent && prevSurahElement) {
            const sidebarRect = sidebarContent.getBoundingClientRect();
            const elementRect = prevSurahElement.getBoundingClientRect();

            sidebarContent.scrollTo({
              top: elementRect.top - sidebarRect.top + sidebarContent.scrollTop,
              behavior: "smooth"
            });
          }
        }
      }

      if (surahsStatus === 'loading' || (surah && surah.number === 0 && surahNumber !== 0)) {
        return <div className="flex justify-center items-center h-screen"><SimpleBackdrop/></div>;
      }

      if (surahsStatus === 'failed') {
          return <div className="flex justify-center items-center font-semibold text-lg h-screen text-red-600">Something Went Wrong Please Visit US later!</div>;
      }
      if(surahsStatus==="succeeded" && currentPath === "/surahs"){
        dispatch(setCurrentSurah(surah.number));
      }
      return (
          <div className={`flex flex-col ${sidebarOffsetClasses} ${dark?"bg-gradient-to-r from-slate-900 via-gray-900 to-indigo-950":""} gap-4 px-0 sm:px-10 py-28`}>
              <SurahTitle name={surah.name.transliteration.en} arabicName={surah.name.long}></SurahTitle>
              {surah.verses.map((ayah) => (
                <Ayah
                  key={ayah.number.inQuran}
                  {...ayah}
                />
              ))}
              <div className="flex flex-col items-center gap-8 mt-10 w-full">
                <div className="text-center py-2 px-12 rounded-full bg-blue-200 w-fit text-lg text-blue-600">End of Surah {surah.name.transliteration.en}</div>
                <div className="flex justify-center items-center gap-3">
                  <button onClick={handlePreviousSurah} className={`flex justify-center items-center rounded-md ${surahNumber === 1 ? "bg-blue-50":"bg-white"} border-2 border-blue-200 text-blue-600 py-2 px-4 ${surahNumber === 1 ? "cursor-default":"cursor-pointer"}`} disabled={surahNumber === 1}><ArrowLeftIcon/> Previous Surah</button>
                  <h3 className="text-blue-500 font-semibold text-lg">Surah {surahNumber} of 114</h3>
                  <button onClick={handleNextSurah} className={`flex justify-center items-center rounded-md ${surahNumber === 114 ? "bg-blue-50":"bg-white"} border-2 border-blue-200 text-blue-600 py-2 px-4 ${surahNumber === 114 ? "cursor-default":"cursor-pointer"}`} disabled={surahNumber === 114}>Next Surah <ArrowRightIcon/></button>
                  </div>
              </div>
          </div>
      )
}

export default Surah;