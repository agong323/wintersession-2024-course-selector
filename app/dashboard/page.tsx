"use client";
import { TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CourseBlock from "./calendar";
import type { Course, Profile } from "@/lib/firebase/schema";
import { db } from "@/lib/firebase/firestore";
import { addDoc, collection, query, onSnapshot, where } from "firebase/firestore";
import "./styles/style.css";

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

  function getGridColumn(days: string): number[] {
    const mapping: { [key: string]: number} = { 'M': 2, 'T': 3, 'W': 4, 'Th': 5 , 'F': 6, 'Sat': 7, 'Sun': 8};
    return days.split("/").map(day => {
      const column = mapping[day];
      if (column == undefined) {
        throw new Error(`Invalid day: ${ day }`);
      }
      return column;
    })
  }

function getGridRow(time: string): number {
  const [hourString, minutePart] = time.split(":");
  if (!hourString || !minutePart) {
    throw new Error("Invalid time format: Expected format HH:MM AM/PM");
  }

  const [minute, period] = minutePart.split(" ");
  //if (minute || !period) {
  //  throw new Error("Invalid time format: Missing minutes or period part");
  //}

  let hour = parseInt(hourString, 10);
  if (isNaN(hour)) {
    throw new Error("Invalid time format: Hour is not a number");
  }

  if (period === "PM" && hour < 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  const rowOffset = 2;
  const row = hour + rowOffset;
  return row;
}

export default function Dashboard() {
  const { user, profile } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  const [course, setCourse] = useState<Course>({
    id: "",
    name: "",
    subname: "",
    day: "",
    startTime: "",
    endTime: "",
    location: "",
    instructor: "",
    description: "",
    students: [],
  });
  const [open, setOpen] = useState<boolean>(false);

  const [courses, setCourses] = useState<"loading" | "error" | Course[]>("loading");
  useEffect(() => {
    // What we're asking for
    const q = query(collection(db, "courses"));
    // Start listening to Firestore (set up a snapshot)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Obtain array of documents from snapshot
        const docs = snapshot.docs;
        // Map the array of documents to an array of PetWithId objects
        const courseWithId = docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Course);
        // Update the pets state variable with the PetWithId[] array
        setCourses(courseWithId);
      },
      (error) => {
        console.log(error.message);
        setCourses("error");
      },
   );
    // Stop listening when the component is unmounted
    return unsubscribe;
  }, []);

  const [userCourses, setUserCourses] = useState<"loading" | "error" | Course[]>("loading");
  useEffect(() => {
    // What we're asking for
    const q = query(collection(db, "courses"), where("students", "array-contains", user.uid));
    // Start listening to Firestore (set up a snapshot)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // Obtain array of documents from snapshot
        const docs = snapshot.docs;
        // Map the array of documents to an array of PetWithId objects
        const courseWithId = docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Course);
        // Update the pets state variable with the PetWithId[] array
        setUserCourses(courseWithId);
      },
      (error) => {
        console.log(error.message);
        setCourses("error");
      },
  );
    // Stop listening when the component is unmounted
    return unsubscribe;
  }, []);
  
  let coursesSection;
  if (courses === "loading" || profile === "loading") {
    coursesSection = <p>Loading courses...</p>;
  } else if (courses === "error" || profile === null) {
    coursesSection = <p>There was an error fetching courses</p>;
  } else {
    coursesSection = courses.map((crse) => <CourseBlock key={crse.id} course={crse} userid={profile}/>);
  }

  
  
  function handleSubmit() {
    alert(`The new course added is ${course.name}: ${course.subname}, which is on ${course.day} from ${course.startTime}-${course.endTime} at ${course.location}. The course is taught by ${course.instructor} and the the course description is:\n${course.description}`);
    // TODO: Add the new course to the firebase.
    const collectionRef = collection(db, "courses");
    // Specify the fields of the document to be added
    const fields = course;

    // Add to firebase
    void addDoc(collectionRef, fields);

    setOpen(false);
  };

  // Hours array for time slots
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <>
      <div className="flex flex-col items-center">
        <Button onClick={() => setOpen(true)} variant="outlined">
          Add Course
        </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add Course</DialogTitle>
            <DialogContent>
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <TextField
                  label="Course Name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, name: event.target.value })}
                />
                <TextField
                  label="Course Sub-name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, subname: event.target.value })}
                />
                <TextField
                  label="Course Day(s)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, day: event.target.value })}
                />
                <TextField
                  label="Start Time"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, startTime: event.target.value })}
                />
                <TextField
                  label="End Time"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, endTime: event.target.value })}
                />
                <TextField
                  label="Instructor"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, instructor: event.target.value })}
                />
                <TextField
                  label="Location"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, location: event.target.value })}
                />
                <TextField
                  label="Course Description"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, description: event.target.value })}
                />
                <Button type="submit" variant="outlined">
                  Add
                </Button>
              </form>
            </DialogContent>
          </Dialog>
    </div>
    <div style={{ display: 'flex', gap: '16px' }}>
      {coursesSection}
    </div>

    <div className="dashboard-container">
      <div className="days-header">
        {/* Headers for days */}
        <div className="day-header">Mon</div>
        <div className="day-header">Tue</div>
        <div className="day-header">Wed</div>
        <div className="day-header">Thu</div>
        <div className="day-header">Fri</div>
        <div className="day-header">Sat</div>
        <div className="day-header">Sun</div>
      </div>
      <div className="calendar-grid" >
        {/* Time slots */}
        {hours.map((hour) => (
          <div key={hour} className="time-slot">
            {hour}:00
          </div>
        ))}
        { /* checks if the input is Course[] */ } 
        {Array.isArray(courses) ? (
          courses.map((course: Course) => 
            getGridColumn(course.day).map((column, index) => (
              <div
                key={`${course.id}-${index}`}
                className="course-block"
                style={{
                  gridColumn: column,
                  gridRow: `${getGridRow(course.startTime)} / span ${getGridRow(course.endTime) - getGridRow(course.startTime) }`,
                }}>
                  {course.name}
              </div>
            ),
          ))) : (
            // if it isn't an array (is error or loading), we don't have anything to show
            <p>There's an error. Please try again!</p>
          )}
        </div>
    </div>
  </>
  );
}
