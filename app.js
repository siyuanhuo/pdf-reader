const pdfjs = require("pdfjs-dist/es5/build/pdf")
const WordExtractor = require("word-extractor"); 

const url = "./asset/resume.docx"

const extractor = new WordExtractor();
const extracted = extractor.extract(url);

extracted.then(function(doc) { 
  const body = doc.getBody();
  // extract content from document
  // console.log(body)
  // console.log(typeof(body))



  function getParagraphs(text) {
    // take whole content => split into paragraphs => return list of paragraphs
    const paragraphs = text.split(/\n *\n+/)
    return paragraphs
  }

  function getInfo(paragraph) {
    // take first paragraph => get name, phone number and email => store into database
    const sections = paragraph.split(/\||\n/)
    let name = sections[0].trim()
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
    console.log(`name:${name}, number:${phone}, email:${email}`)
    // store to database, code here:
  }

  function getSkills(paragraphs) {
    // take list of paragraphs => locate skill section => gather skills => store into database
    let skills = []
    for(let i = 1; i < paragraphs.length; i++) {
      let a = paragraphs[i].trim().split(/\n/)
      if(a[0] === 'SKILLS') {
        for (let j = 1; j < a.length; j++) {
          let subSkill = a[i].replace(/.+: */, '').trim().split(',')
          skills = skills.concat(subSkill)
        }
      }
    }
    skills.map(function(skl) {
      skl = skl.trim()
    })
    // store to database, code here:
  }

  const paragraphs = getParagraphs(body)
});