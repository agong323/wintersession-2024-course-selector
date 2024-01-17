// Type definitions for all Firestore collections

export interface Profile {
  user_id: string;
  display_name: string;
  biography: string;
  courses: string[]; //ID of courses
}

export interface Course {
  id: string;
  name: string;
  subname?: string;
  day: string;
  startTime: string;
  endTime: string;
  location?:string;
  instructor?: string;
  description?: string;
  students: string[]; //ID of students
}
