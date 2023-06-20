import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./KanbanColumn.module.css";

const KanbanColumn = ({
  title,
  issues,
  previousCategory,
  moveTask,
  addNewTask,
}) => {
  const [showInput, setShowInput] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (title === "Backlog") {
      setShowInput(true);
    } else {
      setShowOptions(true);
    }
  };
  return (
    <div className={styles.kanbanCol}>
      <h2>{title}</h2>
      {issues.map((task) => {
        return (
          <Link className={styles.task} to={"/tasks/" + task.id} key={task.id}>
            {task.name}
          </Link>
        );
      })}
      {showInput && (
        <input
          className={styles.backlogInput}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      )}
      {showOptions && (
        <select
          className={styles.selectMenu}
          value={selectedTask}
          onChange={(e) => {
            moveTask(e.target.value, previousCategory.title, title);
            setShowOptions(false);
          }}
        >
          <option value="">Select a task</option>
          {previousCategory.issues.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
      )}

      {showInput && (
        <button
          className={`${styles.btn} ${styles.submit}`}
          onClick={() => {
            if (newTask.trim() !== "") {
              addNewTask(newTask);
              setShowInput(false);
              setNewTask("");
            }
          }}
        >
          Submit
        </button>
      )}
      {showInput || showOptions ? (
        <></>
      ) : (
        <button className={`${styles.btn} ${styles.add}`} onClick={addTask}>
          + Add card{" "}
        </button>
      )}
    </div>
  );
};

export default KanbanColumn;
