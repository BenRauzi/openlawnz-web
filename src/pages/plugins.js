import React from "react"
import SEO from "../components/seo"

import Layout from "../components/layout"
import PluginShowcase from "../components/PluginShowcase.js"
import TertiaryNav from "../components/TertiaryNav.jsx"
const PluginPage = ({ data }) => {
  
  const pluginsShowcaseData = data.allPluginsJson.edges.map(n => n.node)
  return (
  <Layout>
    <SEO title="Plugins" />
    
    <div className="side-wrapper">
    <div className="content-wrapper">
       <h1>Plugins</h1>
        <span>These plugins are built using the OpenLaw NZ API.</span>
        <PluginShowcase data={pluginsShowcaseData}/>
    </div>
      
     
    </div>
    <TertiaryNav 
      base={"/plugins/"} 
      data={pluginsShowcaseData.map(({title}) =>  {
          return [title, title]
      })}/>
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
