const utils = require('./utils')

const pgp = require('pg-promise')({
    capSQL: true
})


const database = (cn) => {
    const db = pgp(cn)
    const cs = new pgp.helpers.ColumnSet(['symbol', 'ts', 'open', 'high', 'low', 'close', 'volume'], {table: 'ticks'});
    return {
        insertTicks: async (ticks) => {
            const records = utils.recordize(ticks)
            const query = pgp.helpers.insert(records,cs) +
                            ' ON CONFLICT(symbol, ts) DO UPDATE SET ' +
                            cs.assignColumns({from: 'EXCLUDED'});
            await db.none(query)
        },
        ping: async() => {
            return await db.query('select 1 as pong')
        },
        end: async ()=> {
            await db.$pool.end()
        }
    }
}

module.exports = {
    database
}
