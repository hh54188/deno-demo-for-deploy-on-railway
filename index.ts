import { validator } from "https://deno.land/x/hono@v4.3.7/validator/index.ts";
import { Hono, Context } from "https://deno.land/x/hono@v4.3.7/mod.ts";
import { cors } from 'https://deno.land/x/hono/middleware.ts'

import folderHandler, {validatorHandler as folderValidatorHandler} from './routers/folder.router-handler.ts';
import publicHandler, {validatorHandler as publicValidatorHandler} from './routers/public.router-handler.ts';

const app = new Hono()

app.use('*', cors({
    origin: '*',
}))

app.get('/api/v1/user/*', (c: Context) => {
    return c.text('Unauthorized', 401)
});

app.get('/api/v1/folder/:id', validator('param', folderValidatorHandler), folderHandler);

app.post('/public/api/v1/folder', validator('json', publicValidatorHandler), publicHandler);

app.get('/api/v1/health', (c: Context) => {
    return c.json({status: 'ok'});
})

app.notFound((c) => {
    return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Something wrong happened', 500)
})

Deno.serve({ port: Deno.env.get("PORT") }, app.fetch)