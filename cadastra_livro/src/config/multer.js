"use strict";
exports.__esModule = true;
exports.multerConfig = void 0;
var multer_1 = require("multer");
var path_1 = require("path");
var crypto_1 = require("crypto");
exports.multerConfig = {
    dest: path_1.resolve(__dirname, "..", "..", "uploads"),
    storage: multer_1.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.resolve(__dirname, "..", "..", "uploads"));
        },
        filename: function (req, file, cb) {
            crypto_1.randomBytes(16, function (err, hash) {
                if (err) {
                    cb(err, file.filename);
                }
                var filename = hash.toString("hex") + ".png";
                cb(null, file.filename);
            });
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB
    },
    fileFilter: function (req, file, cb) {
        var formats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];
        if (formats.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            throw new Error("Formato inválido");
        }
    }
};
