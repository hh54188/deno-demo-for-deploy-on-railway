import {DataTypes} from 'npm:sequelize@6.12.0'
import {TABLES} from './common.ts'
const FOLDER_NAME_MAX_LENGTH = 140;
const nameLengthValidation: [number, number] = [1, FOLDER_NAME_MAX_LENGTH];

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: TABLES.USER,
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(FOLDER_NAME_MAX_LENGTH),
    allowNull: false,
    validate: {
      len: nameLengthValidation,
      notEmpty: true
    }
  },
  nsfw: {
    type: DataTypes.INTEGER,
    defaultValue: false,
    allowNull: false,
  },
}
