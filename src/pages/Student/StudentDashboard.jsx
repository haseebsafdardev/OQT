import React, { useState } from "react";

import { Image_URL } from "../../config";
import { useAuth } from "../../context/Auth";
import Schedule from "./Dashboard/Schedule";
import Home from "./Dashboard/Home";
import Tutors from "./Dashboard/Tutors";
import Classes from '../../pages/Student/Dashboard/Classes.jsx'
import "../../style/Student/StudentDashboard.css";
export default function StudentDashboard() {
    const { user, logout } = useAuth()
    const [activePage, setActivePage] = useState("Home");

    const renderPage = () => {
        switch (activePage) {
            case "Home":
                return <Home />;
            case "Schedule":
                return <Schedule />;
            case "Tutors":
                return <Tutors />;
            case "Classes":
                return <Classes />;
            default:
                return <Home />;
        }
    };
    let Logout = async () => {
        await logout();
        window.location.href = '/login'
    }
    return (
        <div className="container">

            <div className="sidebar">

                <div className="profileSection">
                    <img
                        src={Image_URL + user?.profile}
                        alt="profile"
                        className="profileImage"
                    />

                    <h3>{user?.name}</h3>
                    <p>{user?.city}, {user?.country}</p>
                </div>
                <button onClick={() => setActivePage("Home")}>Home</button>
                <button onClick={() => setActivePage("Schedule")}>Schedule</button>
                <button onClick={() => setActivePage("Tutors")}>Tutors</button>
                <button onClick={() => setActivePage("Classes")}>Classes</button>
                <button onClick={Logout}>Logout</button>
            </div>

            <div className="frame">
                {renderPage()}
            </div>

        </div>
    );
}
