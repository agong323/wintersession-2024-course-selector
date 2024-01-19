// typescript interface for calendar course props
// sadly event seems to be a pre-exisiting thing, so i changed the name to course (even though the calendar also has other activities)
// for showing calendar
import React from "react";
import "./styles/style.css";
import type { Course, Profile } from "@/lib/firebase/schema";
import { Button } from "@/components/ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

interface CourseBlockProps {
    key: string;
    course: Course;
    userid: Profile;
  }
  

  // component for CourseBlock
  function CourseBlock ({key, course, userid}: CourseBlockProps) {
        async function addToCourses() {
            let newStudents = course.students;
            alert(`new students are ${ newStudents }`);
            if(!newStudents.includes(userid.user_id)){
              newStudents.push(userid.user_id);
            }
            await setDoc(doc(db, "courses", course.id), {
              ...course, students:newStudents
            });
        }

      return (
        <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
            <h2>{course.name}{course.subname && <h2>{course.subname}</h2>}</h2>
            <p><strong>Days:</strong> {course.day}</p>
            <p><strong>Time:</strong> {course.startTime} - {course.endTime}</p>
            {location && <p><strong>Location:</strong> {course.location}</p>}
            {course.instructor && <p><strong>Instructor:</strong> {course.instructor}</p>}
            {course.description && <p><strong>Description:</strong> {course.description}</p>}
            <Button onClick={addToCourses}>Add</Button>
      </div>

      );
  }
  export default CourseBlock;