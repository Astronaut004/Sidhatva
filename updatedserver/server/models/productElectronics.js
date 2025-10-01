import { DataTypes } from "sequelize";

export default (sequelize) => {
    const ElectronicsProduct = sequelize.define(
        "ElectronicsProduct",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true,
                references: {
                    model: "products",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            heading: {
                type: DataTypes.STRING(255),
            },
            electric_data: {
                type: DataTypes.JSON,
            },
            optical_data: {
                type: DataTypes.JSON,
            },
            env_data: {
                type: DataTypes.JSON,
            },
            mechanical_data: {
                type: DataTypes.JSON, // { material, durability, etc. }
            },
            features: {
                type: DataTypes.TEXT,
            },
            application: {
                type: DataTypes.TEXT,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "electronics_products",
            timestamps: true,
            underscored: true,
        }
    );

    ElectronicsProduct.associate = (models) => {
        ElectronicsProduct.belongsTo(models.product, {
            foreignKey: "product_id",
            as: "product",
            onDelete: "CASCADE",
        });
    };

    return ElectronicsProduct;
};