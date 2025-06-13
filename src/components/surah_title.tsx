import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function SurahTitle({name,arabicName}:{name:string,arabicName:string}){
    const theme = useSelector((state:RootState)=>state.Theme.theme);
    const dark = theme === "dark";
    return (
        <div className={`flex flex-col items-center justify-center  gap-4 py-10 rounded-lg shadow-sm  ${dark?"shadow-purple-900":"shadow-gray-100"} ${dark?"bg-gray-700/70":"bg-gradient-to-l from-purple-50 via-white to-white"} transition-all duration-500`}>
            <h1 className={`text-3xl font-bold ${dark?"text-purple-100":"text-blue-900"}`}>{name}</h1>
            <h2 className={`text-xl font-bold ${dark?"text-blue-300":"text-blue-500"}`}>{arabicName}</h2>
        </div>
    )
}

export default SurahTitle;