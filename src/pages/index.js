import * as React from "react";
import { graphql } from "gatsby";

export const query = graphql`
  query {
    allSanityBlog {
      totalCount
      nodes {
        id
        blogTitle
        content
      }
    }
  }
`;
const IndexPage = ({ data }) => {
  return (
    <div>
      <ul>
        {data.allSanityBlog.nodes.map((node) => (
          <li key={node.id}>{node.blogTitle}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
