import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firestore'; // Import your firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { Profile, Course } from '@/lib/firebase/schema';

const useUserCourses = (userId: Profile) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!userId) return;

      const q = query(
        collection(db, 'courses'), 
        where('students', 'array-contains', userId)
      );

      try {
        const querySnapshot = await getDocs(q);
        const userCourses: Course[] = [];
        querySnapshot.forEach((doc) => {
          userCourses.push({ id: doc.id, ...doc.data() } as Course);
        });
        setCourses(userCourses);
      } catch (error) {
        console.error('Error fetching user courses: ', error);
      }
    };

    fetchCourses();
  }, [userId]);

  return courses;
};

export default useUserCourses;
