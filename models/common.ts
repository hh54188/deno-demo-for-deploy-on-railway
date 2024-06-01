import { ModelOptions } from "npm:sequelize@6.12.0/types";

export const commonInitTableOptions:ModelOptions = {
  paranoid: true,
  underscored: true,
  defaultScope: {
    limit: 1000
  }
}
