import React, { useState } from 'react';
import { PencilIcon, CheckIcon, TrashIcon } from '@heroicons/react/solid'; // Import icons from Heroicons

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editingText } : task
    ));
    setEditingTaskId(null); // Reset editing state
    setEditingText(''); // Clear editing text
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
            onKeyDown={(e) => e.key === 'Enter' && addTask()} // Replaced onKeyPress with onKeyDown
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
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <span
                  className={`flex-grow cursor-pointer text-lg ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
              )}

              <div className="flex gap-2">
                {editingTaskId === task.id ? (
                  <button
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
                    onClick={() => saveEdit(task.id)}
                  >
                    <CheckIcon className="h-5 w-5" /> {/* Save icon */}
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-all"
                    onClick={() => startEditing(task.id, task.text)}
                  >
                    <PencilIcon className="h-5 w-5" /> {/* Edit icon */}
                  </button>
                )}

                <button
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                  onClick={() => deleteTask(task.id)}
                >
                  <TrashIcon className="h-5 w-5" /> {/* Delete icon */}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
