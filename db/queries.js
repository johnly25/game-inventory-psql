const pool = require("./pool");

exports.getAllGames = async () => {
    const { rows } = await pool.query(
        `SELECT * FROM games
        ORDER BY consoleid;
        `)
    return rows
}

exports.insertMessage = async (username, message) => {
    await pool.query("INSERT INTO messages (username, message) VALUES($1, $2)", [username, message]);
}

exports.insertGame = async (title, url, des, company, gameconsole) => {
    // console.log(url == '' ? null : url);
    await pool.query(`
        INSERT INTO games (title, description, imageurl, companyid, consoleid)
            VALUES(
                $1,
                $2,
                $3,
                (SELECT companies.id FROM companies WHERE companies.name LIKE $4 LIMIT 1),
                (SELECT consoles.id FROM consoles WHERE consoles.name LIKE $5 LIMIT 1)
                )`,
        [title,
            des == '' ? null : des,
            url == '' ? null : url,
            company == '' ? null : '%' + company + '%',
            gameconsole == '' ? null : '%' + gameconsole + '%'])
}

exports.updateGame = async (id, title, url, des, company, gameconsole) => {
    await pool.query(
        `
        UPDATE games 
        SET 
            title = $1,
            description = $2,
            imageurl = $3,
            companyid = (SELECT companies.id FROM companies WHERE companies.name LIKE $4 LIMIT 1),
            consoleid = (SELECT consoles.id FROM consoles WHERE consoles.name LIKE $5 LIMIT 1)
        WHERE id = $6
            `
        ,
        [title,
            des == '' ? null : des,
            url == '' ? null : url,
            company == '' ? null : '%' + company + '%',
            gameconsole == '' ? null : '%' + gameconsole + '%',
            id
        ])
}
exports.addCompany = async (company) => {
    await pool.query(`INSERT INTO companies (name) VALUES ($1)`, [company])
}

exports.addConsole = async (gameconsole) => {
    await pool.query(`INSERT INTO consoles (name) VALUES ($1)`, [gameconsole])
}

exports.getGame = async (id) => {
    const { rows } = await pool.query(
        `SELECT 
        title,
        imageurl,
        description,
        consoles.name as "console_name",
        companies.name as "company_name"
     FROM games
        LEFT JOIN consoles AS consoles
        ON games.consoleid = consoles.id 
        LEFT JOIN companies AS companies 
        ON games.companyid = companies.id 
        WHERE games.id = $1
    `, [id])
    return rows;
}

exports.getCompanyCount = async (company) => {
    const { rows } = await pool.query(
        `Select *, COUNT(distinct id)
        FROM companies 
        WHERE companies.name LIKE $1 
        GROUP BY id;
        `, ['%' + company + '%'])
    return rows;
}

exports.getCompany = async (company) => {
    const { rows } = await pool.query(`
        SELECT id 
        FROM companies 
        WHERE name LIKE $1
        `, ['%' + company + '%'])
    return rows
}

exports.getConsoleCount = async (gameconsole) => {
    const { rows } = await pool.query(
        `Select *, COUNT(distinct id)
        FROM consoles 
        WHERE consoles.name LIKE $1 
        GROUP BY id;
        `, ['%' + gameconsole + '%'])
    return rows;
}

exports.deleteGame = async (id) => {
    await pool.query(
        `
        DELETE FROM games WHERE id = $1
        `, [id]
    )
}

