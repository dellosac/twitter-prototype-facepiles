import { Fragment } from "react";
import { useResolvedPath, useMatch } from 'react-router-dom';

const Page = ({ pageLoaderConfig, slug, children }) => {
  let resolved = useResolvedPath(slug);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Fragment>
        {children}
    </Fragment>
  );
};

export default Page;
