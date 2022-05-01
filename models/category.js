module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "categories",
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
        },
        {
            timestamps: true,
            underscored: true,
        }
    );
};