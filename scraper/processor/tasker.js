const yfin = require('../yfin')


const tasker = (dbInstance) => {
    const get = async (symbol, startDateTime, endDateTime) => {
        const ticks = await yfin.tickTradesMinutes(symbol, startDateTime, endDateTime)
        if(!ticks || !ticks.ts) {
            console.log(`Unable to get data for ${symbol}`)
        } else {
            await dbInstance.insertTicks(ticks)
        }
    }
    const parallelGet = async (symbols, startDateTime, endDateTime) => {
        const tasks = symbols.map((symbol)=>{
            return get(symbol,startDateTime,endDateTime)
        })
        return await Promise.all(tasks)
    }
    return {
        parallelGet,
        get
    }
}

module.exports = {
    tasker
}