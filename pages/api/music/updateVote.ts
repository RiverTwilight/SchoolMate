export default (req, res) => {
    res.status(200).json({
        message: "投票已结束",
        code: 200
    });
};

