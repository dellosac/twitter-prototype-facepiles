import styles from "./TestOptionsList.module.scss";

const TestOptionsList = ({ actionOption, options, onOptionSelectCallback, letterMasks }) => {
  return (
    <ul className={styles.TestOptionsList}>
      {options.map((option, index) => {
        const isActive = actionOption === option;
        const onClick = (e) => {
          e.preventDefault();
          onOptionSelectCallback(option);
        };
        const firstLetter = option.split('')[0];

        return (
          <li
            key={`lol-${index}`}
            className={`title3 ${styles.TestOptionsListItem} ${
              isActive ? styles.active : null
            }`}
            onClick={onClick}
          >
            {letterMasks[index].toUpperCase()}
          </li>
        );
      })}
    </ul>
  );
};

export default TestOptionsList;
