/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../../style/Student/Schedule.css";
import { ipconfig } from '../../../config.jsx'
import { useAuth } from '../../../context/Auth.jsx'

export default function Schedule() {

    const [loading, setLoading] = useState(false);
    const [scheduleList, setScheduleList] = useState([]);
    const [timeList, setTimeList] = useState([]);
    const { user } = useAuth()
    useEffect(() => {
        if (user?.userID) {
            fetchSchedule();
        }
    }, [user?.userID]);

    const fetchSchedule = async () => {
        try {
            setLoading(true);

            const response = await fetch(`${ipconfig}Slots/GetSlotsWithDay?userid=${user.userID}`);

            if (response.ok) {
                const data = await response.json();

                if (data.length > 0) {
                    setTimeList(data[0].Slots);
                    setScheduleList(data);
                }
            }

        } catch (error) {
            console.log("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getDayLabel = (day) => {
        const days = {
            Monday: "Mon",
            Tuesday: "Tue",
            Wednesday: "Wed",
            Thursday: "Thu",
            Friday: "Fri",
            Saturday: "Sat",
            Sunday: "Sun"
        };

        return days[day] || day;
    };

    const onClickSlot = async (item) => {

        let url = item.Status === "available"
            ? "slots/bookedstudentslot"
            : "slots/availablestudentslot";
        const data = {
            UserId: user.userID,
            DayId: item.DayID,
            SlotId: item.SlotID
        };
        console.log(data);
        try {

            setLoading(true);

            const response = await fetch(`${ipconfig}${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                await fetchSchedule();
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="scheduleContainer">

            {loading && <div className="loader">Loading...</div>}

            <div className="gridContainer">

                {/* Time Column */}
                <div className="timeColumn">

                    <div className="columnHeader">
                        Time
                    </div>

                    {timeList.map((item) => {

                        const startHour = item?.StartTime?.split(":")[0];
                        const endHour = item?.EndTime?.split(":")[0];

                        return (
                            <div key={item.SlotID} className="timeCell">
                                {startHour} - {endHour}
                            </div>
                        );
                    })}

                </div>

                {/* Days */}
                {scheduleList.map((day) => (

                    <div key={day.DayID} className="dayColumn">

                        <div className="columnHeader">
                            {getDayLabel(day.DayName)}
                        </div>

                        {day.Slots.map((slot) => (

                            <div key={slot.SlotID} className="checkboxCell">

                                <input
                                    type="checkbox"
                                    checked={slot.Status === "booked"}
                                    onChange={() => onClickSlot(slot)}
                                />

                            </div>

                        ))}

                    </div>

                ))}

            </div>

        </div>
    );
}