module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: true,
                //allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            underscored: true,
        }
    );
};