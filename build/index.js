"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const PORT = 3000;
//create instance of server
const app = (0, express_1.default)();
//request logger middleware
app.use((0, morgan_1.default)('common'));
//http security middleware
app.use((0, helmet_1.default)());
// add routing for / path
app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
});
//post request
app.post('/', (req, res) => {
    res.json({ message: 'Hello from post', data: req.body });
});
// start express server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
exports.default = app;
