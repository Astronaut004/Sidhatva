import slugify from 'slugify';

export default (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', { id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, }, name: { type: DataTypes.STRING(100), unique: true, allowNull: false, }, slug: { type: DataTypes.STRING(120), unique: true, allowNull: false, }, logo_url: DataTypes.STRING(500), is_active: { type: DataTypes.BOOLEAN, defaultValue: true, }, }, { tableName: 'brands', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', hooks: { beforeValidate: (brand) => { if (brand.name) { brand.slug = slugify(brand.name, { lower: true, strict: true }); } } } });
  Brand.associate = (models) => { Brand.hasMany(models.Product, { foreignKey: 'brand_id', as: 'products' }); };
  return Brand;
};