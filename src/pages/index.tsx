import MyDrawer from "../components/drawer";
import Header from "../components/header";
import SettingHeader from "../components/setting_header";
import SideBar from "../components/sideBar";
import Surah from "../components/surah";

function Index () {
  
    return(
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-100 w-full">
            <Header/>
            <MyDrawer/>
            <div className="flex w-full pt-16 lg:pt-28">
                <SideBar/>
                <div className="flex flex-col w-full">
                <SettingHeader/>
                <div className='mt-50 md:mt-20 lg:mt-4 xl:mt-0'>
                <Surah/>
                </div>
                </div>
            </div>

        </div>
    )
}

export default Index;