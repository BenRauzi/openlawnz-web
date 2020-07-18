import React from "react"
import Accordion from "../components/Accordion"
import Wizard from "../components/Wizard/Wizard"
import { toSlug } from "../js/ToSlug"
import Checklist from "../components/Checklist"
import CaseList from "../components/CaseList"

const ModuleSelector = ({module, idx, wizardModuleData}) => {
    
    let title = toSlug(module.title)
    
    const errorModule = (message) => {
      return <div className="microsite-paragraph" name={title}>
        <h2 id={title}>{module.title}</h2>
        <p>Error: {message}</p>
      </div>
    }

    const blankModule = () => (
      <div id={title} className="microsite-paragraph">
        <h2>{module.title}</h2>
      </div>
    )

    if (module.title === undefined) return (
      <div className="microsite-paragraph">
        <h2>Module Title</h2>
      </div>
    )
    switch(module.type) { 
      case "text": // Single heading, multiple paragraphs.
        if (module.content === undefined) return blankModule()
        return (
          <div id={title} className="module-block">
            <h2>{module.title}</h2>
            {
              module.content.map(({content_html}, idx) => {
                return (
                  <p key={idx}
                    className="microsite-paragraph"
                    dangerouslySetInnerHTML={{ __html: content_html }}
                  />
                ) 
              })
            }
          </div>
        )

        case "card": // Single heading, multiple paragraphs.
          if (module.content === undefined) return blankModule()
          return (
            <div id={title} className="plugin-card">
              <header>{module.title}</header>
              <div className="plugin-body">
                {
                  module.content.map(({content_html}, idx) => {
                    return (
                      <p key={idx}
                        dangerouslySetInnerHTML={{ __html: content_html }}
                      />
                    ) 
                  })
                }
              </div>
            </div>
          )

        case "faqs":
          if (module.content === undefined) return blankModule()
            return (
            <div id={title}  className="module-block">
                <h2>{module.title}</h2>
                <Accordion id={`faqs-${idx}`} items={module.content.map(faq => {
                return { title: faq.question, content: faq.answer }
                })}/>
            </div>
            )

        case "contributors":
            if (module.contributors === undefined) return blankModule()
            return (
              <div id={title}>
                <h2>{module.title}</h2>
                <div className="cards-list">
                  {
                    module.contributors.map(({image_url, title}, idx) => {
                      return(
                        <div key={idx} className="card-item-small">
                          <div>
                            <img src={image_url || "/assets/avatar.png"} alt={title}/>
                            <strong>{title}</strong>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )

        case "directors":
            if (module.directors === undefined) return blankModule()
            return (
                <div id={title}>
                <h2>{module.title}</h2>
                <div className="cards-list directors">
                    {module.directors.map(({name, bio, image_url}, idx) => {
                    return (
                        <div className="card-item" key={idx}>
                        <img src={image_url} alt={name}></img>
                        <strong>{name}</strong>
                        <p>{bio}</p>
                        </div>
                    )
                    })}
                </div>
                
                </div>
            )

        case "wizard":
            // This is uncomfortably fragile but the Netlify CMS does not support auto-generated ID/key fields
            // as of 29/05/2020
            const wizardData = wizardModuleData.find(wizard => wizard.key === module.wizard)
            if (!wizardData) return errorModule("Wizard data not found")
            return (
            <div className="module-block" id={wizardData.title.replace(/\s/g, '-').toLowerCase()}>
                <Wizard title={wizardData.title} background={wizardData.background} steps={wizardData.steps} />
            </div>
            )

        case "checklist":
          if (module.content === undefined) return blankModule()
          return (
            <div key={idx} id={title} className="module-block">
              <h2>{module.title}</h2>
              <Checklist id={`checklist-${idx}`} items={module.content}/>
            </div>
          )

        case "case_list":
          if (module.cases === undefined) return blankModule()
          return (
            <div key={idx} id={title} className="module-block">
              <h2>{module.title}</h2>
              <CaseList id={`case-list-${idx}`} cases={module.cases}/>
            </div>
          )
          
        default: //Error Paragraph
            return errorModule("Module type not found")
    }
}

export default ModuleSelector
