document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');
  const taskForm = document.getElementById('task-form');

  // タスクを取得して表示する関数
  async function fetchTasks() {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach(task => {
          const taskItem = document.createElement('div');
          taskItem.className = 'task-item';
          taskItem.innerHTML = `
              <strong>Title:</strong> ${task.title}<br>
              <strong>Level:</strong> ${task.level}<br>
              <strong>Completed:</strong> ${task.completed ? 'Yes' : 'No'}

<br>
              <button onclick="completeTask(${task.id})">Complete</button>
              <button onclick="deleteTask(${task.id})">Delete</button>
          `;
          taskList.appendChild(taskItem);
      });
  }

  // 新しいタスクを作成する関数
  taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const level = document.getElementById('level').value;

      const response = await fetch('/tasks', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, level })
      });

      if (response.ok) {
          fetchTasks();
      }
  });

  // タスクを完了する関数
  window.completeTask = async (id) => {
      const response = await fetch(`/tasks/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: true })
      });

      if (response.ok) {
          fetchTasks();
      }
  };

  // タスクを削除する関数
  window.deleteTask = async (id) => {
      const response = await fetch(`/tasks/${id}`, {
          method: 'DELETE'
      });

      if (response.ok) {
          fetchTasks();
      }
  };

  // 初回ロード時にタスクを取得して表示
  fetchTasks();
});