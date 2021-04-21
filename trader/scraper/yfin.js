const requestPromise = require('request-promise')
const rp = require('request-promise')
const R = require('ramda')
const MaxDaysForMinInterval = 7

const baseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart'

const request = async (symbol, interval, startTimestamp, endTimestamp) => {
    //https://query1.finance.yahoo.com/v8/finance/
    //chart/XRO.AX?period1=1617580856&period2=1618099256&interval=1m&events=history&includeAdjustedClose=true
    const url = `${baseUrl}/${symbol}?period1=${startTimestamp}&period2=${endTimestamp}&interval=${interval}&events=history&includeAdjustedClose=true`
    return await rp(url)
   
}

const parseResponse = (r) => {
    const response = JSON.parse(r)
    const result = R.path(['chart','result',0], response)
    if(R.isEmpty(result)) {
        throw new Error("Empty response received")
    }
    const value = { 
        'symbol': R.path(['meta','symbol'], result), 
        'ts': result.timestamp,
        'volume': R.path(['indicators','quote',0,'volume'], result),
        'high': R.path(['indicators','quote',0,'high'], result), 
        'close': R.path(['indicators','quote',0,'close'], result),
        'low': R.path(['indicators','quote',0,'low'], result), 
        'open': R.path(['indicators','quote',0,'open'], result)
    }
    const empties = Object.entries(value).reduce((acc,[key, val])=>{
        if(R.isEmpty(val)) {
            acc.push(key)
        }
        return acc
    }, [])

    if(empties.length > 0) {
        throw new Error(`Invalid data received ${empties} are empty`)
    }
    return value
}


// assumptions:
// start date time, time starts at 9
// end date time, time ends at 12 am, or less
const tickTradesMinutes = async(symbol,startDateTime,endDateTime) => {
    if(msToDays(endDateTime - startDateTime) > MaxDaysForMinInterval) {
        throw new Error("cannot be greater than 7 days")
    }
    const start = startDateTime.getTime()
    const end = endDateTime.getTime()
    const response = await request(symbol,'1m',Math.floor(start/1000),Math.floor(end/1000))
    return parseResponse(response)
}

module.exports = {
    tickTradesMinutes
}

/*
const test = async () => {

    var e = new Date()
    const end = new Date(e).setHours(0,0,0,0)
    const s = new Date(end)
    const start = new Date(s.setDate(s.getDate()-7)).setHours(9,0,0,0)
    try {
        const response = await request('XRO.AX','1m',Math.floor(start/1000),Math.floor(end/1000))
        console.log(response)
        //return parseResponse(response)
    } catch(err) {
        throw new Error(`Faild to make request. Error: ${err}`)
    }   
}

test().catch((err)=>{
    console.log(err)
})
*/
