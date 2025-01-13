// TodoItems.jsx
import { format } from 'date-fns';
import './CSS/TodoItems.css';

const TodoItems = ({ no, text, display, createdAt, deleteTodo, completeTodo, darkMode }) => {
    // Make sure the required props are available
    if (!no || !text || !createdAt || !deleteTodo || !completeTodo) {
        return null; // Return null if any of the necessary props are missing
    }

    return (
        <div className="todoitems">
            <div className={`todoitems-container ${display} ${darkMode ? 'dark' : ''}`}>
                <div className="todoitems-content">
                    <div className="todoitems-text">{text}</div>
                    <div className="todoitems-date">
                        Created: {format(new Date(createdAt), 'MMM d, yyyy')}
                    </div>
                </div>
                <div className="todoitems-buttons">
                    <button 
                        className="complete-btn"
                        onClick={() => completeTodo(no)} // Calling completeTodo with `no` as identifier
                        aria-label="Mark as complete"
                    >
                        ✓
                    </button>
                    <button 
                        className="delete-btn"
                        onClick={() => deleteTodo(no)} // Calling deleteTodo with `no` as identifier
                        aria-label="Delete task"
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItems;
