import SettingHeader from "../components/setting_header"
import SideBar from "../components/sideBar"
import Surah from "../components/surah"

const SurahsPage = ()=>{
    return  (
        <div className="flex w-full pt-16 lg:pt-28">
        <SideBar/>
        <div className="flex flex-col w-full">
        <SettingHeader/>
        <div className='mt-50 md:mt-20 lg:mt-4 xl:mt-0'>
        <Surah/>
        </div>
        </div>
    </div>
    )
}

export default SurahsPage;