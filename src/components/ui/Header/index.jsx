import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(styles);
  return (
    <div className={styles.nav}>
      <h1>Awesome Kanban Board</h1>
      <div className={styles.userBtn} onClick={() => setShowMenu(!showMenu)}>
        <img src="./images/user-avatar.jpg" alt="avatar" />
        {showMenu ? (
          <span>
            <img src="./images/up.svg" alt="up" />
          </span>
        ) : (
          <span>
            <img src="./images/down.svg" alt="down" />
          </span>
        )}
        {showMenu && (
          <div className={styles.dropdown}>
            <p>Profile</p>
            <p>Log out</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
