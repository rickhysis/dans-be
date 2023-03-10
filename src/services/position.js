const { Op } = require('sequelize');
const PositionModel = require('../models/position');

// pagination
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data, totalPages, currentPage };
};

async function listPosition(description = null, location = null, full_time = null, page = 0, size = 8) {
    const limit = size ? +size : size;
    const offset = page ? (page - 1) * limit : 0;
    let filter = {};

    try {
        // check if filter has set value
        // change to like condiiton
        if (description)
            filter.description = {
                [Op.like]: `%${description}%`
            };
        if (location)
            filter.location = {
                [Op.like]: `%${location}%`
            };
        // check full time condition
        if (full_time)
            filter.type = {
                [(full_time === 'true' ? Op.like : Op.notLike)]: `%Full Time`
            };

        const data = await PositionModel.findAndCountAll({ where: { ...filter }, offset, limit });

        const positions = getPagingData(data, page, limit);

        return positions;
    } catch (error) {
        console.log("ERROR :: ", error);
        throw Error(error.message);
    }
}

async function detailPosition(id) {
    try {
        // check if id exists
        const position = await PositionModel.findOne({ where: { id } });

        if (position) {

            return position;
        } else {
            throw Error('Position not found');
        }

    } catch (error) {
        console.log("ERROR :: ", error);
        throw Error(error.message);
    }
}

module.exports = {
    listPosition,
    detailPosition
};  