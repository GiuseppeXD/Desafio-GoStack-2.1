"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var balance = this.transactionsRepository.getBalance();
        if (type === 'outcome' && balance.total < value) {
            throw Error('outcome not permited');
        }
        else {
            return this.transactionsRepository.create({ title: title, value: value, type: type });
        }
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
