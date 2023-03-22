import express from 'express';
import controller from '../controllers/movies';
const router = express.Router();

router
.get('/movies', controller.getAll)
.get('/movies/:id', controller.get)
.post('/movies', controller.create)
.patch('/movies/:id', controller.update)
.delete('/movies/:id', controller.remove);

export = router;