let path=require('path');
module.exports = {
    title: '动漫日语300句',
    isProds:process.env.tz_build=='prods',
    dist:path.resolve(__dirname,'../dist'),
    resourceOutput: 'resource',
    publicPath:'/'
};
