const StaticItem = ({ src }) => {
  return (
    <img
      srcSet={`${src}.png, ${src}@2x.png 2x, ${src}@3x.png 3x`}
      src={`${src}.png`}
      loading={"eager"}
    />
  );
};

export default StaticItem;
