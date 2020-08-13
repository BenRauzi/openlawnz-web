import React from 'react'

import ModuleSelector from "./ModuleSelector"
import { Layout } from "../components"
import { Article, SideMenu } from "../components"


import styles from "./styles/content.module.scss"


const ourMissionPage = ({pageContext}) => {
    const {title, description, modules, menuData} = pageContext;
    return (
        <Layout className={styles.page}>
            <Layout.Twos>
                <Layout.Left>
                    <Article>
                        <Article.Title>{title}</Article.Title>
                        <Article.Content> <p>{description}</p></Article.Content>
                    </Article>
                    
                    {
                        modules.map((module, idx) => (
                            <ModuleSelector module={module} key={idx}></ModuleSelector>
                        ))
                    }
                </Layout.Left>
                <Layout.Right>
                    <SideMenu menuData={menuData}/>
                </Layout.Right>
            </Layout.Twos>
        </Layout>
    )
}

export default ourMissionPage;