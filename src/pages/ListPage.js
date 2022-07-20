import Page from "./Page";

const ListPage = ({ pageLoaderConfig, slug }) => {
  return (
    <Page slug={slug} pageLoaderConfig={pageLoaderConfig}>
      <article>
        <h1>ListPage</h1>
      </article>
    </Page>
  );
};

export default ListPage;
