import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from "./Routes/productsRoutes.ts";
const port: number = 5000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`server running on ${port}`);

app.listen({ port });
