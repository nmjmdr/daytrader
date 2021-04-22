

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
    ticks.ts.map((t,index)=>{
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


 module.exports = {
     recordize
 }