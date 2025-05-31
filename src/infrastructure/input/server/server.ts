import express, { Router } from 'express';

interface Options {
    port?: Number;
    routes: Router;
}

export class Server {

    public readonly app = express();
    private readonly port: Number;
    private readonly routes: Router;

    constructor(option: Options) {
        const { port = 3000, routes } = option;

        this.port = port;
        this.routes = routes;
    }

    async start() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}