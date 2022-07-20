import styles from "./TestOptionsList.module.scss";

const TestOptionsList = ({ activeOptionIndex, options, onOptionSelectCallback, letterMasks }) => {
  return (
    <ul className={styles.TestOptionsList}>
      {options.map((option, index) => {
        const isActive = index === activeOptionIndex;
        const onClick = (e) => {
          e.preventDefault();
          onOptionSelectCallback(index);
        };

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
