import * as React from "react";

import { TestOptionSection } from "../components";
import { Link } from "react-router-dom";
import TestPickerTransition from "../layouts/TestPickerLayout/TestPickerTransition";

import styles from "./TestPickerPage.module.scss";

const TestPickerPage = ({ activeTestOptions, onTestOptionsChanged }) => {
  const _testOptionsKeys = Object.keys(activeTestOptions);

  return (
    <React.Fragment>
      {_testOptionsKeys.map((testOptionKey, index) => {
        const parameter = activeTestOptions[testOptionKey];

        return (
          <TestOptionSection
            key={`test-option-${index}`}
            parameter={parameter}
            testKey={testOptionKey}
            onOptionChangedCallback={onTestOptionsChanged}
          />
        );
      })}
      {/* <TestPickerTransition entranceDelay={0.5}> */}
        <section className={styles.submitWrapper}>
          <Link className={styles.submitLink} to="/">
            Submit Test Changes
          </Link>
        </section>
      {/* </TestPickerTransition> */}
    </React.Fragment>
  );
};

export default TestPickerPage;
