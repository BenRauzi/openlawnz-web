import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import SearchContainer from "../components/SearchContainer.jsx"
import InfoCard from "../components/InfoCard.jsx"
import { AnchorLink } from "gatsby-plugin-anchor-links"
import {Link} from "gatsby"
import TertiaryNav from "../components/TertiaryNav.jsx"
//import External from "../images/svgs/external.svg"
// Having an issue with this will come back to it later.

const EmpowerPage = ({ data }) => {
    const micrositeData = data.allMicrositesJson.edges.map(n => n.node)
  return (
    <Layout>
        <SEO title="Developers" />  
        <div className="home-wrapper">  
            <div className="side-wrapper">
                <div className="container main">
                    <h2>Get Empowered</h2>

                    {
                       micrositeData.map(({title, description, fields}, idx) => {
                           return (
                               <div className="microsite-paragraph" key={idx}>
                                   <h3 name={fields.slug.slice(1)}>{title}</h3>
                                   <p>{description}</p>
                                   <Link to={"/microsite" + fields.slug}>View Site</Link>
                                </div>
                           )
                       }) 
                    }
                </div>
            </div>
            <TertiaryNav 
            base="/empower/" 
            data={micrositeData.map(({title, fields}) =>  {
                fields = fields.slug.slice(1);
                return [title, fields]
            })}/>
        </div>
        
    </Layout>
  )
}



export const empowerQuery = graphql`
  query empowerQuery {
    allMicrositesJson {
      edges {
        node {
            fields {
                slug
            }
            title
            description
        }
      }
    }
  }
`
export default EmpowerPage
