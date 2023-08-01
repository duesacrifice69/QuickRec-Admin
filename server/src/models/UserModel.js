import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";
import { DATE } from "sequelize";

class UserModel extends Model {}

DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

UserModel.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EmpNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NIC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsEmployee: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AdminAccount",
  }
);

export default UserModel;
