import { validator } from "https://deno.land/x/hono@v4.3.7/validator/index.ts";
import { Hono, Context } from "https://deno.land/x/hono@v4.3.7/mod.ts";
import { cors } from 'https://deno.land/x/hono/middleware.ts'

const app = new Hono()

app.get('/', (c) => c.text('Hello Deno!'))

Deno.serve({ port: Deno.env.get("PORT") }, app.fetch)