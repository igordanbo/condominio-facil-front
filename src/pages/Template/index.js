import { Outlet } from "react-router-dom"
import Menu from "../../components/Menu"


export default function Template() {

    return (
     <> 
        <Menu />
        <Outlet />
    </>
       
    )

}