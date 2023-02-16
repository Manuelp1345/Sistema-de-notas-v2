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
exports.Seccion = void 0;
const anios_1 = require("./anios");
const typeorm_1 = require("typeorm");
let Seccion = class Seccion extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Seccion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seccion.prototype, "seccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => anios_1.Anio, (anio) => anio.secciones, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", anios_1.Anio)
], Seccion.prototype, "anio", void 0);
Seccion = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(["seccion", "anio"], { unique: true })
], Seccion);
exports.Seccion = Seccion;
//# sourceMappingURL=secciones.js.map