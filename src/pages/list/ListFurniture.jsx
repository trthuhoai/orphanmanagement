import { MetaTags } from "react-meta-tags";
import { Navigate } from 'react-router-dom';
import AccountList from "../../components/account/AccountList";
import FurnitureList from "../../components/furniture/FurnitureList";
import ChildrenList from "../../components/children/ChildrenList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import AccountContextProvider from "../../contexts/AccountContext";
import FurnitureContextProvider from "../../contexts/FurnitureContext";
import ChildrenContextProvider from "../../contexts/ChildrenContext";
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
                    {/* <ChildrenContextProvider>
                        <ChildrenList/>
                    </ChildrenContextProvider> */}
                </div>
            </div>
        </div>
    );
};

export default List;
