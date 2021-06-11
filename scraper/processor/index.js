const T = require('./tasker')
const U = require('../utils')


const BatchSize = 1

const weekly = async (tasker, symbols, startDateTime, endDateTime) => {
    if(U.msToDays(endDateTime-startDateTime) > 7) {
        throw new Error("Cannot be greater than 7 days")
    }
    const batches = U.chunkify(symbols, BatchSize)
    const tasks = batches.map(async (symbols)=>{
        const result = await tasker.parallelGet(symbols, startDateTime, endDateTime)
        await new Promise(r => setTimeout(r, 2000));
        console.log(".")
        return result
    })
    await U.sequence(tasks)
}

module.exports = {
    weekly,
    tasker: T.tasker,
}