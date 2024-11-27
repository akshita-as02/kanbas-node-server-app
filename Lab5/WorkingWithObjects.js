const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};
const module = {
    id: 2, title: "NodeJS Module",
    description: "How to create a NodeJS server with ExpressJS",
}
export default function WorkingWithObjects(app) {
    app.get("/lab5/assignment/title/:title", (req, res) => {
        const { title } = req.params;
        assignment.title = title;
        res.json({ message: `Title updated to ${title}`, assignment });
    });

    // Retrieve assignment
    app.get("/lab5/assignment", (req, res) => {
        res.json(assignment);
    });

    // Retrieve assignment title
    app.get("/lab5/assignment/title", (req, res) => {
        res.json({ title: assignment.title });
    });

    // Update assignment score
    app.get("/lab5/assignment/score/:score", (req, res) => {
        const { score } = req.params;
        assignment.score = parseInt(score, 10);
        res.json({ message: `Score updated to ${score}`, assignment });
    });

    // Update assignment completed status
    app.get("/lab5/assignment/completed/:completed", (req, res) => {
        const { completed } = req.params;
        assignment.completed = completed === "true";
        res.json({
            message: `Completed status updated to ${assignment.completed}`,
            assignment,
        });
    });

    // Retrieve module
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });

    // Retrieve module name
    app.get("/lab5/module/name", (req, res) => {
        res.json({ name: module.title });
    });

    // Update module title
app.get("/lab5/module/title/:title", (req, res) => {
    const { title } = req.params;
    module.title = title;
    res.json({ message: `Module title updated to ${title}`, module });
});

    // Update module name
    app.get("/lab5/module/name/:name", (req, res) => {
        const { name } = req.params;
        module.title = name;
        res.json({ message: `Module name updated to ${name}`, module });
    });

    // Update module description
    app.get("/lab5/module/description/:description", (req, res) => {
        const { description } = req.params;
        module.description = description;
        res.json({
            message: `Module description updated to ${description}`,
            module,
        });
    });
}