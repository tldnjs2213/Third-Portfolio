var express = require('express');
var router = express.Router();
const Category = require("../models").Category;
const Food = require("../models").Food;
const Option = require("../models").Option;

router.get('/', async (req, res, next)  => {
    try {
        const categories = await Category.findAll();

        res.send({ categories });
    } catch (err) {
        res.status(500).send({ message: err.message || "error" });
    }
});

router.get('/:categoryId', async (req, res, next)  => {
    const { categoryId } = req.params;

    try {
        const where = categoryId === "1"
        ? { is_new : 1 }
        : { category_id: categoryId };

        const foods = await Food.findAll({
            where,
            order: [
                ['is_fav', 'DESC'],
                ['id', 'ASC'],
            ],
        });
        const options = await Option.findAll();

        res.send({ foods, options });
    } catch (err) {
        res.status(500).send({ message: err.message || "error" });
    }
});

module.exports = router;
