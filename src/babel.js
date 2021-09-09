async function start() {
    return await Promise.resolve('async is working')
}

class Util {
    static id = Date.now()
}

const unused = 42


console.log('Util id:', Util.id)
console.log(unused)
start().then(console.log)