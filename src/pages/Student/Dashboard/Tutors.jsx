/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './../../../style/Student/Tutors.css';
import { ipconfig, Image_URL } from "../../../config";
import { useAuth } from "../../../context/Auth";


export default function Tutors() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false);
    const [hireCheck, setHireCheck] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [surahlist, setSurahlist] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [tutorID, setTutorID] = useState(null);

    useEffect(() => {
        fetchData();
        fetchSurah();
    }, [user?.userID]);

    const fetchSurah = async () => {
        try {
            const response = await fetch(`${ipconfig}Qurans/GetSurah`);
            const data = await response.json();
            setSurahlist(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${ipconfig}Students/getAvailableTutorByStudentID?studentID=${user?.userID}`
            );

            const data = await response.json();
            setDataList(data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const HireButton = (item) => {
        setTutorID(item.userID);
        setHireCheck(true);
    };

    const SentRequest = async () => {

        if (!selectedSurah) return;

        try {

            const payload = {
                tutorId: tutorID,
                surahID: selectedSurah.Id,
                studentId: user?.userID,
                email: user.email
            };

            const response = await fetch(`${ipconfig}Requests/requestToTutor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!result?.success) {
                alert("Request already sent to this tutor");
                return;
            }

            alert("Request sent successfully");
            setHireCheck(false);

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className="tutorPage">

            {loading && (
                <div className="loadingOverlay">
                    Loading Tutors...
                </div>
            )}

            <div className="listContainer">

                {dataList.length === 0 && !loading && (
                    <p className="emptyText">No tutors available</p>
                )}

                {dataList.map((item) => (

                    <div key={item.userID} className="card">

                        <div className="topRow">

                            <div className="leftSection">

                                <img
                                    className="avatar"
                                    src={`${Image_URL}${item.profile}`}
                                    alt="tutor"
                                />

                                <div className="infoSection">
                                    <h3 className="name">{item.name}</h3>
                                    <p className="location">
                                        {item.city}, {item.country}
                                    </p>
                                </div>

                            </div>

                            <button
                                className="hireBtn"
                                onClick={() => HireButton(item)}
                            >
                                Hire
                            </button>

                        </div>

                        {item?.subjects?.length > 0 && (

                            <div className="subjectContainer">

                                {item.subjects.map((sub) => (

                                    <div
                                        key={sub.subjectID}
                                        className="subjectChip"
                                    >
                                        {sub.subjectName}
                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                ))}

            </div>


            {/* SURAH MODAL */}

            {hireCheck && (
                <div className="modalOverlay">

                    <div className="surahModal">

                        {/* HEADER */}
                        <div className="modalHeader">

                            <div>
                                <h2>Select Surah</h2>
                                <p className="subtitle">Choose the lesson you want to start</p>
                            </div>

                            <button
                                className="closeBtn"
                                onClick={() => setHireCheck(false)}
                            >
                                ✕
                            </button>

                        </div>


                        {/* SURAH LIST */}
                        <div className="surahList">

                            {surahlist.map((item) => {

                                const isSelected = selectedSurah?.Id === item.Id;

                                return (
                                    <div
                                        key={item.Id}
                                        className={`surahCard ${isSelected ? "activeSurah" : ""}`}
                                        onClick={() => setSelectedSurah(item)}
                                    >

                                        <div className="surahLeft">
                                            <div className="surahNumber">{item.Id}</div>

                                            <div>
                                                <p className="surahName">{item.surah_names}</p>
                                                <span className="surahTranslation">
                                                    {item.surah_Urdu_Names}
                                                </span>
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <span className="checkIcon">✔</span>
                                        )}

                                    </div>
                                );
                            })}

                        </div>

                        {/* FOOTER */}
                        <div className="modalFooter">

                            <button
                                disabled={!selectedSurah}
                                className="sendBtn"
                                onClick={SentRequest}
                            >
                                Send Request
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}