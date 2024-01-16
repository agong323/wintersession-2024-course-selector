// typescript interface for calendar course props
// sadly event seems to be a pre-exisiting thing, so i changed the name to course (even though the calendar also has other activities)
interface Course {
    eventName: string;
    eventSubName?: string; 
    day: string;
    startTime: string;
    endTime: string;
    location?: string; 
    instructor?: string;
    description?: string;
}

// example class array with one class and one club
let courses: Course[]= [
    { eventName: "CS161", eventSubName: "Operating Systems", day: "M/W", startTime: "2:15 PM", endTime: "3:30 PM", location: "SEC", instructor: "Eddie Kohler"},
    { eventName: "T4SG", day: "M/T/W/Th/F", startTime: "12:00 PM", endTime: "2:00 PM", description: "This is the T4SG Wintersession 2024."}
]

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