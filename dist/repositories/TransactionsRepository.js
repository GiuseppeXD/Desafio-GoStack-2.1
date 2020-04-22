"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var reducerIncome = function (accumulator, currentTransation) {
            if (currentTransation.type === 'income')
                return accumulator + currentTransation.value;
            return accumulator;
        };
        var reducerOutcome = function (accumulator, currentTransation) {
            if (currentTransation.type === 'outcome')
                return accumulator + currentTransation.value;
            return accumulator;
        };
        var income = this.transactions.reduce(reducerIncome, 0);
        var outcome = this.transactions.reduce(reducerOutcome, 0);
        var total = income - outcome;
        var balance = {
            income: income,
            outcome: outcome,
            total: total,
        };
        return balance;
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ title: title, type: type, value: value });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
