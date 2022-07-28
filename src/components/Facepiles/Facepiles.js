import { useState, useEffect } from "react";

import styles from "./Facepiles.module.scss";
import Facepile from "./partial/Facepile";
import mockDataProvider from "../../dataprovider";

import { Reorder, AnimatePresence } from "framer-motion";
import { Children } from "react";

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

const Facepiles = ({
  shouldAnimate = false,
  replies,
  direction,
  showUnreadNotification = true,
}) => {
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
    <_RootWrapper
      shouldAnimate={shouldAnimate}
      setFacepiles={setFacepiles}
      facepiles={facepiles}
      replies={replies}
      direction={direction}
    >
      {facepiles.map((facepileData, index) => {
        const tweetAccount = mockDataProvider.getAccountByHandle(
          facepileData.handle
        );

        return (
          <Facepile
            shouldAnimate={shouldAnimate}
            key={`facepile-key-${facepileData.id}`}
            facepile={facepileData}
            avatarImage={tweetAccount.avatar}
            index={index}
            total={facepiles.length - 1}
            direction={direction}
            showUnreadNotification={showUnreadNotification}
            facepileCount={facepiles.length}
          />
        );
      })}
    </_RootWrapper>
  );
};

const _RootWrapper = ({
  shouldAnimate = true,
  setFacepiles,
  facepiles,
  replies,
  direction,
  children,
}) => {
  if (!shouldAnimate) {
    return (
      <ul
        className={`${styles.facepilesroot} ${
          direction === "lefttoright"
            ? styles.directionlefttoright
            : styles.directionrighttoleft
        }`}
        style={{
          justifyContent: "flex-end",
          right:
            direction === "lefttoright"
              ? `${18 + (3 - facepiles.length) * 10}px`
              : "",
          left:
            direction === "righttoleft"
              ? `${5 + (3 - facepiles.length) * 10}px`
              : "",
        }}
      >
        {children}
      </ul>
    );
  }

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
      style={{
        justifyContent: "flex-end",
        right:
          direction === "lefttoright"
            ? `${18 + (3 - facepiles.length) * 10}px`
            : "",
        left:
          direction === "righttoleft"
            ? `${5 + (3 - facepiles.length) * 10}px`
            : "",
      }}
    >
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </Reorder.Group>
  );
};

export default Facepiles;
