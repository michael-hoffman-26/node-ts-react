import { createApp } from './app';
import { PORT } from './utils/consts';

const app = createApp();


app.listen(PORT, function () {
    console.log(`App is listening on port: ${PORT}!`);
});