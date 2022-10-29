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
exports.Etapas = void 0;
const typeorm_1 = require("typeorm");
const alumnos_1 = require("./alumnos");
const anios_1 = require("./anios");
const secciones_1 = require("./secciones");
let Etapas = class Etapas extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Etapas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => alumnos_1.Alumno),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", alumnos_1.Alumno)
], Etapas.prototype, "alumno", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => anios_1.Anio),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", anios_1.Anio)
], Etapas.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => secciones_1.Seccion),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", secciones_1.Seccion)
], Etapas.prototype, "seccione", void 0);
Etapas = __decorate([
    (0, typeorm_1.Entity)()
], Etapas);
exports.Etapas = Etapas;
//# sourceMappingURL=etapas.js.map