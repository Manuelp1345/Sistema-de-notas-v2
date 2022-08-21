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
exports.Alumno = void 0;
const periodo_1 = require("./periodo");
const anios_1 = require("./anios");
const materias_1 = require("./materias");
const secciones_1 = require("./secciones");
const typeorm_1 = require("typeorm");
let Alumno = class Alumno extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Alumno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Alumno.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Alumno.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Alumno.prototype, "matricula", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => periodo_1.Periodo),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", periodo_1.Periodo)
], Alumno.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => anios_1.Anio),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Alumno.prototype, "anios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => materias_1.Materia, (materia) => materia.alumno),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Alumno.prototype, "materias", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => secciones_1.Seccion),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", secciones_1.Seccion)
], Alumno.prototype, "seccion", void 0);
Alumno = __decorate([
    (0, typeorm_1.Entity)()
], Alumno);
exports.Alumno = Alumno;
//# sourceMappingURL=alumnos.js.map