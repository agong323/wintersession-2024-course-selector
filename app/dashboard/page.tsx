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
    </>
  );
}
