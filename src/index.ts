import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import ContentController from './modules/content/content.controller';
import PostController from './modules/post/post.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new PostController(), new ContentController()], Number(process.env.PORT));

app.listen();
