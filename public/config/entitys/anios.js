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
exports.Anio = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = require("typeorm");
const periodo_1 = require("./periodo");
const secciones_1 = require("./secciones");
let Anio = class Anio extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Anio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Anio.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Anio.prototype, "numberAnio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => periodo_1.Periodo, (periodo) => periodo.anio, { onDelete: "RESTRICT" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", periodo_1.Periodo)
], Anio.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => secciones_1.Seccion, (sec) => sec.anio),
    __metadata("design:type", Array)
], Anio.prototype, "secciones", void 0);
Anio = __decorate([
    (0, typeorm_1.Entity)()
], Anio);
exports.Anio = Anio;
//# sourceMappingURL=anios.js.map