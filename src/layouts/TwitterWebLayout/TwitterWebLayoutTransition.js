import { motion } from "framer-motion";

const TwitterWebLayoutTransition = ({
  animationConfiguration,
  entranceDuration = 0.3,
  children,
}) => {
  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit={null}
      transition={{
        duration: entranceDuration,
        delay: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default TwitterWebLayoutTransition;
