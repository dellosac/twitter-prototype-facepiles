import { motion } from "framer-motion";
import CONFIG from "../../config/ComponentAnimations";

const Transition = ({
  animationConfiguration,
  isActive,
  entranceDuration = 0.3,
  exitDuration = 0.1,
  entranceDelay = 0.2,
  exitDelay = 0,
  component = "",
  children,
  entranceOnly = false,
  hasSkeletalLoading = false,
}) => {
  let a = JSON.parse(JSON.stringify(animationConfiguration));
  let showGhosts = parseInt(sessionStorage.getItem("show_ghosts"));

  if (component in CONFIG)
    for (let p in CONFIG[component])
      if (a.initial.hasOwnProperty(p)) a.initial[p] = a.initial[p] == 0 ? 1 : 0;

  if (window.showLarryEntrance) entranceDelay += 1.3;

  if (hasSkeletalLoading && showGhosts) {
    entranceDelay += 0.3;
  }

  return entranceOnly && !isActive ? (
    children
  ) : (
    <div className={`transition-wrapper ${ hasSkeletalLoading && showGhosts ? 'bones' : 'loaded'}`}>
      <motion.div
        variants={a}
        initial="initial"
        animate="animate"
        exit={null}
        transition={{
          duration: isActive ? entranceDuration : exitDuration,
          delay: isActive ? entranceDelay : exitDelay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Transition;