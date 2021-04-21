const msToUnixTs = (x) => Math.floor(x/1000)
const msToDays = (n) => Math.round(n/1000/60/60/24)

const divideSteps = (startDateTime, endDateTime, increment) => {
    var start = startDateTime.getTime()
    var end = endDateTime.getTime()
    const steps = []
    while(end > start) {
        if (msToDays(end - start) > increment) {
            const x = new Date(end)
            start = x.setDate(x.getDate()-increment)
        }
        steps.push({
            end: msToUnixTs(end),
            start: msToUnixTs(start),
        })
        end = start
        start = startDateTime.getTime()
    }
    return steps
}

module.exports = {
    msToDays,
    msToUnixTs,
    divideSteps
}

