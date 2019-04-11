import React from "react";
import * as styles from "../../css/App.css";

const spinner = require("../../img/spinner.gif");

export default function Spinner() {
  return (
    <div>
      <img src={spinner} className={styles.spinner} alt="Loading..." />
    </div>
  );
}
