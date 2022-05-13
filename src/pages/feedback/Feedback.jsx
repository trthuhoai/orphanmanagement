import { MetaTags } from "react-meta-tags";
// import FeedbackList from "../../components/feedback/FeedbackList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
// import FeedbackContextProvider from "../../contexts/FeedbackContext";
import "./_feedback.scss";
import { Navigate } from "react-router-dom";

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
                <Header />
                <div className="main">
                    <h1 style={{ color: "black" }}>Chua co du lieu phan hoi</h1>
                    {/* <FeedbackContextProvider>
                        <FeedbackList />
                    </FeedbackContextProvider> */}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
