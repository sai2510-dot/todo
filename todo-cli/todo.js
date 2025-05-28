const todos = [];

const add = (todo) => {
  todos.push(todo);
};

const markAsComplete = (index) => {
  if (todos[index]) {
    todos[index].completed = true;
  }
};

const overdue = () => {
  const today = new Date().toISOString().split("T")[0];
  return todos.filter((todo) => todo.dueDate < today && !todo.completed);
};

const dueToday = () => {
  const today = new Date().toISOString().split("T")[0];
  return todos.filter((todo) => todo.dueDate === today);
};

const dueLater = () => {
  const today = new Date().toISOString().split("T")[0];
  return todos.filter((todo) => todo.dueDate > today);
};

const all = () => todos;

module.exports = {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
};
