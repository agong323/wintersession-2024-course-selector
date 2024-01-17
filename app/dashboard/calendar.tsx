// typescript interface for calendar course props
// sadly event seems to be a pre-exisiting thing, so i changed the name to course (even though the calendar also has other activities)
// for showing calendar
import React from "react";
import "./styles/style.css";

// const Calendar: React.FC = () => {
//     return (
//         <div className={"container"}>
//             <h1>Hello Next.js</h1>
//             <p>This is a TypeScript file with embedded HTML and CSS.</p>
//         </div>
//     );
// }
// export { Calendar };

export interface Course {
    id: number;
    eventName: string;
    eventSubName?: string; 
    day: string;
    startTime: string;
    endTime: string;
    location?: string; 
    instructor?: string;
    description?: string;
}

// component for CourseBlock
function CourseBlock ({ eventName, eventSubName, day, startTime, endTime, location, instructor, description }: Course) {
    return (
        <div>
            <h2>{eventName}{eventSubName && <h2>{eventSubName}</h2>}</h2>
            <p><strong>Days:</strong> {day}</p>
            <p><strong>Time:</strong> {startTime} - {endTime}</p>
            {location && <p><strong>Location:</strong> {location}</p>}
            {instructor && <p><strong>Instructor:</strong> {instructor}</p>}
            {description && <p><strong>Description:</strong> {description}</p>}
        </div>
    );
}
export default CourseBlock;