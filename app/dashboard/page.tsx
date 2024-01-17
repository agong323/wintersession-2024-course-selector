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
import type { Course } from "./calendar";
// import { Calendar } from "./calendar";

import "./styles/style.css";

export default function Dashboard() {
  const { user } = useAuthContext();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

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

  function handleSubmit() {
    alert(`The new course added is ${course.eventName}: ${course.eventSubName}, which is on ${course.day} from ${course.startTime}-${course.endTime} at ${course.location}. The course is taught by ${course.instructor} and the the course description is:\n${course.description}`);
    setOpen(false);
  }

  // example class array with one class and one club
  let courses: Course[]= [
    { id: 0, eventName: "CS161", eventSubName: "Operating Systems", day: "M/W", startTime: "2:15 PM", endTime: "3:30 PM", location: "SEC", instructor: "Eddie Kohler"},
    { id: 1, eventName: "T4SG", day: "M/T/W/Th/F", startTime: "12:00 PM", endTime: "2:00 PM", description: "This is the T4SG Wintersession 2024."}
  ]

  // to lessen the brute force-ness 
  const nums: number[] = [];
  for(let i = 0; i < 24; i ++){
    nums.push(i);
  }

  return (
    <>
      <TypographyH2>Dashboard</TypographyH2>
      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      {user.email && <TypographyP>{`Your email is ${user.email}`}</TypographyP>}

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
      <div className="container">
        <div className="days">
          <div className="filler"></div>
          <div className="filler"></div>
          <div className="day">Mon</div>
          <div className="day">Tue</div>
          <div className="day">Wed</div>
          <div className="day">Thu</div>
          <div className="day current">Fri</div>
          <div className="day">Sat</div>
          <div className="day">Sun</div>
        </div>
        <div className="content">
          {nums.map((i) => <div key={i} className="time" style={{ gridRow: i }} >{i}:00</div>)}
          <div className="filler-col"></div>
          <div className="col" style={{ gridColumn: 3}}></div>
          <div className="col" style={{ gridColumn: 4}}></div>
          <div className="col" style={{ gridColumn: 5}}></div>
          <div className="col" style={{ gridColumn: 6}}></div>
          <div className="col" style={{ gridColumn: 7}}></div>
          <div className="col weekend" style={{ gridColumn: 8}}></div>
          <div className="col weekend" style={{ gridColumn: 9}}></div>
          <div className="row" style={{ gridRow: 1}}></div>
          <div className="row" style={{ gridRow: 2}}></div>
          <div className="row" style={{ gridRow: 3}}></div>
          <div className="row" style={{ gridRow: 4}}></div>
          <div className="row" style={{ gridRow: 5}}></div>
          <div className="row" style={{ gridRow: 6}}></div>
          <div className="row" style={{ gridRow: 7}}></div>
          <div className="row" style={{ gridRow: 8}}></div>
          <div className="row" style={{ gridRow: 9}}></div>
          <div className="row" style={{ gridRow: 10}}></div>
          <div className="row" style={{ gridRow: 11}}></div>
          <div className="row" style={{ gridRow: 12}}></div>
          <div className="row" style={{ gridRow: 13}}></div>
          <div className="row" style={{ gridRow: 14}}></div>
          <div className="row" style={{ gridRow: 15}}></div>
          <div className="row" style={{ gridRow: 16}}></div>
          <div className="row" style={{ gridRow: 17}}></div>
          <div className="row" style={{ gridRow: 18}}></div>
          <div className="row" style={{ gridRow: 19}}></div>
          <div className="row" style={{ gridRow: 20}}></div>
          <div className="row" style={{ gridRow: 21}}></div>
          <div className="row" style={{ gridRow: 22}}></div>
          <div className="row" style={{ gridRow: 23}}></div>
          {/* <div className="event event1 calendar1">Event 1</div>
          <div className="event event2 calendar2">Event 2</div>
          <div className="event event3 calendar2">Event 3</div>
          <div className="event event4 calendar1">Event 4</div> */}
          <div className="current-time"><div className="circle"></div></div>
        </div>
      </div>
      <div>
        {/* 
        {courses.map((course) => <CourseBlock key={course.id} {...course} />)} 
        the format of this looks very funky (on top of the calendar on the upper left)--fix! 
          */}
      </div>
    </>
  );

}