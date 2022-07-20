import * as React from "react";

import { TestOptionsList } from "../components";
import { Link } from "react-router-dom";
import TestPickerTransition from "../layouts/TestPickerLayout/TestPickerTransition";

import styles from "./TestPickerPage.module.scss";
import CONFIG from "../config";

const TestPickerPage = ({
  activePageLoaderOption,
  activeLottieOption,
  onLottieSelectCallback,
  onPageLoaderSelectCallback,
}) => {
  const onLottieOptionSelectCallback = (option) => {
    if (typeof onLottieSelectCallback === "function") {
      onLottieSelectCallback(option);
    }
  };

  const onPagerLoaderOptionSelectCallback = (option) => {
    if (typeof onLottieSelectCallback === "function") {
      onPageLoaderSelectCallback(option);
    }
  };

  const lottieOptions = Object.keys(CONFIG.LOTTIE_OPTIONS);
  const pageLoaderOptions = Object.keys(CONFIG.PAGE_LOADER_OPTIONS);

  return (
    <React.Fragment>
      <TestPickerTransition entranceDelay={0.25}>
        <section className={styles.contentContainer}>
          <label className={`title4 ${styles.label}`}>Parameter A</label>
          <TestOptionsList
            actionOption={activeLottieOption}
            options={lottieOptions}
            onOptionSelectCallback={onLottieOptionSelectCallback}
            letterMasks={['a', 'b', 'c', 'd']}
          />
        </section>
      </TestPickerTransition>
      <TestPickerTransition entranceDelay={0.4}>
        <section className={styles.contentContainer}>
          <label className={`title4 ${styles.label}`}>Parameter B</label>
          <TestOptionsList
            actionOption={activePageLoaderOption}
            options={pageLoaderOptions}
            onOptionSelectCallback={onPagerLoaderOptionSelectCallback}
            letterMasks={['w', 'x', 'y', 'z']}
          />
        </section>
      </TestPickerTransition>
      <TestPickerTransition entranceDelay={0.5}>
        <Link className={styles.submitLink} to="/">
          Submit Test Changes
        </Link>
      </TestPickerTransition>
    </React.Fragment>
  );
};

export default TestPickerPage;
