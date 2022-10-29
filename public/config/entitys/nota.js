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
exports.Nota = void 0;
const typeorm_1 = require("typeorm");
const alumnos_1 = require("./alumnos");
const anios_1 = require("./anios");
const recuperacion_Nota_1 = require("./recuperacion_Nota");
const materias_1 = require("./materias");
let Nota = class Nota extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Nota.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nota.prototype, "nota", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Nota.prototype, "momento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => anios_1.Anio),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", anios_1.Anio)
], Nota.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => materias_1.Materia),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", materias_1.Materia)
], Nota.prototype, "materia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => alumnos_1.Alumno),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", alumnos_1.Alumno)
], Nota.prototype, "alumno", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recuperacion_Nota_1.RecuperacionNota, (rp) => rp.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Nota.prototype, "recuperacion", void 0);
Nota = __decorate([
    (0, typeorm_1.Entity)()
], Nota);
exports.Nota = Nota;
//# sourceMappingURL=nota.js.map