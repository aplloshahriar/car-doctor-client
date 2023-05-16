import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Nav from "../pages/Shared/NavBar/Nav";


const Main = () => {
    return (
        <div>
            
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;