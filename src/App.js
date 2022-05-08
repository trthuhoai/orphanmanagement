import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListAccount from "./pages/list/ListAccount";
import Home from "./pages/home/Home";
import ListFurniture from "./pages/list/ListFurniture";
import ListChildren from "./pages/list/ListChildren";
import ListIntroducer from "./pages/list/ListIntroducer";
import ListNurturer from "./pages/list/ListNurturer";
import ListStorage from "./pages/list/ListStorage";
import Login from "./pages/login/Login";
import "./scss/App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<ListAccount />} />
                    <Route path="/children" element={<ListChildren />} />
                    <Route path="/introducer" element={<ListIntroducer />} />
                    <Route path="/nurturer" element={<ListNurturer />} />
                    <Route path="/storage" element={<ListStorage />} />
                    <Route path="/furniture" element={<ListFurniture/>}/>    
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

