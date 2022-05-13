import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployee from "./pages/list/ListEmployee";
import ListAccount from "./pages/list/ListAccount";
import Home from "./pages/home/Home";
import News from "./pages/news/News";
import Charity from "./pages/charity/Charity";
import ListFurniture from "./pages/list/ListFurniture";
import ListFurnitureRequest from "./pages/list/ListFurnitureRequest";
import ListChildren from "./pages/list/ListChildren";
import ListIntroducer from "./pages/list/ListIntroducer";
import ListNurturer from "./pages/list/ListNurturer";
import ListStorage from "./pages/list/ListStorage";
import Statistic from "./pages/statistic/Statistic"
import Login from "./pages/login/Login";
import "./scss/App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/make-charity" element={<Charity />} />
                    <Route path="/account" element={<ListAccount />} />
                    <Route path="/children" element={<ListChildren />} />
                    <Route path="/introducer" element={<ListIntroducer />} />
                    <Route path="/nurturer" element={<ListNurturer />} />
                    <Route path="/storage" element={<ListStorage />} />
                    <Route path="/furniture" element={<ListFurniture/>}/>    
                    <Route path="/furniture/request" element={<ListFurnitureRequest/>}/> 
                    <Route path="/employee" element={<ListEmployee />} />
                    <Route path="/statistic" element={<Statistic />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

