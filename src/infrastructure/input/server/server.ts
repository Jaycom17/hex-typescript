import express, { Router } from 'express';
import { setupSwagger } from './swagger';

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
        setupSwagger(this.app);
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
            console.log(`API documentation available at http://localhost:${this.port}/api-docs`);
        });
    }
}