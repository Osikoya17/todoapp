import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 sm:text-4xl">
          📝 Kiyoshi's TODO App
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all sm:w-auto w-full"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <span
                className={`flex-grow cursor-pointer text-lg ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </span>
              <button
                className="text-red-500 hover:text-red-700 transition-all"
                onClick={() => deleteTask(task.id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
