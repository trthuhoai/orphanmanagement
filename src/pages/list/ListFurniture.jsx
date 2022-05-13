import { MetaTags } from "react-meta-tags";
import { Navigate } from 'react-router-dom';
import FurnitureList from "../../components/furniture/FurnitureList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FurnitureContextProvider from "../../contexts/FurnitureContext";
import "./list.scss";

const List = () => {
    var token=localStorage.getItem("token");
    if(token===null){
        return <Navigate to="/"/>
    }
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Quản lý trang thiết bị</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <FurnitureContextProvider>
                        <FurnitureList />
                    </FurnitureContextProvider>
                </div>
            </div>
        </div>
    );
};

export default List;
