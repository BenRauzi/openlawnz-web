import React from "react"
import { Link } from "gatsby"

import Logo from "../images/svgs/openlaw-logo.svg"
import External from "../images/svgs/external.svg"
import SearchContainer from "./SearchContainer"


const MainNav = () => {
  return (
    <header role="banner" className="nav-container">
      <div className="nav-items">
        <div className="nav-logo">
          <Link to="/">
            <span className="visuallyhidden">OpenLaw NZ</span>
            <Logo alt="OpenLaw NZ" className="main-logo" />
          </Link>
        </div>
        <div className="nav-search">
          <SearchContainer/>
        </div>
        <div className="nav-menu">
          <nav>
            <ul>
              <Link activeClassName="link-active" to="/"><li>Our Mission</li></Link>
              <Link to="/empower" activeClassName="link-active"><li>Get Empowered</li></Link>
              <Link to="/about" activeClassName="link-active"><li>Get Involved</li></Link>
              <Link activeClassName="link-active" to="/news"><li>Blog</li></Link>
            </ul>
          </nav>
          <div className="nav-secondary">
          <ul>
              <a href="https://donorbox.org/openlaw-nz-3"><li>Support Us</li></a>
              <Link to="/developers"><li>Developers</li></Link>
              <Link to="/plugins"><li>Plugins</li></Link>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainNav
