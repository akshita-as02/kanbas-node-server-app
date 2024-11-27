import * as dao from "../Users/dao.js"; // Import necessary user DAO functions
import * as enrollmentsDao from "../Enrollments/dao.js"; // Import the enrollments DAO functions
import * as courseDao from "../Courses/dao.js"; // Import course DAO functions

export default function EnrollmentRoutes(app) {
  // Route to enroll a user in a course
  const enrollInCourse = async (req, res) => {
    const { userId, courseId } = req.body;
    console.log("User ID and Course ID from enroll: ", userId, courseId);
    if (!userId || !courseId) {
      return  res.status(400).json({ message: "Missing userId or courseId" });
    }
    try {
      const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
      if (!enrollment) {
        return res.status(409).json({ message: "User is already enrolled in this course" });
      }
      res.status(200).json({ message: "User successfully enrolled in the course", enrollment });
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const unenrollFromCourse = async (req, res) => {
    const { userId, courseId } = req.body;
  
    // Ensure the user and course IDs are provided
    if (!userId || !courseId) {
      return res.status(400).json({ message: "Missing userId or courseId" });
    }
  
    try {
      // Unenroll the user from the course using the DAO function
      const unenrollmentSuccess = await enrollmentsDao.unenrollFromCourse(userId, courseId);
  
      if (!unenrollmentSuccess) {
        return res.status(404).json({ message: "Unenrollment failed. Enrollment not found." });
      }
  
      res.status(200).json({ message: "User successfully unenrolled from the course" });
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Route to get the courses a user is enrolled in
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;

    // If 'current' is passed, use the currentUser from the session
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401); // Unauthorized
      }
      userId = currentUser._id;
    }

    try {
      // Get the courses the user is enrolled in
      const courses = await courseDao.findCoursesForEnrolledUser(userId);
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // Define the routes for enrollment actions
  app.post("/api/enrollments/enroll", enrollInCourse); // Enroll in course
  app.post("/api/enrollments/unenroll", unenrollFromCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser); // Get enrolled courses
}
