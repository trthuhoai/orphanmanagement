import { Navigate } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
import PicnicList from "../../components/picnic/PicnicList";
import Header from "../../components/header/Header";
import SidebarLogistic from "../../components/sidebar/Sidebar_Logistic";
import PicnicContextProvider from "../../contexts/PicnicContext";
import "./list.scss";

const ListPicnic = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Dã ngoại</title>
            </MetaTags>
            <SidebarLogistic />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <PicnicContextProvider>
                        <PicnicList />
                    </PicnicContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListPicnic;
