import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserContoller = new CreateUserController();
const createTagContoller = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();

// router.use(ensureAdmin) - se eu colocar assim todas as rotas abaixo disso terá que está autenticadas

// Coloco o middleware direto na rota 
router.post("/users", createUserContoller.handle);
router.post("/tags", ensureAdmin, createTagContoller.handle);
router.post("/login", authenticateUserController.handle);

export { router }