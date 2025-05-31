import { useDispatch, useSelector } from "react-redux";
import SurahDetailsProps from "../utils/interfaces/surah_details.interface";
import { AppDispatch, RootState } from "../redux/store";
import { setCurrentSurah } from "../redux/slices/current_surah_slice";
import { closeDrawer } from "../redux/slices/sidebar_slice";
import { getSurahs } from "../redux/slices/surahs_slice";


function SurahDetails(surah:SurahDetailsProps){
    
const dispatch = useDispatch<AppDispatch>();
const currentSurah = useSelector((state:RootState)=>state.CurrentSurah.number);

const handleOnClick  = ()=>{
    dispatch(closeDrawer())
    dispatch(setCurrentSurah(surah.number)); 
    dispatch(getSurahs(surah.number));
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

const backGround = `${surah.number === currentSurah ? "bg-blue-100" : "white"}`


    return (
        <div onClick={handleOnClick} className={`flex flex-col gap-3 items-start ${backGround} rounded-lg p-4 hover:shadow-lg hover:scale-105 transition duration-500 cursor-pointer`}>
           <div className="flex flex-col md:flex-row items-start justify-between w-full">
            <h2 className="text-lg font-bold text-purple-950"><span className="text-md font-bold text-blue-500">{surah.number}</span> {surah.englishName}</h2>
            <h2 className="text-md font-bold text-blue-500">{surah.name}</h2>
           </div>
           <h2 className="text-sm font-semibold text-blue-500">{surah.revelationType}</h2>
           <h2 className="text-sm font-semibold text-blue-500">{surah.numberOfAyahs} Ayat</h2>
        </div>
    )
}

export default SurahDetails;