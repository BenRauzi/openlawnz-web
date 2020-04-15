import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import SearchContainer from "../components/SearchContainer.jsx"
import InfoCard from "../components/InfoCard.jsx"
//import External from "../images/svgs/external.svg"
// Having an issue with this will come back to it later.

const DevelopersPage = ({ data }) => {
  const developersContent = data.allDevelopersJson.edges.map(n => n.node)
  return (
    <Layout>
      <SEO title="Developers" />  
      <InfoCard classModifier="info-card--large info-card--title info-card--column">
          <h1>Developers</h1>
          <span>
            Use our API to integrate case law intelligence into your own
            applications.
          </span>
        </InfoCard>
      <div className="home-wrapper">
        <div className="container main">
          <div className="content" dangerouslySetInnerHTML={{
              __html: developersContent[0].content_html,
            }}>
          </div>
          
        </div>
      </div>
    </Layout>
  )
}

export const developersQuery = graphql`
  query developersQuery {
    allDevelopersJson {
      edges {
        node {
          title
          content_html
        }
      }
    }
  }
`

export default DevelopersPage
