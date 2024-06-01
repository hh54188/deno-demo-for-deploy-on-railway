import {Context} from "https://deno.land/x/hono@v4.3.7/mod.ts";
import FolderService from '../services/folder.service.ts';
import UserService from '../services/user.service.ts';

export const validatorHandler = function (value, c) {
    const errorMessage = 'Invalid Request';
    const newFolderInfo = value;
    if (!newFolderInfo || !newFolderInfo.name || !newFolderInfo.links || !newFolderInfo.links.length) {
        return c.text(errorMessage, 400)
    }

    if (newFolderInfo.name.length > 140) {
        return c.text(errorMessage, 400)
    }

    if (newFolderInfo.links.some((link: { url: string, name?: string }) => {
        if (link.name) {
            return link.name.length > 1000;
        }
        return !link.url || !link.url.startsWith('http')
    })) {
        return c.text(errorMessage, 400)
    }

    return newFolderInfo;
}

export default async function handler(c: Context) {
    const user = await UserService.findByEmail('hi@site2share.com');
    const userId = user?.id;

    const newFolderInfo = await c.req.json();
    const newFolderId = await FolderService.create({
        authorId: userId,
        nsfw: 0,
        ...newFolderInfo
    });
    return c.json({
        id: newFolderId
    });
}
