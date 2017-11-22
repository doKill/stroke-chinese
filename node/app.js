let app = require("express")(),
    cheerio = require("cheerio"),
    Iconv = require("iconv-lite"),
    request = require("request"),
    async = require("async"),
    querystring = require("querystring"),
    hanzi = require('./dict');


let configs = (arr) => {
    let options = [];
    for (let i in arr) {
        let _obj = { xx: '', uni: arr[i], screenWidth: '300', bias: 'Simplified' },
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
        if (response && response.statusCode == 200) {
            let data = {
                html: body,
                detail: querystring.parse(option.body)
            }
            cb(null, data)
        } else {
            console.log(err)
        }
    })
}


app.get('/', (req, res) => {
    let params = configs(hanzi)
    async.mapLimit(params, 5, (option, cb) => {
        fetch(option, cb);
    }, (err, result) => {
        res.send(result)
    })
})

app.listen(3000, () => {
    console.log('port 3000~')
})