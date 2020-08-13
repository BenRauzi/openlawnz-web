import { init } from "netlify-cms-app"

// import { init, registerWidget, registerPreviewTemplate } from "netlify-cms-app"
// import { NextStepControl } from "./widgets/NextStep"
// import * as previews from "./previews"
// import MicrositesPreview from "./previews/microsite"
// import CasesControl from "./widgets/CasesControl"

window.CMS_MANUAL_INIT = true

const { GATSBY_BRANCH } = process.env

const title = { label: "Title", name: "title" }
const heading = { label: "Heading", name: "title" }
const description = { label: "Description", name: "description", widget: "markdown"}

const text = { label: "Text", name: "text", summary: "{{title}} (Text)", fields: [
  title,
  { label: "Text", name: "content", widget: "list", fields: [
    { label: "Summary", name: "title", hint: "This will not appear on the page"},
    { name: "content_html", label: "Content", widget: "markdown"}
  ]}
]}

const contributorsList = { label: "Contributors List", name: "contributors", summary: "{{title}} (Contributors)", fields: [
  heading,
  { label: "Contributors", name: "content", widget: "list", fields: [
    { label: "Name", name: "title"},
    { label: "Image", name: "content_html", widget: "image", media_library: {config: {multiple: false}}}
  ]}
]}
const directors = { label: "Directors List", name: "directors", summary: "{{title}} (Directors)", fields: [
  heading,
  { label: "Directors", name: "content", widget: "list", fields: [
    { label: "Name", name: "name" },
    { label: "Bio", name: "content_html", widget: "markdown" },
    { label: "Image", name: "image_url", widget: "image"}
  ]}
]}

const checklist = { label: "Checklist", name: "checklist", summary: "{{title}} (Checklist)", fields: [
  heading,
  { label: "Checklist Items", label_singular: "Checklist Item", name: "content", widget: "list", fields: [
    title,
    { label: "Sub Items", label_singular: "Sub Item", name: "subitems", widget: "list", fields: [
      title,
      { label: "Content", name: "content"}
    ]}
  ]}
]}

const accordion = { label: "Accordion", name: "accordion", summary: "{{title}} (Accordion)", fields: [
  title,
  { label: "Items", label_singular: "Item", name: "content", widget: "list", fields: [
    { label: "Heading", name: "question" },
    { label: "Content", name: "content", widget: "text"}
  ]}
]}

const wizard = { label: "Wizard", name: "wizard", summary: "{{title}} (Wizard)", fields: [
  title,
  { label: "Select Wizard", widget: "relation", collection: "wizards", searchFields: ["title"], valueField: "key", displayFields: ["title"]},
]}

const caseList = { label: "Case List", name: "case_list", fields: [
  title,
  { label: "Cases", label_singular: "Case", name: "cases", widget: "case_list"}
]}

const modules = { label: "Modules", label_singular: "Module", name: "modules", widget: "list", types: [
  text,
  contributorsList,
  directors,
  checklist,
  accordion,
  wizard,
  caseList,
]}


const labelImage = {
  label: "Image",
  name: "image_url",
  widget: "image",
  media_library: {config: {multiple: false}}
}

const ourMission = {
  label: "Our Mission", 
  name: "ourMission", 
  folder: "content/our-mission", 
  extension: "json",
  create: true, 
  fields: [
    title,
    description,
    modules
  ]
}

const getEmpowered = {
  label: "Get Empowered", 
  name: "getEmpowered", 
  folder: "content/get-empowered", 
  extension: "json",
  create: true, 
  fields: [
    title,
    description,
    labelImage,
    modules
  ]
}

const getInvolved = {
  label: "Get Involved", 
  name: "getInvolved", 
  folder: "content/get-involved", 
  extension: "json",
  create: true, 
  fields: [
    title,
    description,
    labelImage,
    modules
  ]
}


const sections = {
  label: "Sections",
  label_singular: "Section",
  name: "content",
  widget: "list",
  fields: [
    title,
    modules
  ]
}

const microsites = {
  label: "Microsites",
  label_singular: "Microsite",
  name: "microsites",
  folder: "content/microsites",
  extension: "json",
  create: true,
  fields: [
    title, 
    description,
    labelImage,
    sections
  ]
}

const news = {
  label: "News",
  label_singular: "News Item",
  name: "news",
  folder: "content/news",
  extension: "json",
  fields: [
    title,
    { Label: "Summary", name: "summary" },
    { name: "content_html", label: "Content", widget: "markdown"},
    labelImage,
    { label: "Image Alt", name: "image_alt"},
    { label: "Date Posted", name: "data", widget: "datetime"}
  ]
}

const wizardPattern = {
  pattern: ['[a-z0-9_]+', "Only lower case letters, numbers and underscores can be used"],
  hint: "The unique key for this step. Once created, do not change this. Only lower case letters, numbers and underscores can be used."
}
const wizardKey = {
  label: "Key", 
  name: "key", 
  ...wizardPattern
}
const wizards = {
  label: "Wizards",
  label_singular: "Wizard",
  name: "wizard",
  folder: "content/wizard",
  extension: "json",
  create: true,
  fields: [
    title,
    wizardKey,
    { label: "Question", name: "question", widget: "text"},
    { label: "Options", label_singular: "Option", name: "options", summary: "{{label}}", widget: "list", types: [
      { label: "Leaf Option", name: "leaf_option", summary: "{{label}} (Leaf)", fields: [
        { label: "Label", name: "label" },
        { label: "Value", name: "value", ...wizardPattern },
        { label: "Content", name: "content", widget: "markdown"},
        { label: "Tooltip", name: "tooltip", widget: "text", required: false}
      ]},
      { label: "Branch Option", name: "branch_option", summary: "{{label}} (Branch)", fields: [
        { label: "Label", name: "label"},
        { label: "Value", name: "value", ...wizardPattern},
        { label: "Next Step", name: "next", widget: "wizard_option_next"},
        { label: "Tooltip", name: "tooltip", widget: "text", required: false},
      ]}
    ]}
  ]
}

const config = {
  backend: {
    name: "git-gateway",
    repo: "openlawnz/openlawnz-web",
    branch: GATSBY_BRANCH || "master",
  },
  collections: [
    ourMission,
    getEmpowered,
    getInvolved,
    microsites,
    news,
    wizards,
  ],
  media_folder: "static/assets",
  public_folder: "/assets",
  publish_mode: "editorial_workflow",
  local_backend: true,
}

init({ config })

// registerWidget("wizard_option_next_step", NextStepControl)
// registerWidget("case_list", CasesControl)

// registerPreviewTemplate("news", previews.newsPreview)
// registerPreviewTemplate("getInvolved", previews.getInvolvedPreview)
// registerPreviewTemplate("ourMission", previews.ourMissionPreview)
// registerPreviewTemplate("microsites", MicrositesPreview)
// registerPreviewTemplate("wizards", previews.wizardPreview)
