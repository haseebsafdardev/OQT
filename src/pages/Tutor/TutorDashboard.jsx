import React, { useState } from "react";
import "../../style/Student/StudentDashboard.css";
import Schedule from "./../Tutor/Dashboard/Schedule.jsx";
import Home from "./../Tutor/Dashboard/Home.jsx";
import Requests from "./Dashboard/Requests.jsx";
import Classes from "./Dashboard/Classes.jsx";
import { useAuth } from "../../context/Auth";
import { Image_URL } from "../../config";
export default function TutorDashboard() {
    const { user, logout } = useAuth()
    const [activePage, setActivePage] = useState("Home");

    const renderPage = () => {
        switch (activePage) {
            case "Home":
                return <Home />;
            case "Schedule":
                return <Schedule />;
            case "Requests":
                return <Requests />;
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
                <button onClick={() => setActivePage("Requests")}>Requests</button>
                <button onClick={() => setActivePage("Classes")}>Classes</button>
                <button onClick={Logout}>Logout</button>
            </div>

            <div className="frame">
                {renderPage()}
            </div>

        </div>
    );
}
