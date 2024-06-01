import {
  Sequelize,
  Model,
  Optional,
} from "npm:sequelize@6.12.0";
import linkTableAttributes from "./attributes/link.ts"
import {commonInitTableOptions} from "./common.ts"

interface LinkAttributes {
  id: number,
  folderId: number,
  url: string,
  name?: string
}

export interface LinkCreationAttributes extends Optional<LinkAttributes, "id" | "folderId"> {}

export class Link extends Model<LinkAttributes, LinkCreationAttributes> implements LinkAttributes{
  public id!: number;
  public folderId!: number;
  public url!: string;
  public name!: string;

  public readonly deletedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function(sequelize: Sequelize): void {
  Link.init(linkTableAttributes, {
    tableName: 'link',
    sequelize,
    ...commonInitTableOptions
  });
}

