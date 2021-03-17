import sha256 from "crypto-js/sha256"

export default (req, res) => {
    res.status(200).json({ name: "John Doe" });
};

const generateToken = ({
    name, tel
}): string => {
    return sha256(name + tel)
}