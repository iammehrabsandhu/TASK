"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient();
function getAllTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.todo.findMany();
    });
}
function createTodo(content) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.todo.create({
            data: { content }
        });
    });
}
function updateTodo(id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.todo.update({
            where: { id },
            data: { content }
        });
    });
}
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.todo.delete({
            where: { id }
        });
        return prisma.todo.findMany();
    });
}
app.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield getAllTodos();
    res.json(todos);
}));
app.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body.content;
    const newTodo = yield createTodo(content);
    res.status(200).json("done");
}));
app.patch('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const id = parseInt(req.body.id);
    const content = req.body.content;
    const updatedTodo = yield updateTodo(id, content);
    res.json(updatedTodo);
}));
app.delete('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.body.id);
    const todo = yield deleteTodo(id);
    res.json(todo);
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
