const GhostPageLoader = {
  initial: { opacity: 0, translateY: 10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 10 },
  delayFactor: 0.05
};

export default GhostPageLoader;
