import { motion } from "framer-motion";

const ANIMATION_CONFIG = {
  initial: { opacity: 0, translateY: 10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 10 },
};

const TestPickerTransition = ({ entranceDelay, children }) => {

  return (
    <motion.div
      className="transition"
      variants={ANIMATION_CONFIG}
      initial="initial"
      animate="animate"
      exit={null}
      transition={{
        duration: 0.3,
        delay: entranceDelay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TestPickerTransition;
