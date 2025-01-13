import { useState, useEffect, useRef } from 'react';
import TodoItems from './TodoItems';
import './CSS/Todo.css';

const Todo = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
    const [count, setCount] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);

    const add = () => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue) {
            setTodos([...todos, {
                no: count,
                text: inputValue,
                display: '',
                createdAt: new Date().toISOString()
            }]);
            setCount(count + 1);
            inputRef.current.value = '';
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            add();
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.no !== id));
    };

    const completeTodo = (id) => {
        setTodos(todos.map((todo) =>
            todo.no === id ? { ...todo, display: todo.display === '' ? 'line-through' : '' } : todo
        ));
    };

    const clearAll = () => {
        setTodos([]);
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return todo.display === '';
        if (filter === 'completed') return todo.display === 'line-through';
        return true;
    });

    const activeTodosCount = todos.filter(todo => todo.display === '').length;

    return (
        <div className={`todo ${darkMode ? 'dark-mode' : ''}`}>
            <div className="theme-toggle">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="theme-toggle-btn"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>
            </div>

            <div className="todo-header">To-Do List</div>

            <div className="todo-add">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add Your Task"
                    className="todo-input"
                    onKeyPress={handleKeyPress}
                    maxLength={100}
                />
                <div onClick={add} className="todo-add-btn">ADD</div>
            </div>

            <div className="todo-controls">
                <div className="todo-filters">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </button>
                    <button
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                <div className="todo-clear">
                    <button
                        onClick={clearAll}
                        className="todo-clear-btn"
                        disabled={todos.length === 0}
                    >
                        Clear All
                    </button>
                    <span className="todo-count">
                        {activeTodosCount} active task{activeTodosCount !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            <div className="todo-list">
                {filteredTodos.length === 0 ? (
                    <div className="empty-state">
                        No tasks to display
                    </div>
                ) : (
                    filteredTodos.map((item) => (
                        <TodoItems
                            key={item.no}
                            {...item}
                            deleteTodo={deleteTodo}
                            completeTodo={completeTodo}
                            darkMode={darkMode}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Todo;
