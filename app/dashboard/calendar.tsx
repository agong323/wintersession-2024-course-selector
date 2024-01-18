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












import { GetStaticProps } from 'next';



type CourseListProps = {
  courses: Course[];
};

// scrollable list
const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const listStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
    maxHeight: '80vh',
    overflowY: 'auto' as 'auto',
    width: '30vw',
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  };

  const boxStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '5px',
    height: 'auto',
    border: '1px solid gray',
    padding: '5px',
  };
  return (
    <div style={listStyle}>
      {courses.map((course) => (
        <div key={course.id} style={boxStyle}>
          <h3>{course.name}</h3>
          <p>Instructor: {course.instructor}</p>
          <p>Time: {course.time}</p>
          <p>Location: {course.location}</p>
        </div>
      ))}
    </div>
  );
};

// Define a Next.js function that fetches the courses data from a mock API and passes it as props to the CourseList component
export const getStaticProps: GetStaticProps = async () => {
  // Use a mock API to get the courses data
  // You can replace this with your own API call or logic
  const courses = await fetch('https://mockapi.io/courses').then((res) =>
    res.json()
  );

  // Return the props object with the courses data
  return {
    props: {
      courses,
    },
  };
};

export default CourseList;

