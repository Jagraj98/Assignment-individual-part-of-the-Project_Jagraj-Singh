const todos = [
    { text: 'Order cat food', completed: false },
    { text: 'Clean kitchen', completed: true },
    { text: 'Buy food', completed: true },
    { text: 'Do work', completed: false },
    { text: 'Exercise', completed: true }
  ];
  
  const filters = { searchText: '', hideCompleted: false };
  
  const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
      const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
      const hideCompletedMatch =!filters.hideCompleted ||!todo.completed;
      return searchTextMatch && hideCompletedMatch;
    });
  
    const incompleteTodos = filteredTodos.filter(function (todo) {
      return!todo.completed;
    });
  
    document.querySelector('#todos').innerHTML = '';
  
    const summary = document.createElement('h2');
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
    document.querySelector('#todos').appendChild(summary);
  
    filteredTodos.forEach(function (todo) {
      const todoEl = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = todo.completed;
      todoEl.appendChild(checkbox);
  
      const todoText = document.createElement('span');
      todoText.textContent = todo.text;
      if (todo.completed) {
        todoText.style.textDecoration = 'line-through';
        todoText.style.color = 'gray';
      } else {
        todoText.style.fontWeight = 'bold';
      }
      todoEl.appendChild(todoText);
      checkbox.addEventListener('change', function () {
        todo.completed =!todo.completed;
        renderTodos(todos, filters);
      });
      document.querySelector('#todos').appendChild(todoEl);
    });
  };
  
  renderTodos(todos, filters);
  
  document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = e.target.elements.newTodoText.value.trim();
    if (text.length > 0) {
      todos.push({ text, completed: false });
      renderTodos(todos, filters);
      e.target.elements.newTodoText.value = '';
    }
  });
  
  document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
  });
  
  document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
  });