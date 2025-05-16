import platosRouter from './platosRouter.js';
import ingredientesRouter from './ingredientesRouter.js';

function routerAPI(app) {
    app.use("/api/platos", platosRouter);
    app.use("/api/ingredientes", ingredientesRouter);
}

export default routerAPI;