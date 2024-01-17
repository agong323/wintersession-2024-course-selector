"use client";
import { TypographyP } from "@/components/ui/typography";
import { redirect } from "next/navigation";
import { useAuthContext } from "../(context)/auth-context";
// this is from the calendar file! not quite sure how to use it here
import CourseBlock from "./calendar";
import type { Course } from "./calendar";
// import { Calendar } from "./calendar";

import React from "react";
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

  // example class array with one class and one club
  let courses: Course[]= [
    { id: 0, eventName: "CS161", eventSubName: "Operating Systems", day: "M/W", startTime: "2:15 PM", endTime: "3:30 PM", location: "SEC", instructor: "Eddie Kohler"},
    { id: 1, eventName: "T4SG", day: "M/T/W/Th/F", startTime: "12:00 PM", endTime: "2:00 PM", description: "This is the T4SG Wintersession 2024."}
  ]

  const nums: number[] = [];
  for(let i = 0; i < 24; i ++){
    nums.push(i);
  }

  return (
    <>
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

    </>
  );
}
