import { useDispatch, useSelector } from "react-redux";
import SurahDetailsProps from "../utils/interfaces/surah_details.interface";
import { AppDispatch, RootState } from "../redux/store";
import { setCurrentSurah } from "../redux/slices/current_surah_slice";
import { closeDrawer } from "../redux/slices/sidebar_slice";
import { getSurahs } from "../redux/slices/surahs_slice";


function SurahDetails(surah:SurahDetailsProps){
    
const dispatch = useDispatch<AppDispatch>();
const currentSurah = useSelector((state:RootState)=>state.CurrentSurah.number);
const theme = useSelector((state:RootState)=>state.Theme.theme);
const dark = theme === "dark"?true:false;

const handleOnClick = async () => {
    dispatch(setCurrentSurah(surah.number)); 
    await dispatch(getSurahs(surah.number));
    
    // Scroll main content to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    
    // Scroll sidebar to the selected surah
    const sidebarContent = document.querySelector(".sidebar-content"); // Add this class to your sidebar's content container
    const currentSurahElement = document.getElementById(`surah-${surah.number}`);
    
    if (sidebarContent && currentSurahElement) {
        const sidebarRect = sidebarContent.getBoundingClientRect();
        const elementRect = currentSurahElement.getBoundingClientRect();
        
        sidebarContent.scrollTo({
            top: elementRect.top - sidebarRect.top + sidebarContent.scrollTop,
            behavior: "smooth"
        });
    }
    
    dispatch(closeDrawer());
}

const backGround = `${surah.number === currentSurah? dark? "bg-gradient-to-r from-purple-800/50 to-blue-800/50" : "bg-blue-100" : "white"}`


    return (
        <div onClick={handleOnClick} id={`surah-${surah.number}`} className={`surah-item-${surah.number} flex flex-col gap-3 items-start ${backGround} rounded-lg p-4 hover:shadow-lg hover:scale-105 transition duration-500 ease-in-out cursor-pointer`}>
           <div className="flex flex-col md:flex-row items-start justify-between w-full">
            <h2 className={`text-lg font-bold transition-colors duration-500 ${dark?"text-white":"text-purple-950"}`}>
              <span className={`text-md font-bold transition-colors duration-500 ${dark?"text-blue-400":"text-blue-500"}`}>{surah.number}</span> {surah.englishName}
            </h2>
            <h2 className={`text-md font-bold transition-colors duration-500 ${dark?"text-blue-100":"text-blue-500"}`}>{surah.name}</h2>
           </div>
           <div className="flex flex-col md:flex-row items-start justify-between w-full">
           <h2 className={`text-sm font-semibold transition-colors duration-500 ${dark?"text-blue-400":"text-blue-500"}`}>{surah.revelationType}</h2>
           <h2 className={`text-sm font-semibold transition-colors duration-500 ${dark?"text-blue-100":"text-blue-500"}`}>
             {surah.revelationType === "Meccan"?"مكيه":"مدنيه"}
           </h2>
            </div>
           <h2 className={`text-sm font-semibold transition-colors duration-500 ${dark?"text-blue-400":"text-blue-500"}`}>{surah.numberOfAyahs} Ayat</h2>
        </div>
    )
}

export default SurahDetails;

