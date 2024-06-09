import { PrismaClient } from '@prisma/client'
import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors";

const app=express();
const port=3000;
app.use(bodyParser.json());
app.use(cors());

const prisma = new PrismaClient();

async function getAllTodos() {
    return prisma.todo.findMany();
}


async function createTodo(content: string) {
    return prisma.todo.create({
        data: { content }
    });
}

async function updateTodo(id: number, content: string) {
    return prisma.todo.update({
        where: { id },
        data: { content }
    });
}

async function deleteTodo(id: number) {
    await prisma.todo.delete({
        where: { id }
    });
    return prisma.todo.findMany();
}


app.get('/todos', async (req, res) => {
    const todos = await getAllTodos();
    res.json(todos);
});


app.post('/todos', async (req, res) => {
    const content = req.body.content;
    const newTodo = await createTodo(content);
    res.status(200).json("done");
});

app.patch('/todos', async (req, res) => {
    console.log(req.body);
    const id = parseInt(req.body.id);
    const content = req.body.content;
    const updatedTodo = await updateTodo(id, content);
    res.json(updatedTodo);
});

app.delete('/todos', async (req, res) => {
    const id = parseInt(req.body.id);
    const todo = await deleteTodo(id);
    res.json(todo);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
