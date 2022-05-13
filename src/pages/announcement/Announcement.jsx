import { MetaTags } from "react-meta-tags";
// import AnnouncementList from "../../components/announcement/AnnouncementList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
// import AnnouncementContextProvider from "../../contexts/AnnouncementContext";
import "./_announcement.scss";
import { Navigate } from "react-router-dom";

const Announcement = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Thông báo</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <h1 style={{ color: "black" }}>
                        Chua co du lieu thong bao
                    </h1>
                    {/* <AnnouncementContextProvider>
                        <AnnouncementList />
                    </AnnouncementContextProvider> */}
                </div>
            </div>
        </div>
    );
};

export default Announcement;
