// typescript interface for calendar course props
// sadly event seems to be a pre-exisiting thing, so i changed the name to course (even though the calendar also has other activities)
// for showing calendar
import React from "react";
import "./styles/style.css";
import type { Course } from "@/lib/firebase/schema";

// component for CourseBlock
function CourseBlock ({ name, subname, day, startTime, endTime, location, instructor, description }: Course) {
    return (
        <div>
            <h2>{name}{subname && <h2>{subname}</h2>}</h2>
            <p><strong>Days:</strong> {day}</p>
            <p><strong>Time:</strong> {startTime} - {endTime}</p>
            {location && <p><strong>Location:</strong> {location}</p>}
            {instructor && <p><strong>Instructor:</strong> {instructor}</p>}
            {description && <p><strong>Description:</strong> {description}</p>}
        </div>
    );
}
export default CourseBlock;


