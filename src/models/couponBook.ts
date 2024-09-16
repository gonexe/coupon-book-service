import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/config';

//  Coupon book attributes
interface CouponBookAttributes {
  id?: number;
  name: string;
  max_uses_per_user: number;
  is_redeemable_multiple_times: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CouponBookCreationAttributes
  extends Optional<CouponBookAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

/**
 * Represents a coupon book in the database.
 *
 * @class CouponBook
 * @extends {Model<CouponBookAttributes, CouponBookCreationAttributes>}
 * @implements {CouponBookAttributes}
 */
class CouponBook
  extends Model<CouponBookAttributes, CouponBookCreationAttributes>
  implements CouponBookAttributes
{
  public id!: number;
  public name!: string;
  public max_uses_per_user!: number;
  public is_redeemable_multiple_times!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

//  Initialize the CouponBook model
CouponBook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_uses_per_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_redeemable_multiple_times: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CouponBook',
    tableName: 'CouponBooks',
  },
);

export default CouponBook;
