import React from 'react';
import useUserCourses from './useUserCourses';

const userComponent = ({ userId }) => {
  const userCourses = useUserCourses(userId);

  return (
    <div>
      <h2>My Courses</h2>
      {userCourses.map(course => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          {/* Render other course details */}
        </div>
      ))}
    </div>
  );
};
