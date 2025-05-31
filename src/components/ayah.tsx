import AyahProp from "../utils/interfaces/ayah.interface";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";

function Ayah(props:{ayah:AyahProp,englishText:string}){
    const {ayah,englishText} = props;
    const fSize = useSelector((state:RootState)=>state.Font.fontSize);
    const surahNumber = useSelector((state:RootState)=>state.CurrentSurah.number);
    const [tafsirText , setTafsirText] = useState("");
    const [currentTafsir , setCurrentTafsir] = useState(1);
    const [audioOn,toggleAudio] = useState(false);

    const handleAudio = ()=>{
        toggleAudio(!audioOn);
    }

    const [tafsirOpen,toggleTafsir] = useState(false);

    const fetchTafsir = async (tafseerId: number, surahNum: number, ayahNum: number) => {
        try {
            const response = await axios.get(`http://api.quran-tafseer.com/tafseer/${tafseerId}/${surahNum}/${ayahNum}`);
            setTafsirText(response.data.text);
        } catch (error) {
            console.error("Error fetching tafsir:", error);
            setTafsirText("Failed to load tafsir.");
        }
    };

    const handleTafsir = ()=>{
        toggleTafsir(!tafsirOpen);
    }

    const handleCurrentTafsir = (id:number)=>{
        setCurrentTafsir(id);
    }
    useEffect(() => {
        if (tafsirOpen) {
            fetchTafsir(currentTafsir, surahNumber, ayah.numberInSurah);
        } else {
            setTafsirText("");
        }
    }, [tafsirOpen, currentTafsir, surahNumber, ayah.numberInSurah]);


    const tafsirList = [
        {
        "id": 1,
        "name": "الميسر",
        },
        {
        "id": 2,
        "name": "الجلالين",
        },
        {
        "id": 3,
        "name": "السعدي",
        },
        {
        "id": 4,
        "name": "ابن كثير",
        },
        {
        "id": 5,
        "name": "الوسيط لطنطاوي",
        },
        {
        "id": 6,
        "name": "البغوي",
        },
        {
        "id": 7,
        "name": "القرطبي",
        },
        {
        "id": 8,
        "name": "الطبري",
        }
    ]

    return (
        <div className={`flex flex-col items-center justify-center  gap-4 py-10 px-8 rounded-lg bg-white shadow-md hover:shadow-none transition-all duration-500`}>
           <div className="flex justify-between gap-4 items-center w-full">
            <span className="flex justify-center items-center text-lg font-bold text-white h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800">
                {ayah.numberInSurah}
            </span>
            <div className="flex items-center w-fit gap-4">
                <p className="font-semibold text-right text-purple-900 w-fit" dir="rtl" style={{fontSize:fSize}}>{ayah.text}</p>
                <span onClick={handleAudio} className={`flex justify-center items-center h-12 w-12 rounded-lg ${audioOn?"bg-blue-50":"bg-white"} border-2 border-blue-200 cursor-pointer transition-all duration-500 hover:bg-blue-50`}>
                    {audioOn?<PauseOutlinedIcon className="text-2xl text-purple-800"/>:<PlayArrowOutlinedIcon className="text-2xl text-purple-800"/>}
                </span>
            </div>
           </div>
                <p className="font-semibold text-blue-700 ms-20" style={{fontSize:fSize}}>{englishText}</p>
           <div className="flex  justify-between items-center gap-4 w-full">
                <span className="font-medium  text-lg bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-500 text-white py-0.5 px-8 rounded-full" dir="rtl">page: {ayah.page} - juz: {ayah.juz}</span>
                <span onClick={handleTafsir} className={`flex justify-center items-center h-12 w-12 rounded-lg ${tafsirOpen?"bg-blue-50":"bg-white"} border-2 border-blue-200 cursor-pointer transition-all duration-500 hover:bg-blue-50`}>
                    <MenuBookOutlinedIcon className="text-2xl text-purple-800"/>
            </span>
            </div>
            <div className={`w-full  transition-all duration-500 ${tafsirOpen?"block":"hidden"}`} dir="rtl" >
            <div className="w-full flex flex-col items-start gap-4 px-4 py-3 bg-purple-100 rounded-lg border-r-4 border-purple-600">
                <div className="flex items-center gap-3 flex-wrap">
                    <MenuBookOutlinedIcon className="text-2xl text-purple-600" sx={{fontSize:fSize}}/>
                    <p className="font-semibold text-purple-600" style={{fontSize:fSize}}>تفسير</p>
                    {tafsirList.map((tafsir)=>
                    <div key={tafsir.id} onClick={()=>{handleCurrentTafsir(tafsir.id)}} className={`py-1 px-6 ${currentTafsir === tafsir.id?"bg-purple-300":"bg-blue-300"} cursor-pointer rounded-full`}>
                        <p className="text-lg text-purple-700">{tafsir.name}</p>
                        </div>)}
                </div>
                <p className="font-semibold text-purple-600 text-right" style={{fontSize:fSize}}>{tafsirText || "Loading tafsir..."}</p> 
            </div>
            </div>
        </div>
    )
}

export default Ayah;