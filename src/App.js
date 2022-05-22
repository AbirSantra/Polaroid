import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";
// import UserPanel from "./containers/UserPanel/UserPanel";
import HomePage from "./Pages/HomePage";
// import AddPost from "./Pages/AddPost";
import Saved from "./Pages/Saved";
import Account from "./Pages/Account";
import MobileMenu from "./containers/MobileMenu/MobileMenu";
import Auth from "./containers/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
    return (
        <Router>
            <div>
                {/* Navbar */}
                <Navbar></Navbar>
                {/* Mobile-Menu */}
                <MobileMenu></MobileMenu>
                {/* Page Content */}
                <div className="page-body">
                    {/* <div className="userPanel">{<UserPanel></UserPanel>}</div> */}
                    <div className="pages containers">
                        <Routes>
                            <Route
                                path="/posts"
                                element={<HomePage></HomePage>}
                            ></Route>
                            <Route path="/auth" element={<Auth />}></Route>
                            <Route
                                path="/"
                                element={<Navigate to="/auth"></Navigate>}
                            ></Route>
                            <Route
                                path="/posts/:id"
                                element={<PostDetails></PostDetails>}
                            ></Route>
                            <Route
                                path="/saved"
                                element={<Saved></Saved>}
                            ></Route>
                            <Route
                                path="/account"
                                element={<Account></Account>}
                            ></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
