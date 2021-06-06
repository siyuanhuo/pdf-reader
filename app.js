const WordExtractor = require("word-extractor"); 
const { closeDB } = require("./config/orm");

const orm = require('./config/orm')

const url = "./asset/resume.docx"

const extractor = new WordExtractor();
const extracted = extractor.extract(url);

extracted.then(async function(doc) { 
  const body = doc.getBody();
  // extract content from document

  function getParagraphs(text) {
    // take whole content => split into paragraphs => return list of paragraphs
    const paragraphs = text.split(/\n *\n+/)
    return paragraphs
  }

  var name
  async function getInfo(paragraph) {
    // take first paragraph => get name, phone number and email => store into database
    const sections = paragraph.split(/\||\n/)
    name = sections[0].trim()
    let phone, email

    for (let i = 1; i < sections.length; i++) {
      let a = sections[i].trim().split(/ *: */)
      switch (a[0].toLowerCase()) {
        case 'phone':
          phone = a[1].trim()
          break;
        case 'email':
          email = a[1].trim()
      }
    }

    // store to database, code here:
    orm.insertInfo([name, phone, email])
  }

  async function getSkills(paragraphs) {
    // take list of paragraphs => locate skill section => gather skills => store into database
    let skills = []
    for(let i = 1; i < paragraphs.length; i++) {
      let lines = paragraphs[i].trim().split(/\n/)
      if(lines[0] === 'SKILLS') {
        for (let j = 1; j < lines.length; j++) {
          let subSkill = lines[j].replace(/.+: */, '').trim().split(',')
          skills = skills.concat(subSkill)
        }
      }
    }
    let list = []
    skills.map(function(skl) {
      list.push(skl.trim())
    })
    // store to database, code here:
    orm.insertAbility(name, list)
  }

  const paragraphs = getParagraphs(body)
  await getInfo(paragraphs[0])
  await getSkills(paragraphs)

  // closeDB()
});