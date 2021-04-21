const yfin = require('./yfin')

const task = async (symbol, startDateTime, endDateTime) => {
    const ticks = await yfin.tickTradesMinutes(symbol, startDateTime, endDateTime)    

    
}
