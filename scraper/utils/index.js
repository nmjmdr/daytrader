
const R = require('ramda')
const msToUnixTs = (x) => Math.floor(x/1000)
const msToDays = (n) => Math.round(n/1000/60/60/24)


const chunkify = (xs, sz) => {
    const _c = (xs, sz, acc) => {
        if(xs.length == 0) {
            return acc
        }
        if(xs.length < sz) {
            acc.push(xs)
            return acc
        } 
        const [s, ss] = R.splitAt(sz,xs)
        acc.push(s)
        return _c(ss, sz, acc)
    }
    return _c(xs,sz,[])
}

const sequence = async (tasks) => {
    const collector = []
    const seq = async (_tasks) => {
        const [t,...ts] = _tasks
        if(!t) {
            return collector
        }
        const r = await t
        collector.push(r)
        return seq(ts)
    }
    return await seq(tasks)
}


module.exports = {
    msToDays,
    msToUnixTs,
    chunkify,
    sequence
}

