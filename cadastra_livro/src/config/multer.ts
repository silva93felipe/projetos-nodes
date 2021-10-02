import {diskStorage, Options} from 'multer';
import {resolve} from 'path'
import { randomBytes } from 'crypto';

export const multerConfig = {
    dest: resolve(__dirname, "..", "..", "uploads"),
    storage: diskStorage({
        destination: (req, file, cb) =>{
            cb(null, resolve(__dirname, "..", "..", "uploads"))
        },
        filename: (req, file, cb) => {
            randomBytes(16, (err, hash) =>{
                if(err){
                    cb(err, file.filename)
                }

                const filename = `${hash.toString("hex")}.png`
                cb(null, file.filename)
            })
        }
    }),
    limits:{
        fileSize: 5 * 1024 * 1024 //5MB
    },
    fileFilter: (req, file, cb) =>{
        const formats = [
            "image/jpeg",
            "image/jpg",
            "image/png",
        ]

        if (formats.includes(file.mimetype)){
            cb(null, true)
        }else{
            throw new Error("Formato inválido");
            
        }
    }
} as Options