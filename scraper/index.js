const P = require('./processor')
const fs = require('fs');
const store = require('./store')


const sync = async () => {
   let symbols = JSON.parse(fs.readFileSync('./symbols.json', 'utf8'));

//    let symbols = [
//        "CBA",
//         "BHP",
//         "CSL",
//         "WBC",
//         "NAB",
//         "ANZ",
//         "FMG",
//         "WES"
//     ]
   
    symbols = symbols.map((s)=>{
        return `${s}.AX`
    })

    const db = await store.database("postgresql://trader:trader@localhost:5432/ticksdb")
    const tsk = P.tasker(db)
    try {
        await db.ping()
    } catch(err) {
        console.log("Unable to connect to database:",err)
    }

    // const e = new Date()
    // const end = new Date(e).setHours(0,0,0,0)
    // const s = new Date(end)
    // const start = new Date(s.setDate(s.getDate()-7)).setHours(9,0,0,0)

    let e =new Date()
    // for one year
    for(i=0;i<53;i++) {
        let end = new Date(e).setHours(0,0,0,0)
        let s = new Date(end)
        let start = new Date(s.setDate(s.getDate()-7)).setHours(9,0,0,0)

        console.log(`=> ${new Date(start)}, ${new Date(end)}`)

        // await P.weekly(tsk, symbols, new Date(start), new Date(end))

        // for each symbol get
        for(index=0;index<symbols.length;index++) {
            console.log(symbols[index])
            await tsk.get(symbols[index], new Date(start), new Date(end))
            await new Promise(r => setTimeout(r, 1000));
        }
        e = new Date(start)
    }
    await db.end()
}

sync()
.then((r)=>{
    console.log("done")
})
.catch((err)=>{
    console.log(err)
})
