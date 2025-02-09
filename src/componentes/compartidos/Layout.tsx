import { Outlet } from 'react-router-dom';
import Encabezamiento from './Encabezamiento';
import Pie from './Pie';
import Principal from './Principal';


function Layout() {
    return (
        <>   
            <Encabezamiento></Encabezamiento>
            <Principal >
                <Outlet></Outlet>
            </Principal>
            <Pie></Pie>
           
        </>
    );
}

export default Layout;