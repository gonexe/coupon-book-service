import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/config';

//  Coupon attributes
interface CouponAttributes {
  id?: number;
  code: string;
  coupon_book_id: number;
  assigned_to_user_id?: number | null;
  is_redeemed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CouponCreationAttributes
  extends Optional<CouponAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

/**
 * Represents a coupon in the database.
 *
 * @class Coupon
 * @extends {Model<CouponAttributes, CouponCreationAttributes>}
 * @implements {CouponAttributes}
 */
class Coupon
  extends Model<CouponAttributes, CouponCreationAttributes>
  implements CouponAttributes
{
  public id!: number;
  public code!: string;
  public coupon_book_id!: number;
  public assigned_to_user_id!: number | null;
  public is_redeemed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Coupon model
Coupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coupon_book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigned_to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_redeemed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Coupon',
    tableName: 'Coupons',
  },
);

export default Coupon;
