"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_1 = __importDefault(require("./routes/todo"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}
mongoose_1.default.connect(mongoUri);
const db = mongoose_1.default.connection;
db.on('error', (err) => {
    console.error(err);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});
app.use('/todos', todo_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
