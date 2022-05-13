import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feedback from "./pages/feedback/Feedback";
import ListAccount from "./pages/list/ListAccount";
import ListCharity from "./pages/list/ListCharity";
import ListChildren from "./pages/list/ListChildren";
import ListEmployee from "./pages/list/ListEmployee";
import ListIntroducer from "./pages/list/ListIntroducer";
import ListNurturer from "./pages/list/ListNurturer";
import ListPicnic from "./pages/list/ListPicnic";
import ListStorage from "./pages/list/ListStorage";
import Login from "./pages/login/Login";
import Statistic from "./pages/statistic/Statistic";
import "./scss/App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<ListAccount />} />
                    <Route path="/children" element={<ListChildren />} />
                    <Route path="/introducer" element={<ListIntroducer />} />
                    <Route path="/nurturer" element={<ListNurturer />} />
                    <Route path="/storage" element={<ListStorage />} />
                    <Route path="/employee" element={<ListEmployee />} />
                    <Route path="/statistic" element={<Statistic />} />
                    <Route path="/charity" element={<ListCharity />} />
                    <Route path="/picnic" element={<ListPicnic />} />
                    <Route path="/feedback" element={<Feedback />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
