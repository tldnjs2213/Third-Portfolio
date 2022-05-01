module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "foods",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            image: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_new: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
                allowNull: false,
            },
            is_big: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
                allowNull: false,
            },
            is_fav: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );
};