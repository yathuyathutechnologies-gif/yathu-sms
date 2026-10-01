"use client";

import { useEffect, useState } from "react";
import styles from "./styles/timeTable.module.css";

const days = [
    {
        dayId: 1,
        dayName: "Monday",
        dayNumber: 1,
    },
    {
        dayId: 2,
        dayName: "Tuesday",
        dayNumber: 2,
    },
    {
        dayId: 3,
        dayName: "Wednesday",
        dayNumber: 3,
    },
    {
        dayId: 4,
        dayName: "Thursday",
        dayNumber: 4,
    },
    {
        dayId: 5,
        dayName: "Friday",
        dayNumber: 5,
    },
];

const periods = [
    {
        periodId: 1,
        startTime: "07:00",
        endTime: "08:00",
        periodNumber: 1,
    },
    {
        periodId: 2,
        startTime: "08:00",
        endTime: "09:00",
        periodNumber: 2,
    },
    {
        periodId: 3,
        startTime: "09:00",
        endTime: "10:00",
        periodNumber: 3,
    },
    {
        periodId: 4,
        startTime: "10:00",
        endTime: "11:00",
        periodNumber: 4,
    },
    {
        periodId: 5,
        startTime: "11:00",
        endTime: "12:00",
        periodNumber: 5,
    },
    {
        periodId: 6,
        startTime: "12:00",
        endTime: "13:00",
        periodNumber: 6,
    },
    {
        periodId: 7,
        startTime: "13:00",
        endTime: "14:00",
        periodNumber: 7,
    },
    {
        periodId: 8,
        startTime: "14:00",
        endTime: "15:00",
        periodNumber: 8,
    },
    {
        periodId: 9,
        startTime: "15:00",
        endTime: "16:00",
        periodNumber: 9,
    },
];

export interface MyCourse {
    courseId: number;
    courseName: string;
    courseCode: string;
}
const dataSource = {
    myCourses: [
        {
            courseId: 1,
            courseName: "Human Anatomy",
            courseCode: "MED 101",
        },
        {
            courseId: 2,
            courseName: "Human Physiology",
            courseCode: "MED 102",
        },
        {
            courseId: 3,
            courseName: "Biochemistry",
            courseCode: "MED 103",
        },
    ],

    entries: [
        {
            timetableId: 1,
            courseId: 1,
            courseCode: "MED 101",
            courseName: "Human Anatomy",
            dayId: 1,
            dayName: "Monday",
            periodId: 2,
            periodNumber: 2,
            startTime: "08:00",
            endTime: "09:00",
            roomId: 5,
            roomName: "Room A",
            roomCode: "A"
        },
        {
            timetableId: 2,
            courseId: 2,
            courseCode: "MED 102",
            courseName: "Human Physiology",
            dayId: 1,
            dayName: "Monday",
            periodId: 4,
            periodNumber: 4,
            startTime: "10:00",
            endTime: "11:00",
            roomId: 8,
            roomName: "Room B",
            roomCode: "B"
        },
        {
            timetableId: 3,
            courseId: 3,
            courseCode: "MED 103",
            courseName: "Biochemistry",
            dayId: 2,
            dayName: "Tuesday",
            periodId: 3,
            periodNumber: 3,
            startTime: "09:00",
            endTime: "10:00",
            roomId: 5,
            roomName: "Room A",
            roomCode: "A"
        },
        {
            timetableId: 4,
            courseId: 3,
            courseCode: "MED 103",
            courseName: "Biochemistry",
            dayId: 1,
            dayName: "Monday",
            periodId: 3,
            periodNumber: 3,
            startTime: "09:00",
            endTime: "10:00",
            roomId: 5,
            roomName: "Room W",
            roomCode: "W"
        },
        {
            timetableId: 5,
            courseId: 3,
            courseCode: "MED 103",
            courseName: "Biochemistry",
            dayId: 4,
            dayName: "Thursday",
            periodId: 5,
            periodNumber: 3,
            startTime: "09:00",
            endTime: "10:00",
            roomId: 5,
            roomName: "Room A",
            roomCode: "A"
        },
        {
            timetableId: 6,
            courseId: 9,
            courseCode: "MED 103",
            courseName: "Biochemistry",
            dayId: 2,
            dayName: "Tuesday",
            periodId: 3,
            periodNumber: 6,
            startTime: "12:00",
            endTime: "13:00",
            roomId: 5,
            roomName: "Room A",
            roomCode: "A"
        },
    ]
}

const TimeTable = () => {
    const [entries, setEntries] = useState<
        {
            timetableId: number;
            courseId: number;
            courseCode: string;
            courseName: string;
            dayId: number;
            dayName: string;
            periodId: number;
            periodNumber: number;
            startTime: string;
            endTime: string;
            roomId: number;
            roomName: string;
            roomCode: string;
        }[]
    >([]);
    const [myCourses, setMyCourses] = useState<
        {
            courseId: number;
            courseName: string;
            courseCode: string;
        }[]
    >([]);

    // loading state
    const [isLodingTimeTable, setIsLoadingTimeTable] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            const data = dataSource;
            setMyCourses(data.myCourses);
            setEntries(data.entries);
        }
        fetchData();
    }, []);
    return (
        <div className={styles.container}>
            <svg
                width="0"
                height="0"
                style={{ position: "absolute" }}
            >
                <defs>
                    <clipPath
                        id="timetableroom"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path
                            transform="scale(0.01 0.0142857)"
                            d="
                                M 10 0
                                L 100 0
                                L 85 100
                                L 10 100
                                Z
                                "
                        />
                    </clipPath>
                </defs>
            </svg>
            <div className={styles.table}>
                <ul className={styles.courseList}>
                    {myCourses.map((course) => (
                        <li
                            key={course.courseId}
                            className={styles.course}
                        >
                            {course.courseCode}
                        </li>
                    ))}
                </ul>

                <div className={styles.days}>

                    {days.map((day) => (
                        <div
                            key={day.dayId}
                            className={styles.day}
                        >
                            <div className={styles.dayTitle}>
                                {day.dayName}
                            </div>

                            <div className={styles.dayBody}>

                                {myCourses.map((course) => (

                                    <div
                                        key={course.courseId}
                                        className={styles.courseRow}
                                    >

                                        {periods.map((period) => {

                                            const entry = entries.find(
                                                (entry) =>
                                                    entry.courseId === course.courseId &&
                                                    entry.dayId === day.dayId &&
                                                    entry.periodId === period.periodId
                                            );

                                            return (
                                                <div
                                                    key={period.periodId}
                                                    className={styles.period}
                                                >

                                                    {entry && (
                                                        <div className={styles.courseEntry}>
                                                            <div className={styles.courseEntryBackground}/>
                                                            <div className={styles.timeInstance}>
                                                                
                                                            <div className={styles.roomName}>
                                                                {entry.roomCode}
                                                            </div>
                                                            <div className={styles.courseEntryName}>
                                                                {entry.courseCode}
                                                            </div>
                                                            <div className={styles.timeEntry}>
                                                                {`${entry.startTime}`}
                                                            </div>
                                                                </div>
                                                        </div>
                                                    )}

                                                </div>
                                            );
                                        })}

                                    </div>

                                ))}

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default TimeTable;
