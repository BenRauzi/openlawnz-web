import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchContainer from "../components/SearchContainer.jsx"
import Mission from "../components/Mission.jsx"
import InfoCard from "../components/InfoCard.jsx"
import InfoCardUnit from "../components/InfoCardUnit.jsx"
import ContactUs from "../components/ContactUs.jsx"
import NewsSpotlight from "../components/NewsSpotlight"

import { AnchorLink } from "gatsby-plugin-anchor-links"


const HomePage = ({ data }) => {
  const newsSpotlightData = data.allNewsJson.edges
    .map(n => n.node)
    .map(n => ({ ...n, slug: n.fields.slug }))
    .sort((a,b) => {
      return +new Date(b.date) - +new Date(a.date)
    })
    
  return (
    <Layout>
      <SEO title="Welcome" />
      <InfoCard>
          <InfoCardUnit one="30,141" two="CASES" />
          <div className="border"></div>
          <InfoCardUnit one="25,208" two="CASE-TO-CASE RELATIONSHIPS" />
          <div className="border"></div>
          <InfoCardUnit one="346,395" two="CASE-TO-LEGISLATION RELATIONSHIPS" />
      </InfoCard>

      <div className="home-wrapper">
        <Mission />
        <NewsSpotlight data={newsSpotlightData} />
        <ContactUs />
      </div>
    </Layout>
  )
}

export const newsQuery = graphql`
  query NewsQuery {
    allNewsJson {
      edges {
        node {
          fields {
            slug
          }
          date
          title
          summary
          image_url
          image_alt
        }
      }
    }
  }
`

export default HomePage
