const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('access denied');

    try{
        const verified = jwt.verify(token,process.env.TOKEN);
        req.user=verified;
        res.send(verified);
        next();
    }catch(err){
        res.status(400).send('invalid token');
    }
}