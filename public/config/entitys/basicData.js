"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicData = void 0;
const typeorm_1 = require("typeorm");
const documents_1 = require("./documents");
let BasicData = class BasicData extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], BasicData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "secondName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "Surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "secondSurname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", unique: true }),
    __metadata("design:type", String)
], BasicData.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", String)
], BasicData.prototype, "Phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "municipality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], BasicData.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], BasicData.prototype, "DateOfBirth", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => documents_1.Documents),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", documents_1.Documents)
], BasicData.prototype, "Documents", void 0);
BasicData = __decorate([
    (0, typeorm_1.Entity)()
], BasicData);
exports.BasicData = BasicData;
//# sourceMappingURL=basicData.js.map