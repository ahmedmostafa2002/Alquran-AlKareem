import AyahProp from "../utils/interfaces/ayah.interface";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState, useEffect, useRef } from "react"; // Import useEffect
import axios from "axios";

function Ayah(ayah:AyahProp){
    const fSize = useSelector((state:RootState)=>state.Font.fontSize);
    const surahNumber = useSelector((state:RootState)=>state.CurrentSurah.number);
    const [tafsirText , setTafsirText] = useState("");
    const [currentTafsir , setCurrentTafsir] = useState(1);
    const [audioOn,toggleAudio] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const theme = useSelector((state:RootState)=>state.Theme.theme);
    const dark = theme === "dark";
    

    const handleAudio = (audioLink:string)=>{
        if(!audioRef.current){
            // audioRef.current = new Audio(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number.inQuran}.mp3`);
            audioRef.current = new Audio(audioLink);
            audioRef.current.onended = ()=>{
                toggleAudio(false);
            }
        };

        if(audioOn){
            audioRef.current.pause();
            toggleAudio(false);
        }else{
            audioRef.current.play().catch(error=>{
                console.log("Error playing audio: ",error)
            });
            toggleAudio(true);
        }
       
    }

    const [tafsirOpen,toggleTafsir] = useState(false);

    const fetchTafsir = async (tafseerId: number, surahNum: number, ayahNum: number) => {
        try {
            const response = await axios.get(`https://quran-api-swart-three.vercel.app/tafseer/${tafseerId}/${surahNum}/${ayahNum}`);
            setTafsirText(response.data.text);
        } catch (error) {
            console.error("Error fetching tafsir:", error);
            setTafsirText("عذراً، لا يمكن تحميل التفسير حالياً. يرجى المحاولة مرة أخرى لاحقاً.");
        }
    };

    const handleTafsir = ()=>{
        toggleTafsir(!tafsirOpen);
    }

    const handleCurrentTafsir = (id:number)=>{
        setCurrentTafsir(id);
    }
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 500);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        if (tafsirOpen) {
            fetchTafsir(currentTafsir, surahNumber, ayah.number.inSurah);
        } else {
            setTafsirText("");
        }
    }, [tafsirOpen, currentTafsir, surahNumber, ayah.number.inSurah]);

    useEffect(()=>{
        return ()=>{
            if(audioRef.current){
                audioRef.current.pause();
                toggleAudio(false);
                audioRef.current = null;
            }
        }
    },[ayah.number]);


    const tafsirList = [
        { "id": 1, "name": "الميسر" },
        { "id": 2, "name": "الجلالين" },
        { "id": 3, "name": "السعدي" },
        { "id": 4, "name": "ابن كثير" },
        { "id": 5, "name": "الوسيط لطنطاوي" },
        { "id": 6, "name": "البغوي" },
        { "id": 7, "name": "القرطبي" },
        { "id": 8, "name": "الطبري" }
    ];

    return (
        <div className={`relative flex flex-col items-center justify-center  gap-4 py-10 px-8 rounded-lg ${dark?"bg-gray-700/70":"bg-white"} shadow-md hover:shadow-none transition-all duration-500`}>
           <div className={`flex ${isSmallScreen?"flex-col":"flex-row"} justify-between gap-4 items-center w-full`}>
            <span className="flex justify-center items-center text-lg font-bold text-white h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800">
                {ayah.number.inSurah}
            </span>
            <div className="flex items-center w-fit gap-4">
                <p className={`font-semibold text-right ${dark?"text-purple-100":"text-purple-900"} w-fit`} dir="rtl" style={{fontSize:fSize}}>{ayah.text.arab}</p>
                <span onClick={()=>handleAudio(ayah.audio.primary)} className={`flex justify-center items-center h-12 w-12 rounded-lg ${audioOn?"bg-blue-50":"bg-white"} border-2 border-blue-200 cursor-pointer transition-all duration-500 hover:bg-blue-50`}>
                    {audioOn?<PauseOutlinedIcon className="text-2xl text-purple-800"/>:<PlayArrowOutlinedIcon className="text-2xl text-purple-800"/>}
                </span>
            </div>
           </div>
                <p className={`font-semibold ${dark?"text-blue-200":"text-blue-700"} `} style={{fontSize:fSize}}>{ayah.translation.en}</p>
           <div className="flex  justify-between items-center gap-4 w-full">
                <span className="font-medium  text-lg bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-500 text-white py-0.5 px-8 rounded-full" dir="rtl">page: {ayah.meta.page} - juz: {ayah.meta.juz}</span>
                <span onClick={handleTafsir} className={`flex justify-center items-center h-12 w-12 rounded-lg ${tafsirOpen?"bg-blue-50":"bg-white"} border-2 border-blue-200 cursor-pointer transition-all duration-500 hover:bg-blue-50`}>
                    <MenuBookOutlinedIcon className="text-2xl text-purple-800"/>
            </span>
            </div>
            <div className={`w-full  transition-all duration-500 ${tafsirOpen?"block":"hidden"}`} dir="rtl" >
            <div className={`w-full flex flex-col items-start gap-4 px-4 py-3 ${dark?"bg-blue-950":"bg-purple-100"} rounded-lg border-r-4 border-purple-600 transition-all duration-500`}>
                <div className="flex items-center gap-3 flex-wrap">
                    <MenuBookOutlinedIcon className={`text-2xl ${dark?"text-purple-200":"text-purple-600"}`} sx={{fontSize:fSize}}/>
                    <p className={`font-semibold ${dark?"text-purple-200":"text-purple-600"}`} style={{fontSize:fSize}}>تفسير</p>
                    {tafsirList.map((tafsir)=>
                    <div key={tafsir.id} onClick={()=>{handleCurrentTafsir(tafsir.id)}} className={`py-1 px-6 ${currentTafsir === tafsir.id?"bg-purple-300":"bg-blue-300"} cursor-pointer rounded-full`}>
                        <p className={`text-lg ${dark?"text-blue-950":"text-purple-700"}`}>{tafsir.name}</p>
                        </div>)}
                </div>
                <p className={`font-semibold ${dark?"text-indigo-200":"text-purple-600"} text-right`} style={{fontSize:fSize}}>{tafsirText || "Loading tafsir..."}</p> 
            </div>
            </div>
        </div>
    )
}

export default Ayah;