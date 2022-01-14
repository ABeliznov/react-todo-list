const qs = require("querystring");

const stringify = (data) => {
    return JSON.stringify(data);
}


const getPostData = async (req) => {

    return new Promise((resolve, reject) => {

        try
        {
            let body = '';
            req.on('data', function (data) {
                body += data;
            });

            req.on('end', async () => {
                let post = JSON.parse(body);
                resolve(post)
            })
        } catch (e) {
            console.log('Error during POST read')
            return reject( false )
        }

    });



}



module.exports = {
    stringify,
    getPostData
}