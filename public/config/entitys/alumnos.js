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
const secciones_1 = require("./secciones");
const basicData_1 = require("./basicData");
const nota_1 = require("./nota");
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
], Alumno.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => periodo_1.Periodo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", periodo_1.Periodo)
], Alumno.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nota_1.Nota, (notas) => notas.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Alumno.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => anios_1.Anio),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", anios_1.Anio)
], Alumno.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => secciones_1.Seccion),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", secciones_1.Seccion)
], Alumno.prototype, "seccion", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => basicData_1.BasicData),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", basicData_1.BasicData)
], Alumno.prototype, "DatosPersonales", void 0);
Alumno = __decorate([
    (0, typeorm_1.Entity)()
], Alumno);
exports.Alumno = Alumno;
//# sourceMappingURL=alumnos.js.map