import { useState, useEffect } from "react";

import styles from "./Facepiles.module.scss";
import Facepile from "./partial/Facepile";
import mockDataProvider from "../../dataprovider";

import { Reorder, AnimatePresence } from "framer-motion";

const FACE_ACCOUNTS_MOCK = [
  {
    avatarImage: "/images/accounts/rihanna",
    unread: false,
  },
  {
    avatarImage: "/images/accounts/h_wang84",
    unread: false,
  },
  {
    avatarImage: "/images/accounts/kay_tee_oh",
    unread: false,
  },
  {
    avatarImage: "/images/accounts/machodocomida",
    unread: false,
  },
];

const Facepiles = ({ replies, direction }) => {
  const [faceIndex, setFaceIndex] = useState(1);
  const [facepiles, setFacepiles] = useState(replies);

  useEffect(() => {
    let clonedFacepiles = [...replies];
    while (clonedFacepiles.length >= 4) {
      clonedFacepiles.shift();
    }
    setFacepiles(clonedFacepiles);
  }, [replies]);

  const facePilesOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let newIndex = faceIndex + 1;
    setFaceIndex(newIndex >= FACE_ACCOUNTS_MOCK.length ? 0 : newIndex);

    const nextItem = FACE_ACCOUNTS_MOCK[faceIndex];

    let clonedFacepiles = [...facepiles, nextItem];
    if (clonedFacepiles.length >= 4) {
      clonedFacepiles.shift();
    }
    setFacepiles(clonedFacepiles);
  };

  return (
    <Reorder.Group
      as="ul"
      axis="x"
      onReorder={setFacepiles}
      className={`${styles.facepilesroot} ${
        direction === "lefttoright"
          ? styles.directionlefttoright
          : styles.directionrighttoleft
      }`}
      values={replies}
      // onClick={facePilesOnClick}
      style={{
        transform: `translateX(${21 - 5 * (facepiles.length - 1)}px)`,
      }}
    >
      {/* <ul className={styles.facepilesroot} > */}
      <AnimatePresence initial={false}>
        {facepiles.map((facepileData, index) => {
          const tweetAccount = mockDataProvider.getAccountByHandle(
            facepileData.handle
          );

          return (
            <Facepile
              key={`facepile-key-${facepileData.id}`}
              facepile={facepileData}
              avatarImage={tweetAccount.avatar}
              index={index}
              total={facepiles.length - 1}
              direction={direction}
            />
          );
        })}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default Facepiles;
