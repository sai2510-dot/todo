const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");

// Serve static files from public folder (for CSS etc)
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get("/", function (request, response) {
  // Render the index.ejs view
  response.render("index");
});

// Route to render the todos.ejs page with todos data
app.get("/todos-view", async function (request, response) {
  try {
    const todos = await Todo.findAll();
    response.render("todos", { todos });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Failed to fetch todos" });
  }
});

// API route: Get all todos
app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll();
    response.send(todos);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Failed to fetch todos" });
  }
});

// API route: Get todo by ID
app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// API route: Create a new todo
app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// API route: Mark todo as completed
app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// API route: Delete a todo by ID
app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    const deleted = await Todo.destroy({ where: { id: request.params.id } });
    response.send(deleted > 0); // true if deleted, false if not found
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

module.exports = app;

// Start the server on PORT 3000 or the environment's PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
