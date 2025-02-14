import Todo from "../models/todo";
import { Request, Response } from "express";

export const getTodos = async (req : Request, res : Response) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const createTodo = async (req : Request, res : Response) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const updateTodo = async (req : Request, res : Response) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true});
        if(!todo) res.status(404).json({ message: 'Todo not found' });
        else res.json(todo);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const deleteTodo = async (req : Request, res : Response) => {
    try {
        console.log(req.params.todoId);
        const todo = await Todo.findByIdAndDelete(req.params.todoId);
        if(!todo) res.status(404).json({ message: 'Todo not found' });
        else res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}