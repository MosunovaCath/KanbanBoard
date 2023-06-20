import React, { useEffect, useState } from "react";
import KanbanColumn from "../../components/ui/KanbanColumn";
import styles from "./styles.module.css";

const KanbanPage = (props) => {
  const [board, setBoard] = useState([]);

  const moveTask = (issueId, fromTitle, targetTitle) => {
    setBoard((prevboard) => {
      let currentTask;
      const updatedBoard = prevboard.map((column) => {
        if (column.title === fromTitle) {
          currentTask = column.issues.find((element) => element.id === issueId);
          const updatedIssues = column.issues.filter(
            (issue) => issue.id !== issueId
          );
          return { ...column, issues: updatedIssues };
        } else if (column.title === targetTitle) {
          return { ...column, issues: [...column.issues, currentTask] };
        }
        return column;
      });
      return updatedBoard;
    });
  };

  const addNewTask = (name) => {
    const id = String(Math.floor(Math.random() * 10000) + 1);
    const updatedBoard = [...board];
    console.log(board);
    const newObj = {
      id,
      name,
      description: "",
    };

    console.log(newObj);
    updatedBoard[0].issues.push(newObj);
    setBoard(updatedBoard);
  };

  const loadBoardFromLocalStorage = () => {
    const savedBoeard = localStorage.getItem("kanbanBoard");
    console.log(savedBoeard);
    if (savedBoeard) {
      console.log("board from localstorag");
      setBoard(JSON.parse(savedBoeard));
    } else {
      const data = [
        {
          title: "Backlog",
          issues: [
            {
              id: "12345",
              name: "Sprint bugfix",
              description: "Fix all the bugs",
            },
            {
              id: "67890",
              name: "Implement new feature",
              description: "Add a new feature to the application",
            },
          ],
        },
        {
          title: "Ready",
          issues: [],
        },
        {
          title: "In Progress",
          issues: [
            {
              id: "54321",
              name: "Refactor code",
              description: "Improve the code structure",
            },
          ],
        },
        {
          title: "Finished",
          issues: [],
        },
      ];
      console.log("data from front");
      setBoard(data);
    }
  };

  useEffect(() => {
    loadBoardFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log("tasks changed");
    localStorage.setItem("kanbanBoard", JSON.stringify(board));
    window.dispatchEvent(new Event("storage"));
  }, [board]);

  return (
    <div className={styles.kanbanBoard}>
      {/* <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        check
      </button> */}

      <div className={styles.kanbanRow}>
        {board.map((category, i, arr) => (
          <KanbanColumn
            key={category.title + i}
            title={category.title}
            issues={category.issues}
            previousCategory={arr[i - 1]}
            moveTask={moveTask}
            addNewTask={addNewTask}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanPage;
