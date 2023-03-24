const path = require(`path`);

const templatePath = path.resolve(`./src/templates/blog-graphql.js`);

exports.createPages = async ({
  actions: { createPage },
  graphql,
  reporter,
}) => {
  const result = await graphql(`
    {
      allSanityBlog(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            blogTitle
            id
            content
            slug {
              current
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const allBlogs = result.data.allSanityBlog.edges || [];
  allBlogs.map((edge, index) => {
    const blog = edge.node;
    const path = `/blogs/${blog.slug.current}`;
    createPage({
      path,
      component: templatePath,
      context: {
        slug: blog.slug.current,
        id: blog.id,
      },
    });
  });
};
