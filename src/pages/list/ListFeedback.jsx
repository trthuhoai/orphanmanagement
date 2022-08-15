import { MetaTags } from "react-meta-tags";
import { Navigate } from "react-router-dom";
import FeedbackList from "../../components/feedback/FeedbackList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import FeedbackContextProvider from "../../contexts/FeedbackContext";
import NotificationContextProvider from "../../contexts/NotificationContext";

const Feedback = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
        return <Navigate to="/" />;
    }

    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Phản hồi</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <NotificationContextProvider>
                    <Header />
                </NotificationContextProvider>
                <div className="main">
                    <FeedbackContextProvider>
                        <FeedbackList />
                    </FeedbackContextProvider>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
