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
  email?: string;
  joinDate: string;
}

import CourseBlock from "./calendar";
import type { Course } from "@/lib/firebase/schema";
// import { Calendar } from "./calendar";

import "./styles/style.css";

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

function getGridColumn(day: string) {
  const mapping: { [key in DayOfWeek]: number } = { Mon: 3, Tue: 4, Wed: 5, Thu: 6, Fri: 7, Sat: 8, Sun: 9 };
  if (day in mapping) {
      return mapping[day as DayOfWeek];
  }
}

function getGridRow(time: string): number {
  let [hourString, minutePart] = time.split(":");
  if (!hourString || !minutePart) {
    throw new Error("Invalid time format: Expected format HH:MM AM/PM");
  }

  let [minute, period] = minutePart.split(" ");
  if (!minute || !period) {
    throw new Error("Invalid time format: Missing minutes or period part");
  }

  let hour = parseInt(hourString, 10);
  if (isNaN(hour)) {
    throw new Error("Invalid time format: Hour is not a number");
  }

  if (period === "PM" && hour < 12) {
    hour += 12;
  } else if (period === "AM" && hour === 12) {
    hour = 0;
  }

  const rowOffset = 1;
  const row = hour * 2 + (minute === "00" ? 1 : 2) - rowOffset;
  return row;
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`The new course added is ${course.eventName}: ${course.eventSubName}, which is on ${course.day} from ${course.startTime}-${course.endTime} at ${course.location}. The course is taught by ${course.instructor} and the course description is:\n${course.description}`);
    setOpen(false);
  };

  // example class array with one class and one club
  let courses: Course[]= [
    { id: "0", name: "CS161", subname: "Operating Systems", day: "M/W", startTime: "2:15 PM", endTime: "3:30 PM", location: "SEC", instructor: "Eddie Kohler"},
    { id: "1", name: "T4SG", day: "M/T/W/Th/F", startTime: "12:00 PM", endTime: "2:00 PM", description: "This is the T4SG Wintersession 2024."}
  ]

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
