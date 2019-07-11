let path=require('path');
module.exports = {
    title: '',
    isProds:process.env.tz_build=='prods',
    dist:path.resolve(__dirname,'../dist'),
    resourceOutput: 'resource',
    publicPath:'/'
};