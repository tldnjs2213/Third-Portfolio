module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "options",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );
};