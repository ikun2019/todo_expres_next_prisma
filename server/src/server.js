const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get('/todos', async (req, res) => {
  const allTodos = await prisma.todo.findMany();
  res.status(200).json(allTodos);
});

app.post('/createTodo', async (req, res) => {
  const { title, isComplete } = req.body;
  const createTodo = await prisma.todo.create({
    data: {
      title,
      isComplete,
    }
  });
  res.status(200).json(createTodo);
});

app.put('/editTodo/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, isComplete } = req.body;
  const editedTodo = await prisma.todo.update({
    where: { id: id },
    data: {
      title,
      isComplete
    }
  });
  res.status(200).json(editedTodo);
});

app.delete('/deleteTodo/:id', async (req, res) => {
  const id = Number(req.params.id);
  const deleteTodo = await prisma.todo.delete({
    where: { id: id }
  });
  res.status(200).json({ message: 'todoを削除しました' });
});

app.listen(process.env.API_PORT, () => {
  console.log('サーバー起動');
});