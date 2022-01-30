import React from "react";
import "./Nonsense.scss";

import NonsenseForm from "./NonsenseForm";

const Nonsense = () => {
  return (
    <div className="nonsense">
      <h1 className="nonsense__heading">Nonsense</h1>
      <NonsenseForm />
    </div>
  );
};

export default Nonsense;
