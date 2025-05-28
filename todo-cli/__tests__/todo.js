const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList;

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    // Clear the todo list before tests run
    all.length = 0;

    // Create some test todos
    const today = new Date();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    add({
      title: "Overdue Todo",
      dueDate: new Date(today.getTime() - oneDayInMs).toISOString().split("T")[0],
      completed: false,
    });

    add({
      title: "Due Today Todo",
      dueDate: today.toISOString().split("T")[0],
      completed: false,
    });

    add({
      title: "Due Later Todo",
      dueDate: new Date(today.getTime() + oneDayInMs).toISOString().split("T")[0],
      completed: false,
    });
  });

  test("Should add a new todo", () => {
    const todoCount = all.length;
    add({
      title: "New Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });
    expect(all.length).toBe(todoCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(
      overdueItems.every((todo) => new Date(todo.dueDate) < new Date() && !todo.completed)
    ).toBe(true);
  });

  test("Should retrieve due today items", () => {
    const todayItems = dueToday();
    const today = new Date().toISOString().split("T")[0];
    expect(todayItems.every((todo) => todo.dueDate === today)).toBe(true);
  });

  test("Should retrieve due later items", () => {
    const laterItems = dueLater();
    expect(
      laterItems.every((todo) => new Date(todo.dueDate) > new Date())
    ).toBe(true);
  });
});

  
