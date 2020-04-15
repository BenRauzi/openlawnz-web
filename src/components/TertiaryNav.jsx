import React from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links"

const TertiaryNav = props => {
  return (
    <div className="teritary-nav">
          <ul>
              {
                  props.data.map((content, idx) => {
                      return (
                        <AnchorLink key={idx} to={(props.base.slice(0, props.base.length - 1) + "#" + content[1]).slice(1)}><li>{content[0]}</li></AnchorLink>
                      )
                  })
              }
          </ul>
      </div>
  )
}

export default TertiaryNav
