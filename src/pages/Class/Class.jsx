/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { ipconfig } from "../../config";
import "../../style/Class/Class.css";
import { useParams } from "react-router-dom";


export default function Class() {
    const { classID } = useParams()
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchLesson();
    }, []);

    const fetchLesson = async () => {
        try {
            const response = await fetch(
                `${ipconfig}Classes/getLessons?ClassID=${classID}`
            );
            const result = await response.json();

            if (result?.success) {
                setData(result?.data);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const lesson = data[0];

    return (
        <div className="container12">
            {lesson && (
                <>
                    {/* Header */}
                    <div className="header">
                        <h2 className="surahName">{lesson.surahName}</h2>
                        <h4 className="lessonTitle">{lesson.lessonName}</h4>
                    </div>

                    {/* Ayat List */}
                    <div className="ayatList">
                        {lesson.ayats.map((item, index) => (
                            <div className="ayatCard" key={item.ayatId}>
                                <p className="ayatText">{item.ayat}</p>
                                <div className="ayatNumberCircle">
                                    <span className="ayatNumber">{index + 1}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}