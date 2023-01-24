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
exports.Representante = void 0;
const basicData_1 = require("./basicData");
const alumnos_1 = require("./alumnos");
const typeorm_1 = require("typeorm");
let Representante = class Representante extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Representante.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Representante.prototype, "parentesco", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => basicData_1.BasicData),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", basicData_1.BasicData)
], Representante.prototype, "DatosPersonales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => alumnos_1.Alumno, (alumno) => alumno.representante),
    __metadata("design:type", Array)
], Representante.prototype, "alumno", void 0);
Representante = __decorate([
    (0, typeorm_1.Entity)()
], Representante);
exports.Representante = Representante;
//# sourceMappingURL=representante.js.map