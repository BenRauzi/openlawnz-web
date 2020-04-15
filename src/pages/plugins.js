import React from "react"
import SEO from "../components/seo"

import Layout from "../components/layout"
import SearchContainer from "../components/SearchContainer.jsx"
import InfoCard from "../components/InfoCard.jsx"
import PluginShowcase from "../components/PluginShowcase.js"
import TertiaryNav from "../components/TertiaryNav.jsx"
const PluginPage = ({ data }) => {
  
  const pluginsShowcaseData = data.allPluginsJson.edges.map(n => n.node)
  return (
  <Layout>
    <SEO title="Plugins" />
    
    <div className="home-wrapper">
      <div className="side-wrapper">
      <InfoCard classModifier="info-card--large info-card--title info-card--column">
        <h1>Plugins</h1>
        <span>These plugins are built using the OpenLaw NZ API.</span>
      </InfoCard>
      <PluginShowcase data={pluginsShowcaseData}/>
      </div>
      <TertiaryNav 
      base={"/plugins/"} 
      data={pluginsShowcaseData.map(({title}) =>  {
          return [title, title]
      })}/>
    </div>
  </Layout>
  )
}

export const pluginsQuery = graphql`
  query pluginsQuery {
    allPluginsJson {
      edges {
        node {
          title
          content_html
          image_url
          image_alt
        }
      }
    }
  }
`


export default PluginPage
