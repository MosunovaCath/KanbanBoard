import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [activeTasks, setActiveTasks] = useState(0);
  const [finishedTasks, setFinishedTasks] = useState(0);
  const [year, setYear] = useState("");

  useEffect(() => {
    let today = new Date();
    setYear(today.getFullYear());
    window.addEventListener("storage", () => {
      console.log("Change to local storage!");
      let tempObj = JSON.parse(localStorage.getItem("kanbanBoard"));
      if (tempObj.length > 0) {
        setActiveTasks(tempObj[0].issues.length);
        setFinishedTasks(tempObj[3].issues.length);
      }
    });
  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.tasksCount}>
        <span className={styles.active}>Active tasks - {activeTasks}</span>
        <span className={styles.finish}>Finished tasks - {finishedTasks}</span>
      </div>
      <h2 className={styles.txt}>Kanban board by Catherine {year}</h2>
    </div>
  );
};

export default Footer;
