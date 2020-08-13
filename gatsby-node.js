const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require('slugify')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
 
  const result = await graphql(`
    query PagesQuery {
      allOurMissionJson {
        nodes {
          title
          description
          modules {
            title
            type
            content {
              content_html
              image_url
              name
              title
            }
          }
        }
      }
    }
  `)

  const ourMissionData = result.data.allOurMissionJson.nodes;
  const ourMissonNav = result.data.allOurMissionJson.nodes
    .map(n => ({title: n.title, link: `/our-mission/${slugify(n.title.toLowerCase())}`}));
  
  ourMissionData.forEach(n => {
    createPage( {
      path: "/our-mission/" + slugify(n.title.toLowerCase()),
      component: require.resolve("./src/templates/our-mission-page.jsx"),
      context: {...n, menuData: ourMissonNav},
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {}


