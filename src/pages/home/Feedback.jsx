import FeedbackCreate from "../../components/feedback/FeedbackCreate";
import FeedbackContextProvider from "../../contexts/FeedbackContext";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./_feedback.scss";

const Feedback = () => {
    return (
        <div className="send-feedback">
            <Header />
            <FeedbackContextProvider>
                <FeedbackCreate />
            </FeedbackContextProvider>
            <Footer />
        </div>
    );
};
export default Feedback;
