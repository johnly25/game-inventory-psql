const createTable =
`
DROP TABLE IF EXISTS games, consoles, companies;
CREATE TABLE IF NOT EXISTS games(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT not null,
    description TEXT,
    imageurl TEXT,
    consoleid INTEGER,
    companyid INTEGER
);

CREATE TABLE IF NOT EXISTS consoles(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT not null
);

CREATE TABLE IF NOT EXISTS companies(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT not null
);

ALTER TABLE games  
    ADD FOREIGN KEY (consoleid) references consoles(id),
    ADD FOREIGN KEY (companyid) references companies(id);
`

const populate =
`
INSERT INTO companies (name)
    VALUES ('Nintendo');

INSERT INTO consoles (name)
    VALUES
        ('Nintendo Switch'),
        ('Nintendo 3DS');

INSERT INTO games (title, imageurl, consoleid, companyid)
    VALUES 
        ('Fire Emblem Engage', 'https://m.media-amazon.com/images/I/81JJ-9rB0vL._AC_UF1000,1000_QL80_.jpg', (SELECT id FROM consoles WHERE name = 'Nintendo Switch'), (SELECT id FROM companies WHERE name = 'Nintendo')),
        ('Fire Emblem: Three Houses', 'https://m.media-amazon.com/images/I/817KFp1wiOL._AC_UF1000,1000_QL80_.jpg', (SELECT id FROM consoles WHERE name = 'Nintendo Switch'), (SELECT id FROM companies WHERE name = 'Nintendo')),
        ('Fire Emblem Warriors: Three Hopes','https://m.media-amazon.com/images/I/81B09cs6pGL.jpg', (SELECT id FROM consoles WHERE name = 'Nintendo Switch'), (SELECT id FROM companies WHERE name = 'Nintendo')),
        ('Fire Emblem: Awakening','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNA7KrxSnfDS50ZW4aTFPpVneKvztbZjtvA&s', (SELECT id FROM consoles WHERE name = 'Nintendo 3DS'), (SELECT id FROM companies WHERE name = 'Nintendo')),
        ('Fire Emblem Fates: Conquest','https://m.media-amazon.com/images/I/71WLosVgUAL._AC_UF1000,1000_QL80_.jpg', (SELECT id FROM consoles WHERE name = 'Nintendo 3DS'), (SELECT id FROM companies WHERE name = 'Nintendo')),
        ('Fire Emblem Fates: Birthright','https://m.media-amazon.com/images/I/71lqKauVJ2L.jpg', (SELECT id FROM consoles WHERE name = 'Nintendo 3DS'), (SELECT id FROM companies WHERE name = 'Nintendo')),
        ('Fire Emblem Fates: Special Edition','https://assets2.ignimgs.com/2015/08/03/fire-emblem-fates-button-03jpg-434ea3.jpg', (SELECT id FROM consoles WHERE name = 'Nintendo 3DS'), (SELECT id FROM companies WHERE name = 'Nintendo')),
        ('Fire Emblem Fates: Revelation','https://i.redd.it/fal7kp5aoni81.jpg', (SELECT id FROM consoles WHERE name = 'Nintendo 3DS'), (SELECT id FROM companies WHERE name = 'Nintendo'));  
`

module.exports = { createTable, populate };