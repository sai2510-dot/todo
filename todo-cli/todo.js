const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = formattedDate(new Date());
    return all.filter((item) => item.dueDate < today);
  };

  const dueToday = () => {
    const today = formattedDate(new Date());
    return all.filter((item) => item.dueDate === today);
  };

  const dueLater = () => {
    const today = formattedDate(new Date());
    return all.filter((item) => item.dueDate > today);
  };

  const toDisplayableList = (list) => {
    const today = formattedDate(new Date());
    return list
      .map((item) => {
        const checkbox = item.completed ? "[x]" : "[ ]";
        const date = item.dueDate === today ? "" : ` ${item.dueDate}`;
        return `${checkbox} ${item.title}${date}`;
      })
      .join("\n");
  };

  return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
};

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

module.exports = todoList;
