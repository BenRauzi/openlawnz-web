import React from "react"
import format from "date-fns/format"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"


const Microsite = ({ pageContext }) => (
  <Layout>
  <SEO title={`${pageContext.title}`} description={pageContext.description} />
  <div className="home-wrapper">
    <div className="side-wrapper">
      <div className="container main">
        <h2>{pageContext.title}</h2>
        {
          pageContext.content.map(({title, paragraphs}, idx) => {
            return (
              <div key={idx}>
                 <h3 name={title}>{title}</h3>
                 {
                   paragraphs.map(({title, content_html}, idx) => {
                     return (
                        <div key={idx} className="microsite-section">
                          <h4>{title}</h4>
                          <div
                            className="microsite-paragraph"
                            dangerouslySetInnerHTML={{ __html: content_html }}
                          />
                        </div>
                     )
                     
                   })
                 }
              </div>
             
            )
          })
        }
      </div>

    </div>
    <TertiaryNav 
      base={"/microsite" + pageContext.fields.slug} 
      data={pageContext.content.map(({title}) =>  {
          return [title, title]
      })}/>
  </div>
  </Layout>
)

export default Microsite
