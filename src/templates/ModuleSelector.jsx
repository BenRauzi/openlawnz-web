import React from "react";

import slugify from "slugify";

import { Card } from "../components"


import styles from "./styles/content.module.scss"

// Selects module from a list of modules loaded from the CMS

const ModuleSelector = ({module}) => {

    const { title, type, content } = module
    const slug = slugify(title)

    const errorModule = (message) => (
        <div className={styles.text}>
            <h2>{message}</h2>
            <p>{message}</p>
        </div>
    )

    if (title === undefined) return (
        <div className={styles.text}>
            <h2>Error</h2>
            <p>Error: Module not found.</p>
        </div>
    )
    
    switch(type) {
        case "text":
            return (
                <div className={styles.text}>
                    <h2>{title}</h2>
                    {
                        content.map(({content_html}, idx) => 
                            <p 
                                key={idx} 
                                dangerouslySetInnerHTML={{__html: content_html}}
                            />
                        )
                    }
                </div>
            )
        case "directors":
            return (
                <div className={styles.directors}>
                    {
                        content.map(({name, image_url, content_html}, idx) => (
                            <Card.Avatar
                                key={idx}
                                title={name}
                                content={content_html}
                                imgSrc={image_url}
                            />
                        ))
                    }
                </div>
            )
        default:
            return errorModule("Module type not found")
    }
}

export default ModuleSelector;