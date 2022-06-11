import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import IntroducerList from "../../components/introducer/IntroducerList";
import Sidebar from "../../components/sidebar/Sidebar";
import IntroducerContextProvider from "../../contexts/IntroducerContext";
import NotificationContextProvider from "../../contexts/NotificationContext";
import "./list.scss";

const ListIntroducer = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Giới thiệu trẻ</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
                <div className="main">
                    <IntroducerContextProvider>
                        <IntroducerList />
                    </IntroducerContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListIntroducer;
