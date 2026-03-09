/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../../style/Student/Classes.css";
import { ipconfig, Image_URL } from "../../../config";
import { useAuth } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";

export default function Classes() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [classesList, setClassesList] = useState([]);

    useEffect(() => {
        if (user?.userID) {
            fetchClasses();
        }
    }, [user?.userID]);

    // Fetch Classes
    const fetchClasses = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${ipconfig}Classes/getClassesByStudent?studentID=${user?.userID}`
            );

            if (response.ok) {

                const result = await response.json();
                setClassesList(result?.data || []);

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const getDate = (date) => {
        if (!date) return "-";
        return date.split("T")[0];
    };

    const classJoin = (classID) => {
        navigate(`/class/${classID}`);
    };

    return (

        <div className="classesPage">

            {loading && (
                <div className="loadingOverlay">
                    <div className="loaderBox">Loading...</div>
                </div>
            )}

            <div className="classesContainer">

                {classesList.length === 0 && !loading && (
                    <p className="emptyText">No Classes Available</p>
                )}

                {classesList.map((item) => (

                    <div key={item.ClassID} className="classCard">

                        <img
                            src={`${Image_URL}${item?.tutorProfileImage}`}
                            alt="tutor"
                            className="avatar"
                        />

                        <div className="infoContainer">

                            <h3 className="tutorName">
                                {item?.tutorName || ""}
                            </h3>

                            <p className="meta">
                                {item?.subjectName || "-"} • {item?.dayName || "-"} • {item?.lessonName || "-"}
                            </p>

                            <p className="date">
                                {getDate(item?.ClassDate)}
                            </p>

                            <p className="meta">
                                {item?.startTime?.split(":")[0] || "-"} • {item?.endTime?.split(":")[0] || "-"}
                            </p>

                        </div>

                        <button
                            className="joinBtn"
                            onClick={() => classJoin(item?.ClassID)}
                        >
                            Join
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}