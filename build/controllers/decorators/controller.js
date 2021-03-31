"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var appRouter_1 = require("../../appRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function controller(routePrefix) {
    return function (target) {
        var router = appRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) || [];
            if (path) {
                router[method].apply(router, __spreadArray(__spreadArray(["" + routePrefix + path], middlewares), [routeHandler]));
            }
        }
    };
}
exports.controller = controller;
