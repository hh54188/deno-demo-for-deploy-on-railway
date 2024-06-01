import { Context } from "https://deno.land/x/hono@v4.3.7/mod.ts";
import FolderService from '../services/folder.service.ts';

export const validatorHandler = function (value, c) {
    const errorMessage = 'Invalid Request';
    const id = value['id']
    if (!id || isNaN(parseInt(id))) {
        return c.text(errorMessage, 400)
    }

    if (parseInt(id) < 19630824) {
        return c.text(errorMessage, 400)
    }

    return {
        id: parseInt(id)
    }
}

export default async function handler(c: Context) {
    const folder = await FolderService.findByFolderId(parseInt(c.req.param('id')))
    if (!folder) {
        return c.text('Not Found', 404);
    }

    const {authorId, createdAt, deletedAt, id, links, name, nsfw, updatedAt} = folder;

    return c.json({
        authorId,
        id,
        links,
        name,
        nsfw,
        editable: false,
        createdAt,
        deletedAt,
        updatedAt
    });
}
