const { detailPosition, listPosition } = require("../services/position");

async function list(req, res, next) {
    const { description, location, full_time, page, size } = req.query;

    try {
        const data = await listPosition(description, location, full_time, page, size);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        console.log("ERROR :: ", error);
        res.status(500).json({
            error: error.message
        });
    }
    return next();
}

async function detail(req, res, next) {
    const { id } = req.params;

    try {

        if (!id) {
            res.status(400).json({
                error: 'Invalid ID'
            });
            return next();
        }

        const data = await detailPosition(id);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.log("ERROR :: ", error);
        res.status(500).json({
            error: error.message
        });
    }
    return next();
}


module.exports = {
    list,
    detail
};  