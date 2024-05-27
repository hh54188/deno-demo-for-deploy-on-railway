import { Hono } from 'https://deno.land/x/hono/mod.ts'

const app = new Hono()

app.get('/', (c) => c.text('Hello Deno!'))

Deno.serve({ port: Deno.env.get("PORT") }, app.fetch)