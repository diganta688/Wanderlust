const User = require("../models/user");

module.exports.getsignup = (req, res)=>{
    res.render("user/signup.ejs");
}

module.exports.postsignup = async(req, res)=>{
    try{
        let{username, email, password} = req.body;
        const newuser = new User({email, username});    
        await User.register(newuser, password);
        req.login(newuser, (err)=>{
            if(err){
                return next(err);
            };
            req.flash("success", "welcome Back")
            res.redirect("/hotels");
            
        })
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


module.exports.getlogin = (req, res)=>{
    res.render("user/login.ejs");
};

module.exports.postlogin = async(req, res)=>{
    req.flash("success", "welcome Back");
    let redirecturl = res.locals.redirectUrl || "/hotels";
    res.redirect(redirecturl);
};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "logout successful");
        res.redirect("/hotels");
    });
};