const StaticItem = ({ src, className, onClick }) => {
  return (
    <img
      className={className}
      srcSet={`${src}.png, ${src}@2x.png 2x`}
      src={`${src}.png`}
      loading={"eager"}
      onClick={onClick}
    />
  );
};

export default StaticItem;
 