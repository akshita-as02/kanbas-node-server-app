import Database from "../Database/index.js";

export async function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  // Check if user is already enrolled in the course
  const existingEnrollment = enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (existingEnrollment) {
    // Returning false or null if already enrolled
    return null; // Or throw an error, depending on your preference
  }

  // Add new enrollment
  const newEnrollment = { _id: Date.now(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment; // Return the new enrollment object
}

export function unenrollFromCourse(userId, courseId) {
  const { enrollments } = Database;

  // Find index of the enrollment to remove
  const enrollmentIndex = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (enrollmentIndex === -1) {
    console.log("User is not enrolled in this course.");
    return false; // Indicate that the unenrollment failed
  }

  // Remove the enrollment
  enrollments.splice(enrollmentIndex, 1);
  return true; // Return true to indicate successful unenrollment
}
