import { MetaTags } from "react-meta-tags";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import StorageList from "../../components/storage/StorageList";
import StorageContextProvider from "../../contexts/StorageContext";
import "./list.scss";

const ListStorage = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Lưu trữ</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <StorageContextProvider>
                        <StorageList />
                    </StorageContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListStorage;
