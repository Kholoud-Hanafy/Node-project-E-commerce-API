const jwt = require('jsonwebtoken');
let{promisify} = require('util')






async function auth(req,res,next){
  let{authorization} = req.headers

  if(!authorization){
    return res.status(401).json({masseg : "unauthorizatcated yom must login first"})
  }
try{
let decoded   =await  promisify(jwt.verify)(authorization,process.env.JWT_SECRET )
req.id = decoded.data.id
req.role = decoded.data.role

next()
//console.log(decoded)
}catch(err){

    return res.status(401).json({masseg : "unauthorizatcated "})

}
    
}

 function restrictTo(...roles)
 {
  return (req, res, next)=>{

   if(!roles.includes(req.role))
   
                        {
                       //  console.log(req.role)

                        return res.status(403).json({message: `you don't have permission to acces`})
                      
                        }

                     next();
                            }

 }


module.exports ={auth,restrictTo}