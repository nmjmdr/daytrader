

/*
                                           Table "public.ticks"
 Column |          Type          | Collation | Nullable | Default | Storage  | Stats target | Description
--------+------------------------+-----------+----------+---------+----------+--------------+-------------
 symbol | character varying(100) |           |          |         | extended |              |
 ts     | integer                |           |          |         | plain    |              |
 open   | numeric                |           |          |         | main     |              |
 high   | numeric                |           |          |         | main     |              |
 low    | numeric                |           |          |         | main     |              |
 close  | numeric                |           |          |         | main     |              |
 volume | bigint                 |           |          |         | plain    |              |
 */

 const defaultTo = (d) => (x) => x == null || x == undefined ? d : x
 const defaultToNull = defaultTo(null)

 const recordize = (ticks) => {
    return ticks.ts.map((t,index)=>{
        return {
            symbol: ticks.symbol,
            ts: t,
            open: defaultToNull(ticks.open[index]),
            high: defaultToNull(ticks.high[index]),
            low: defaultToNull(ticks.low[index]),
            close: defaultToNull(ticks.close[index]),
            volume: defaultToNull(ticks.volume[index])
        }
    })
 }


 const generateValuesString = (ts, numColumns) => {
    var index = 1
    var acc = []
    for(i=0;i<ts.length;i++) {
        var line = []
        for(pos=0;pos<numColumns;pos++) {
            line.push(`${index}`)
            index = index+1
        }
        acc.push(`(${line.join(",")})`)
    }
    return acc.join(", ")
 }

 module.exports = {
     recordize,
 }