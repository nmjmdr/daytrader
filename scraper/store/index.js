const utils = require('./utils')

const pgp = require('pg-promise')({
    capSQL: true
})


const database = (connectionString) => {
    const db = pgp(cn)
    const cs = new pgp.helpers.ColumnSet(['symbol', 'ts', 'open', 'high', 'low', 'close', 'volume'], {table: 'ticks'});
    return {
        insertTicks: async (ticks) => {
            const records = utils.recordize(ticks)
            const query = pgp.helpers.insert(records,cs)
            await db.none(query)
        }
    }
}

module.exports = {
    database
}
