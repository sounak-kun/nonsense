import React, { ChangeEvent, FormEvent, useState } from "react";
import "./NonsenseForm.scss";

import nonsenseGenerate from "./nonsenseGenerate";

const NonsenseForm = () => {
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [lastDisabled, setLastDisabled] = useState(false);
  const [lastValue, setLastValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [nextClass, setNextClass] = useState("nonsense-form__next");
  const [nopeClass, setNopeClass] = useState("nonsense-form__nope");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!firstSubmit) {
      setNewValue(nonsenseGenerate(lastValue));

      setLastDisabled(true);
      setNextClass((last) => `${last} nonsense-form__next--update`);
      setNopeClass((last) => `${last} nonsense-form__nope--update`);

      setFirstSubmit(true);
      return;
    }

    if ((e.nativeEvent as SubmitEvent).submitter?.matches("#next")) {
      setLastValue(newValue);
      setNewValue((last) => nonsenseGenerate(last));
    } else {
      setNewValue(nonsenseGenerate(lastValue));
    }
  };

  const lastChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLastValue(e.target.value);
  };

  return (
    <form action="#" className="nonsense-form" onSubmit={submitHandler}>
      <div className="nonsense-form__last">
        <label htmlFor="last" className="nonsense-form__last-label">
          Last Word
        </label>
        <input
          type="text"
          className="nonsense-form__last-text"
          id="last"
          name="last"
          placeholder="OLD"
          minLength={3}
          maxLength={3}
          disabled={lastDisabled}
          autoComplete="off"
          value={lastValue}
          onChange={lastChangeHandler}
        />
      </div>
      <div className="nonsense-form__new">
        <label htmlFor="new" className="nonsense-form__new-label">
          New Word
        </label>
        <input
          type="text"
          className="nonsense-form__new-text"
          id="new"
          name="new"
          placeholder="NEW"
          value={newValue}
          disabled
        />
      </div>
      <div className={nextClass}>
        <button className="nonsense-form__next-button" id="next">
          Next
        </button>
      </div>
      <div className={nopeClass}>
        <button className="nonsense-form__nope-button" id="nope">
          Nope
        </button>
      </div>
    </form>
  );
};

export default NonsenseForm;
