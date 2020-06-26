const router  = require('express').Router();
const User    = require('../model/User');
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation')





router.post('/register', async (req,res)=>{

    //VALIDATE BEFORE MAKING A USER
    const {error}=registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //CHECK IF USER EXISTS
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email already exists');

    //HASHING THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //CREATING NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        //SAVING USER INTO MONGODB
        const savedUser= await user.save();
        res.send({user:user._id});
    }
    catch(err){
        res.status(400).send(err);
    }

});


router.post('/login', async (req,res)=>{

    // //VALIDATE BEFORE MAKING A USER
    // const {error}=loginValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message);

    //CHECK IF USER EXISTS
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('user does not exist');

    //COMPARING THE PASSWORD
    const validPass= await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('wrong password');
    
    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id:user._id},process.env.TOKEN);
    res.header('auth-token',token).send(token);
});

module.exports  =   router;