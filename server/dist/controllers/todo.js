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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new todo_1.default(req.body);
        yield todo.save();
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield todo_1.default.findByIdAndUpdate(req.params.todoId, req.body, { new: true });
        if (!todo)
            res.status(404).json({ message: 'Todo not found' });
        else
            res.json(todo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.todoId);
        const todo = yield todo_1.default.findByIdAndDelete(req.params.todoId);
        if (!todo)
            res.status(404).json({ message: 'Todo not found' });
        else
            res.json({ message: 'Todo deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTodo = deleteTodo;
