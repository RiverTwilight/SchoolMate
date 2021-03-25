import sha256 from "crypto-js/sha256"

export default (req, res) => {
    const { name, tel } = req.query;
    
    res.status(200).json({ 
        message: "登录成功",
        token: generateToken(name, tel),
     });
};

const generateToken = (
    name: string, tel
): string => {
    return sha256(name + tel)
}