// typescript interface for calendar course props
// sadly event seems to be a pre-exisiting thing, so i changed the name to course (even though the calendar also has other activities)
// for showing calendar
import React from "react";
import "./styles/style.css";
import type { Course } from "@/lib/firebase/schema";

// component for CourseBlock
export function CourseBlock (course: Course) {
    return (
        <div>
            <h2>{course.name}{course.subname && <h2>{course.subname}</h2>}</h2>
            <p><strong>Days:</strong> {course.day}</p>
            <p><strong>Time:</strong> {course.startTime} - {course.endTime}</p>
            {location && <p><strong>Location:</strong> {course.location}</p>}
            {course.instructor && <p><strong>Instructor:</strong> {course.instructor}</p>}
            {course.description && <p><strong>Description:</strong> {course.description}</p>}
        </div>
    );
}
export default CourseBlock;

