import { MetaTags } from "react-meta-tags";
import Header from "../../components/header/Header";
import IntroducerList from "../../components/introducer/IntroducerList";
import Sidebar from "../../components/sidebar/Sidebar";
import IntroducerContextProvider from "../../contexts/IntroducerContext";
import "./list.scss";

const ListIntroducer = () => {
    return (
        <div className="list">
            <MetaTags>
                <title>CYF Center | Giới thiệu trẻ</title>
            </MetaTags>
            <Sidebar />
            <div className="listContainer">
                <Header />
                <div className="main">
                    <IntroducerContextProvider>
                        <IntroducerList/>
                    </IntroducerContextProvider>
                </div>
            </div>
        </div>
    );
};

export default ListIntroducer;
