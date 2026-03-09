/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./../../../style/Tutor/Requests.css";
import { ipconfig, Image_URL } from "../../../config";
import { useAuth } from "../../../context/Auth";

export default function Requests() {

    const { user } = useAuth();

    const [requestsList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [scheduleVisible, setScheduleVisible] = useState(false);

    useEffect(() => {
        if (user?.userID) fetchRequests();
    }, [user?.userID]);

    const fetchRequests = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${ipconfig}Tutor/getRequests?tutorID=${user?.userID}`
            );

            const result = await response.json();

            if (result.success) {
                setRequestList(result.data);
            } else {
                alert("Something went wrong");
            }

        } catch (error) {
            console.log(error);
            alert("Network error");
        } finally {
            setLoading(false);
        }
    };

    const onAccept = async (item) => {

        try {

            setLoading(true);

            const payload = {
                studentID: item.StudentID,
                tutorID: user.userID,
                requestID: item.RequestID,
                subjectID: item.SubjectID,
                surahID: item.SurahID
            };

            const response = await fetch(
                `${ipconfig}Classes/CreateClassesWeeklySimple`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            );

            const result = await response.json();

            if (result?.success) {
                alert("Classes created successfully");
            }

        } catch (error) {
            console.log(error);
        } finally {
            fetchRequests();
            setLoading(false);
        }
    };

    const onReject = async (requestID) => {

        try {

            setLoading(true);

            const response = await fetch(
                `${ipconfig}Classes/rejectRequest?requestID=${requestID}`,
                { method: "POST" }
            );

            const result = await response.json();

            if (result?.success) {
                alert("Request rejected successfully");
            }

        } catch (error) {
            console.log(error);
        } finally {
            fetchRequests();
            setLoading(false);
        }
    };

    return (

        <div className="requestsPage">

            {loading && (
                <div className="loadingOverlay">
                    Loading...
                </div>
            )}

            <div className="requestsContainer">

                {requestsList.length === 0 && !loading && (
                    <p className="emptyText">No Requests Found</p>
                )}

                {requestsList.map((item) => (

                    <div key={item.RequestID} className="requestCard">

                        <div className="topRow">

                            <img
                                src={`${Image_URL}${item.profileImage}`}
                                className="avatar"
                                alt="student"
                            />

                            <div className="info">
                                <h3>{item.StudentName}</h3>
                                <p>{item.StudentEmail}</p>
                            </div>

                            <button
                                className="rejectBtn"
                                onClick={() => onReject(item.RequestID)}
                            >
                                Reject
                            </button>

                            <button
                                className="acceptBtn"
                                onClick={() => onAccept(item)}
                            >
                                Accept
                            </button>

                        </div>

                        <div className="divider" />

                        <div className="infoRow">
                            <span>Subject</span>
                            <b>{item.SubjectName}</b>
                        </div>

                        <div className="infoRow">
                            <span>Surah</span>
                            <b>{item.SurahName}</b>
                        </div>

                        <button
                            className="scheduleBtn"
                            onClick={() => {
                                setSelectedSchedule(item);
                                setScheduleVisible(true);
                            }}
                        >
                            View Schedule
                        </button>

                    </div>

                ))}

            </div>


            {/* Schedule Modal */}

            {scheduleVisible && (

                <div className="modalOverlay">

                    <div className="scheduleModal">

                        <div className="modalHeader">

                            <img
                                src={`${Image_URL}${selectedSchedule?.profileImage}`}
                                className="modalAvatar"
                                alt=""
                            />

                            <h3>
                                {selectedSchedule?.StudentName}'s Timetable
                            </h3>

                        </div>

                        <div className="scheduleList">

                            {selectedSchedule?.Schedule?.map((day, index) => (

                                <div key={index} className="dayBox">

                                    <h4>{day.DayName}</h4>

                                    {day.Slots.map((slot, i) => (

                                        <div key={i} className="timeBadge">

                                            {slot.startTime.split(":")[0]} -
                                            {slot.endTime.split(":")[0]}

                                        </div>

                                    ))}

                                </div>

                            ))}

                        </div>

                        <button
                            className="closeBtn"
                            onClick={() => setScheduleVisible(false)}
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}