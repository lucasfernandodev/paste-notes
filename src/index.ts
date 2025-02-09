import 'express-async-errors';
import express, { Router } from 'express';
import { CreateUserController } from './controllers/users/create-user.ts';
import { CreateNoteController } from './controllers/notes/create-note.ts';
import { ListNoteController } from './controllers/notes/list-note.ts';
import { DeleteNoteController } from './controllers/notes/delete-note.ts';
import { errorMiddleware } from './middlewares/errors.ts';
import { UpdateNoteController } from './controllers/notes/update-note.ts';
import { DeleteAllNoteController } from './controllers/notes/delete-all-note.ts';
import { GetUserController } from './controllers/users/get-user.ts';
import { CreateNoteUsecase } from './app/use-cases/notes/create-note.ts';
const router = Router()


const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(express.static('public'))
const createNoteUsecase = new CreateNoteUsecase()

const createUserController = new CreateUserController();
const getUserController = new GetUserController()

const createNoteController = new CreateNoteController(createNoteUsecase);
const listNoteController = new ListNoteController();
const deleteNoteController = new DeleteNoteController();
const updateNoteController = new UpdateNoteController()
const deleteAllNoteController = new DeleteAllNoteController();


router.post('/api/users', createUserController.handle);
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