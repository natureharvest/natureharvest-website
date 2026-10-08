import jwt from "jsonwebtoken";

// const createToken = (id) => {
//     return jwt.sign({id},process.env.JWT_SECRET);
// }

const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            return res.json({
                success:true,
                message:"Admin login successFul",
                token,
            });
        }  else {
            return res.json({success:false,message:"Invalid email or password"});
        }
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}

export default adminLogin