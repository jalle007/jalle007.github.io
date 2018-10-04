var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var DisplayRoutePipe = (function () {
    function DisplayRoutePipe() {
    }
    DisplayRoutePipe.prototype.transform = function (v) {
        // Convert path to string
        // i.e. /action-sheets/basic becomes Action Sheets: Basic
        v = v.replace("/", "").replace("/", ": ").replace("-", " ");
        v = this.capitalize(v);
        return v;
    };
    DisplayRoutePipe.prototype.capitalize = function (value) {
        return value.toLowerCase().replace(/\b\w/g, function (m) {
            return m.toUpperCase();
        });
    };
    return DisplayRoutePipe;
}());
DisplayRoutePipe = __decorate([
    Pipe({
        name: 'displayRoute'
    })
], DisplayRoutePipe);
export { DisplayRoutePipe };
//# sourceMappingURL=display-route.js.map