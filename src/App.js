import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListAccount from "./pages/list/ListAccount";
import ListChildren from "./pages/list/ListChildren";
import Login from "./pages/login/Login";
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
                    {/* <Route path="/manager/children" element={<List/>}/> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
