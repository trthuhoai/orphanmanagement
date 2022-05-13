import { MetaTags } from "react-meta-tags";
// import FeedbackList from "../../components/feedback/FeedbackList";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
// import FeedbackContextProvider from "../../contexts/FeedbackContext";
import "./_feedback.scss";

const Feedback = () => {
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
