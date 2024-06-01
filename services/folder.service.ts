import {Folder, FolderCreationAttributes} from "../models/folder.model.ts";
import models, {sequelize} from '../models/index.ts'

const {Folder: FolderModel} = models;
const MAX_LINKS_LENGTH_IN_FOLDER = 150;

type FolderCollection = {
  data: Folder[],
  pagination: {
    total: number,
    current: number
  }
}

class FolderService {
  static async findByFolderId(folderId: number): Promise<Folder | null> {
    const targetFolder = await FolderModel.findOne({
      where: {
        id: folderId,
      },
      include: [{
        association: Folder.associations.links,
      }],
    });
    if (!targetFolder) {
      return null
    }
    return targetFolder.toJSON();
  }
  static async create(folderCreationAttributes: FolderCreationAttributes): Promise<number> {
    if (folderCreationAttributes.links.length > MAX_LINKS_LENGTH_IN_FOLDER) {
      throw new Error();
    }
    let transaction;
    let newFolder;
    try {
      transaction = await sequelize.transaction();
      newFolder = await FolderModel.create(folderCreationAttributes, {
        include: [{
          association: Folder.associations.links,
        }]
      });
      await transaction.commit();
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }
      throw e;
    }
    return newFolder.toJSON().id
  }
}

export default FolderService;
