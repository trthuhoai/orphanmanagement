import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListFurnitureRequestCreate from "./components/furnitureRequest/ListFurnitureRequest_Create";
import ListFurnitureRequestDetail from "./components/furnitureRequest/ListFurnitureRequest_Detail";
import ListFurnitureRequestEmployeeDetail from "./components/furnitureRequest/ListFurnitureRequestDetail_Employee";
import ListFurnitureRequestEmployeeUpdate from "./components/furnitureRequest/ListFurnitureRequestUpdate_Employee";
import ListFurnitureRequestEmployeeExtend from "./components/furnitureRequest/ListFurnitureRequestExtend_Employee";
import ListFurnitureRequestUpdate from "./components/furnitureRequest/ListFurnitureRequest_Update";
import Charity from "./pages/charity/Charity";
import Feedback from "./pages/home/Feedback";
import Home from "./pages/home/Home";
import ListAccount from "./pages/list/ListAccount"; 
import ListCharity from "./pages/list/ListCharity";
import ListChildren from "./pages/list/ListChildren";
import ListEmployee from "./pages/list/ListEmployee";
import ListFeedback from "./pages/list/ListFeedback";
import ListFurniture from "./pages/list/ListFurniture";
import ListFurnitureRequest from "./pages/list/ListFurnitureRequest";
// import ListFurnitureRequestLogistic from "./pages/list/ListFurnitureRequest_Logistic";
import ListFurnitureRequestEmployee from "./pages/list/ListFurnitureRequest_Employee";

// import ListFurnitureRequestDetail from "./components/furnitureRequest/ListFurnitureRequest_Detail";
// import ListFurnitureRequestCreate from "./components/furnitureRequest/ListFurnitureRequest_Create";
// import ListFurnitureRequestUpdate from "./components/furnitureRequest/ListFurnitureRequest_Update";
import ListIntroducer from "./pages/list/ListIntroducer"; 
// import ListIntroducer from "./pages/list/ListIntroducer";
import ListNurturer from "./pages/list/ListNurturer";
import ListPicnic from "./pages/list/ListPicnic"; 
import ListStorage from "./pages/list/ListStorage";
import ChangePassword from "./pages/login/ChangePassword";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";
import News from "./pages/list/ListNews"; 
import Notification from "./pages/notification/Notification";
import NotificationDetailPage from "./pages/notification/NotificationDetailPage";
import ProfileInfo from "./pages/profile/ProfileInfo";
import ProfilePassword from "./pages/profile/ProfilePassword";
import Statistic from "./pages/statistic/Statistic";
import "./scss/App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/resetpassword" element={<ResetPassword />} />
                    <Route
                        path="/changepassword"
                        element={<ChangePassword />}
                    />
                    <Route path="/profileinfo" element={<ProfileInfo />} />
                    <Route
                        path="/profilepassword"
                        element={<ProfilePassword />}
                    />
                    <Route path="/make-charity" element={<Charity />} />
                    <Route path="/sendfeedback" element={<Feedback />} />
                    <Route path="/account" element={<ListAccount />} />
                    <Route path="/children" element={<ListChildren />} />
                    <Route path="/introducer" element={<ListIntroducer />} />
                    <Route path="/nurturer" element={<ListNurturer />} />
                    <Route path="/storage" element={<ListStorage />} />
                    <Route path="/furniture" element={<ListFurniture />} />
                    <Route
                        path="/furniture/request"
                        element={<ListFurnitureRequest />}
                        exact
                    />
                    <Route
                        path="/furniture/request/create"
                        element={<ListFurnitureRequestCreate />}
                        exact
                    />
                    <Route
                        path="/furniture/request/update/:id"
                        element={<ListFurnitureRequestUpdate />}
                        exact
                    />
                    <Route
                        path="/furniture/request/:id"
                        element={<ListFurnitureRequestDetail />}
                    />
                    <Route path="/employee" element={<ListEmployee />} />
                    <Route path="/statistic" element={<Statistic />} />
                    <Route path="/charity" element={<ListCharity />} />
                    <Route path="/picnic" element={<ListPicnic />} />
                    <Route path="/feedback" element={<ListFeedback/>} />
                    <Route path="/notification" element={<Notification />} />

                    <Route path="/notification/:idNotification" element={<NotificationDetailPage />} />

                    {/* //Manager Logistic */}
                    <Route path="/manager/furniture" element={<ListFurniture/>}/>  
                    {/* <Route path="/manager/request-furniture" element={<ListFurnitureRequestLogistic/>} exact/> */}
                    <Route path="/manager/request-furniture/:id" element={<ListFurnitureRequestDetail/>}/>
                    <Route path="/manager/charity" element={<ListCharity/>}/>    
                    <Route path="/manager/picnic" element={<ListPicnic/>}/>

                         
                    
                    {/* //Employee */}
                    <Route path="/employee/furniture/request" element={<ListFurnitureRequestEmployee/> } exact/>    
                    <Route
                        path="/employee/furniture/request/:id"
                        element={<ListFurnitureRequestEmployeeDetail />}
                        exact
                    />
                    <Route
                        path="/employee/furniture/request/update/:id"
                        element={<ListFurnitureRequestEmployeeUpdate />}
                        exact
                    />
                     <Route
                        path="/employee/furniture/request/extend/:id"
                        element={<ListFurnitureRequestEmployeeExtend />}
                        exact
                    />

                </Routes>
                
            </BrowserRouter>
        </div>
    );
}

export default App;
