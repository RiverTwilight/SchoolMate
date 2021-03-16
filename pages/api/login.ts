export default (req, res) => {
	res.status(200).json({ name: "John Doe" });
};

const generateToken = ({
    name, tel
}): string => {
    return ''
}