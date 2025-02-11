import 'express-async-errors';
import express, { Router } from 'express';
import { AuthenticateOrCreateUserController } from './controllers/auth/authenticate-or-create-user.ts';
import { CreateNoteController } from './controllers/notes/create-note.ts';
import { ListNoteController } from './controllers/notes/list-note.ts';
import { DeleteNoteController } from './controllers/notes/delete-note.ts';
import { errorMiddleware } from './middlewares/errors.ts';
import { UpdateNoteController } from './controllers/notes/update-note.ts';
import { DeleteAllNoteController } from './controllers/notes/delete-all-note.ts';
import { GetUserController } from './controllers/users/get-user.ts';
import { CreateNoteUsecase } from './app/use-cases/notes/create-note.ts';
import { ListNoteUsecase } from './app/use-cases/notes/list-notes.ts';
import { DeleteAllNoteUsecase } from './app/use-cases/notes/delete-all-notes.ts';
import { DeleteNoteUsecase } from './app/use-cases/notes/delete-note.ts';
import { UpdateNoteUsecase } from './app/use-cases/notes/update-note.ts';
import { AuthenticateOrCreateUserUsecase } from './app/use-cases/auth/authenticate-or-create-user.ts';
import { GetUserUsecase } from './app/use-cases/users/get-user.ts';
const router = Router()


const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(express.static('public'))

const authenticateOrCreateUserUsecase = new AuthenticateOrCreateUserUsecase()
const getUserUsecase = new GetUserUsecase()

const createNoteUsecase = new CreateNoteUsecase()
const listNoteUsecase = new ListNoteUsecase()
const deleteNoteUsecase = new DeleteNoteUsecase()
const deleteAllNoteUsecase = new DeleteAllNoteUsecase()
const updateNoteUsecase = new UpdateNoteUsecase()

const authenticateOrCreateUserController = new AuthenticateOrCreateUserController(
  authenticateOrCreateUserUsecase
);
const getUserController = new GetUserController(getUserUsecase)

const createNoteController = new CreateNoteController(createNoteUsecase);
const listNoteController = new ListNoteController(listNoteUsecase);
const deleteNoteController = new DeleteNoteController(deleteNoteUsecase);
const updateNoteController = new UpdateNoteController(updateNoteUsecase)
const deleteAllNoteController = new DeleteAllNoteController(deleteAllNoteUsecase);


router.post('/api/users', authenticateOrCreateUserController.handle);
router.get('/api/users', getUserController.handle)
router.post('/api/notes', createNoteController.handle)
router.get('/api/notes', listNoteController.handle)
router.delete('/api/notes', deleteNoteController.handle);
router.delete('/api/notes/all', deleteAllNoteController.handle)
router.put('/api/notes', updateNoteController.handle)


app.use(router)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});