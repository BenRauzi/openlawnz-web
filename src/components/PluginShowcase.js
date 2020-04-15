import React from "react"

const PluginShowcase = props => {
  return (
    <section className="container plugins-list">   
      {props.data.map(
        ({ title, image_url, content_html, image_alt }, idx) => {
          return (
          <div key={idx} className="item">
            
            <div className="content">
            
            <h2 name={title}>{title}</h2>

            <div dangerouslySetInnerHTML={{
              __html: content_html,
            }}></div>
             {image_url && (
                <img src={image_url} alt={image_alt} />
              )}
            </div>
            
          </div>
          )
        }
      )}
      <div className="item">
        <div className="content">
         <h3>
            If you build something with our platform, get in touch and we'll list it here.
          </h3>
        </div>
      </div>
    </section>
  )
}

export default PluginShowcase
