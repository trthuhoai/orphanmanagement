import { MetaTags } from "react-meta-tags";
import Header from "../../components/header/Header";
import NurturerList from "../../components/nurturer/NurturerList";
import Sidebar from "../../components/sidebar/Sidebar";
import NurturerContextProvider from "../../contexts/NurturerContext";
import "./list.scss";

const ListNurturer = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Nhận nuôi trẻ</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <NurturerContextProvider>
                        <NurturerList />
                    </NurturerContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListNurturer;
