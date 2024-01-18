"use client";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";

interface UserProfileProps {
  username: string;
  email?: string;  // Optional prop
  joinDate: string;
}

// this is from the calendar file! not quite sure how to use it here
import CourseBlock from "./calendar";
import type { Course } from "@/lib/firebase/schema";
import type { Profile } from "@/lib/firebase/schema";
import { db } from "@/lib/firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
// import { Calendar } from "./calendar";

import "./styles/style.css";

function getGridColumn(day) {
    const mapping = { Mon: 3, Tue: 4, Wed: 5, Thu: 6, Fri: 7, Sat: 8, Sun: 9 };
    return mapping[day] || null;
  }
  
  function getGridRow(time) {
    const [hour, minute] = time.split(":");
    const row = parseInt(hour) * 2 + (minute === "00" ? 1 : 2);
    return row; // We're assuming grid starts at 1:00 AM and each hour is divided into two rows.
  }

export default function Dashboard() {
  const { user } = useAuthContext();

  const [course, setCourse] = useState({
    eventName: "",
    eventSubName: "",
    day: "",
    startTime: "",
    endTime: "",
    location: "",
    instructor: "",
    description: ""
  });
  const [open, setOpen] = useState<boolean>(false);

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  function handleSubmit() {
    alert(`The new course added is ${course.eventName}: ${course.eventSubName}, which is on ${course.day} from ${course.startTime}-${course.endTime} at ${course.location}. The course is taught by ${course.instructor} and the the course description is:\n${course.description}`);
    // TODO: Add the new course to the firebase.
    const collectionRef = collection(db, "courses");
    // Specify the fields of the document to be added
    const fields = course;

    // Add to firebase
    void addDoc(collectionRef, fields);

    setOpen(false);
  }

  // example class array with one class and one club
  let courses: Course[]= [
    { id: "0", eventName: "CS161", eventSubName: "Operating Systems", day: "M/W", startTime: "2:15 PM", endTime: "3:30 PM", location: "SEC", instructor: "Eddie Kohler"},
    { id: "1", eventName: "T4SG", day: "M/T/W/Th/F", startTime: "12:00 PM", endTime: "2:00 PM", description: "This is the T4SG Wintersession 2024."}
  ]

  // to lessen the brute force-ness
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }

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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, eventName: event.target.value })}
            />
            <TextField
              label="Course Sub-name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, eventSubName: event.target.value })}
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
    
    {/* TODO: ADD ALL CURRENT COURSES */}
    <div>
        This is a Course card.
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
      <div className="calendar-grid">
        {/* Time slots */}
        {hours.map((hour) => (
          <div key={hour} className="time-slot">
            {hour}:00
          </div>
        ))}
        {/* Course Blocks */}
        {courses.map((course) =>
          course.day.split("/").map((day) => (
            <div
              key={`${course.id}-${day}`}
              className="course-block"
              style={{
                gridColumn: getGridColumn(day),
                gridRowStart: getGridRow(course.startTime),
                gridRowEnd: getGridRow(course.endTime),
              }}>
              {course.name}
            </div>
          )),
        )}
      </div>
    </div>
  </>
  );
}
