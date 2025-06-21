import { Outlet} from "react-router-dom";
import MyDrawer from "../components/drawer";
import Header from "../components/header";

function Index () {
  
    return(
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-indigo-100 w-full">
            <Header/>
            <MyDrawer/>
            <Outlet/>
        </div>
    )
}

export default Index;