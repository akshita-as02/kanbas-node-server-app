import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Create a new assignment
  app.post("/api/assignments", (req, res) => {
    const newAssignment = assignmentDao.createAssignment(req.body);
    res.status(201).json(newAssignment);
  });

  // Retrieve all assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = assignmentDao.findAllAssignments();
    res.json(assignments);
  });

  // Retrieve a specific assignment
  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignment = assignmentDao.findAssignmentById(assignmentId);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  });

  // Update an assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updatedAssignment = assignmentDao.updateAssignment(assignmentId, req.body);
    res.json(updatedAssignment);
  });

  // Delete an assignment
  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    assignmentDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  });
}