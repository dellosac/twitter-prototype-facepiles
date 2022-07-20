import { motion } from "framer-motion";

const ANIMATION_CONFIG = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const TestPickerPageTransition = ({
  entranceDuration = 0.3,
  entranceDelay = 0.2,
  children,
}) => {
  return (
    <motion.div
      className="transition"
      variants={ANIMATION_CONFIG}
      initial="initial"
      animate="animate"
      exit={null}
      transition={{
        duration: entranceDuration,
        delay: entranceDelay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TestPickerPageTransition;
