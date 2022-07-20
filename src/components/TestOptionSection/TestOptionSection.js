import styles from "./TestOptionSection.module.scss";
import TestPickerTransition from "../../layouts/TestPickerLayout/TestPickerTransition";
import { TestOptionsList } from "../../components";

const TestOptionSection = ({ parameter, testKey, onOptionChangedCallback }) => {
  const { name, letterMasks, activeOptionIndex, options, testOptionIndex } =
    parameter;

  const onOptionSelectCallback = (optionIndex) => {
    if (typeof onOptionChangedCallback === "function") {
      const clonedParameter = Object.assign({}, parameter);
      clonedParameter.activeOptionIndex = optionIndex;
      clonedParameter.testKey = testKey;

      onOptionChangedCallback(clonedParameter);
    }
  };

  return (
    <TestPickerTransition entranceDelay={0.25 * (testOptionIndex + 1)}>
      <section className={styles.contentContainer}>
        <label className={`title4 ${styles.label}`}>{name}</label>
        <TestOptionsList
          activeOptionIndex={activeOptionIndex}
          options={options}
          onOptionSelectCallback={onOptionSelectCallback}
          letterMasks={letterMasks}
        />
      </section>
    </TestPickerTransition>
  );
};

export default TestOptionSection;
