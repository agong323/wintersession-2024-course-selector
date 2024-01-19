import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase"; // Import your firebase configuration

const useUserCourses = (userId) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!userId) return;

      const q = query(collection(db, "courses"), where("students", "array-contains", userId));

      try {
        const querySnapshot = await getDocs(q);
        const userCourses = [];
        querySnapshot.forEach((doc) => {
          userCourses.push({ id: doc.id, ...doc.data() });
        });
        setCourses(userCourses);
      } catch (error) {
        console.error("Error fetching user courses: ", error);
      }
    };

    fetchCourses();
  }, [userId]);

  return courses;
};

export default useUserCourses;
