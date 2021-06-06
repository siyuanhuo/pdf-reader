const connection = require('./connection.js');

const orm = {
  insertInfo(input) {
    // input form: [name, phone_number, email]
    const queryString = 
      `INSERT INTO candidate (name, number, email)
       SELECT ?,?,? FROM dual
       WHERE NOT EXISTS (
         SELECT * FROM candidate WHERE name = ?
       )`
    input.push(input[0])
    connection.query(
      queryString,
      input,
      (err, result) => {
        if (err) throw err;
      }
    )
  },

  insertAbility(name, skills) {
    // input form: name, [skill1, skill2, skill3 ...]
    const queryString = 'INSERT INTO ability (candidate_id, skill) VALUES (?,?);'
    
    var id = connection.query(
      `SELECT * FROM candidate WHERE name = '${name}';`,
      (err, result) => {
        if (err) throw err;
        var candidate_id = result[0].id;

        for (let skl of skills) {
          connection.query(
            queryString,
            [candidate_id, skl],
            (err, result) => { if (err) throw err; }
          )
        }

        return candidate_id
      }
    )
  },

  closeDB() {
    connection.end()
  }
}

module.exports = orm;