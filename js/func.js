
let funcs = {
    render: {
        index: async () => {
            return {title:'audio server', text: 'in progress'}
        },
    },
    db: {
        get: async (dbName) => {
            let db = new sqlite3.Database(APP_ROOT + '/db/base.db');
            let data = await db.all(`SELECT * FROM test;`);
            db.close();
            return data
        },
    }
}
module.exports = funcs;