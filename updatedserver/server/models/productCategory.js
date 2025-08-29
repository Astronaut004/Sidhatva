import slugify from 'slugify';

export default (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    'ProductCategory',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      seo_title: {
        type: DataTypes.STRING(200), // Added to match table
      },
      created_by: {
        type: DataTypes.BIGINT, // Added to match table
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
    },
    {
      tableName: 'product_categories',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeValidate: (category) => {
          if (category.name) {
            category.slug = slugify(category.name, { lower: true, strict: true });
          }
        },
      },
    }
  );

  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Product, {
      foreignKey: 'category_id',
      as: 'products',
    });
    ProductCategory.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'creator',
    });
  };

  return ProductCategory;
};
