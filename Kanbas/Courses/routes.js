import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";

export default function CourseRoutes(app) {
    const getUserIdFromSession = (req) => {
        if (!req.session || !req.session.currentUser) {
            return null; // Return null if no session or user is logged in
        }
        return req.session.currentUser._id; // Retrieve the userId from the session
    };

    // Module Routes
    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });

    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.delete("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        modulesDao.deleteModule(moduleId);
        res.sendStatus(204);
    });

    // Course Routes
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    });

    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        dao.deleteCourse(courseId);
        res.sendStatus(204);
    });

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        dao.updateCourse(courseId, courseUpdates);
        res.sendStatus(204);
    });
    app.get("/api/users/current/courses", (req, res) => {
        const userId = getUserIdFromSession(req);

        if (!userId) {
            res.status(401).json({ message: "Unauthorized. Please sign in first." });
            return;
        }

        // Fetch courses for the current user
        const courses = dao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    });
    // Assignment Routes
    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = assignmentsDao.createAssignment(assignment);
        res.status(201).send(newAssignment);
    });

    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentsDao.findAllAssignments().filter(assignment => assignment.course === courseId);
        res.json(assignments);
    });

    app.get("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignment = assignmentsDao.findAssignmentById(assignmentId);
        if (assignment) {
            res.json(assignment);
        } else {
            res.sendStatus(404);
        }
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        if (updatedAssignment) {
            res.json(updatedAssignment);
        } else {
            res.sendStatus(404);
        }
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        assignmentsDao.deleteAssignment(assignmentId);
        res.sendStatus(204);
    });
}
