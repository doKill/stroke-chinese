let app = require("express")(),
    request = require("request"),
    async = require("async"),
    querystring = require("querystring"),
    fs = require("fs"),
    hanzi = require('./dict');

let configs = (arr) => {
    let options = [];
    for (let i in arr) {
        let _obj = { xx: '', uni: arr[i], screenWidth: '500', bias: 'Simplified' },
            option = {
                method: 'post',
                timeout: 8000,
                head: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
                    'Connection': 'keep-alive'
                },
                url: `http://www.eon.com.hk/common/fcg/estroke.fcg?task=getPhrase`,
                body: querystring.stringify(_obj)
            }
        options.push(option)
    }
    return options;
};


let fetch = (option, cb) => {
    request.post(option, (err, response, body) => {
        let data = {
            html: body,
            detail: querystring.parse(option.body)
        }
        cb(null, data)
    })
}


let params = configs(hanzi)
async.mapLimit(params, 5, (option, cb) => {
    fetch(option, cb);
}, (err, result) => {
    result = JSON.stringify(result)
    let options = { encoding: 'utf8', mode: 438, flag: 'w' };
    fs.writeFile('./data.txt', result, options, (err) => {
        if (err) console.log(err)
    })
})

app.listen(3000, () => {
    console.log('port 3000~')
})