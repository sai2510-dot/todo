const todoList = require("../todo");

const formattedDate = (d) => d.toISOString().split("T")[0];
const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(new Date(dateToday.setDate(dateToday.getDate() - 1)));
const tomorrow = formattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

describe("Todo List Test Suite", () => {
  let todos;

  beforeAll(() => {
    todos = todoList();
    todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
    todos.add({ title: "Pay rent", dueDate: today, completed: true });
    todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
    todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
    todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });
  });

  test("Should add a new todo", () => {
    const count = todos.all.length;
    todos.add({ title: "New Task", dueDate: today, completed: false });
    expect(todos.all.length).toBe(count + 1);
  });

  test("Should mark a todo as complete", () => {
    todos.markAsComplete(2);
    expect(todos.all[2].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdues = todos.overdue();
    expect(overdues.every((item) => item.dueDate < today)).toBe(true);
  });

  test("Should retrieve due today items", () => {
    const todayItems = todos.dueToday();
    expect(todayItems.every((item) => item.dueDate === today)).toBe(true);
  });

  test("Should retrieve due later items", () => {
    const laterItems = todos.dueLater();
    expect(laterItems.every((item) => item.dueDate > today)).toBe(true);
  });
});
