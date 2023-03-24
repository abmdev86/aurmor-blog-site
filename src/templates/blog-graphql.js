import React from "react";
import { graphql } from "gatsby";

export const query = graphql`
  query ($slug: String!) {
    allSanityBlog(filter: { slug: { current: { eq: $slug } } }) {
      edges {
        node {
          blogTitle
          content
          slug {
            current
          }
        }
      }
    }
  }
`;

const Blog = ({ data }) => {
  const blog = data.allSanityBlog.edges[0].node;

  return (
    <div>
      <h1>{blog.blogTitle || "Not Found"}</h1>
    </div>
  );
};

export default Blog;
