import {DataTypes} from 'npm:sequelize@6.12.0'
import {TABLES} from './common.ts';
// https://stackoverflow.com/questions/29458445/what-is-a-safe-maximum-length-a-segment-in-a-url-path-should-be/
const URL_MAX_LENGTH = 2048;
const URL_MIN_LENGTH = 1;
const URL_LENGTH_VALIDATION: [number, number] = [URL_MIN_LENGTH, URL_MAX_LENGTH];
const NAME_MAX_LENGTH = 1000;

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  folderId: {
    type: DataTypes.INTEGER,
    references: {
      model: TABLES.FOLDER,
      key: 'id',
    },
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(URL_MAX_LENGTH),
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true,
      len: URL_LENGTH_VALIDATION
    }
  },
  name: {
    type: DataTypes.STRING(NAME_MAX_LENGTH),
    allowNull: true,
  }
}
