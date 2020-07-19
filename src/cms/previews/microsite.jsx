import React, { useState } from 'react'
import { PreviewErrorBoundary } from '.'
import { MicrositeContent } from '../../templates/microsite'

export default function MicrositesPreview(props) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  
  const { title="Title", content=[] } = props.entry.get("data").toJS()

  const wizardData = (Object.values(((props.fieldsMetaData.toJS().content?.modules || [])
                                      .wizard || {wizards: {}})
                                      .wizards))

  const handleSelect = (event) => {
    setCurrentSectionIndex(event.target.value)
  }

  const sectionSelector = ({title, modules} = {}) => {
    if(title === undefined) return {title: "Title", modules: []}
    if(modules === undefined) return {title: title, modules: []}
    return {title, modules}
  }

  return (
    <>
    <div className="section-selector"> 
      <label htmlFor="select-section">Select section:&nbsp;</label>
      {/*Changing to onBlur breaks the component*/}
      {/*eslint-disable-next-line jsx-a11y/no-onchange*/}
      <select id="select-section" onChange={handleSelect} value={currentSectionIndex}>
        {content.map(({ title }, index) => <option value={index}>{title}</option>)}
      </select>
    </div>
      
      <hr/>
      <PreviewErrorBoundary key={currentSectionIndex}>
        <MicrositeContent
          pageContext={{
            title: title || "Title",
            section: sectionSelector(content[currentSectionIndex]),
            section_headings: content.map(({ title }) => title || ''),
            wizardData: wizardData,
          }}
        />
      </PreviewErrorBoundary>
    </>
  )
}