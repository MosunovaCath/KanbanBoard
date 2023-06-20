import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./TaskDetails.module.css";

const TaskDetails = ({ match }) => {
  const { taskId } = useParams();
  const [board, setBoard] = useState([]);
  const [currentTask, setCurrentTask] = useState({});
  const [currentDesc, setCurrentDesc] = useState("");

  const findTask = () => {
    board.forEach((column) => {
      column.issues.forEach((issue) => {
        if (issue.id === taskId) {
          setCurrentTask(issue);
          setCurrentDesc(issue.description);
        }
      });
    });
  };

  const handleChange = (e) => {
    setCurrentDesc(() => e.target.value);
  };

  const loadBoardFromLocalStorage = () => {
    const savedBoeard = localStorage.getItem("kanbanBoard");
    if (savedBoeard) {
      setBoard(JSON.parse(savedBoeard));
    }
    // setBoard("redirect to main page");
  };

  useEffect(() => {
    loadBoardFromLocalStorage();
  }, []);

  useEffect(() => {
    findTask();
  }, [board]);

  useEffect(() => {
    let tempTask = {
      name: currentTask.name,
      id: currentTask.id,
      description: currentDesc,
    };
    const savedBoeard = JSON.parse(localStorage.getItem("kanbanBoard")).map(
      (column) => {
        column.issues = column.issues.map((task) => {
          if (task.id === currentTask.id) {
            return tempTask;
          }
          return task;
        });
        return column;
      }
    );
    console.log(savedBoeard);
    localStorage.setItem("kanbanBoard", JSON.stringify(savedBoeard));
    // window.dispatchEvent(new Event("storage"));
  }, [currentDesc]);

  return (
    <div className={styles.taskInfo}>
      <h2 className={styles.name}>{currentTask.name}</h2>
      <div className={styles.textBlock}>
        <Link className={styles.btnHome} to="/">
          <div className={styles.cross}>
            <span className={styles.leftLine}></span>
            <span className={styles.rightLine}></span>
          </div>
        </Link>

        <textarea
          className={styles.textarea}
          value={currentDesc}
          placeholder="Enter Text"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default TaskDetails;
