import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import KanbanPage from "./pages/KanbanPage";
import TaskDetails from "./pages/TaskDetails";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import styles from "./app.module.css";

function App() {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <Routes>
          <Route exact path="/" element={<KanbanPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
