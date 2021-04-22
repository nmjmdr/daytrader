const yfin = require('./yfin')

const tasker = (dbInstance) => {
    return {
        task: async (symbol, startDateTime, endDateTime) => {
            const ticks = await yfin.tickTradesMinutes(symbol, startDateTime, endDateTime)
            await dbInstance.insertTicks(ticks)
        }
    }
}

module.exports = {
    tasker
}
