import multer from "multer"
import path from "node:path"
import crypto from "node:crypto"

// Use caminhos estáveis no runtime (evita diferença entre src/ vs dist/)
const BASE_FOLDER = process.cwd()

const TMP_FOLDER = path.resolve(BASE_FOLDER, "tmp")
// Agora os uploads ficam dentro de tmp/uploads
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MAX_SIZE = 3 // 3MB
const MAX_FILE_SIZE = 1024 * 1024 * 3 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

export default {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
    MAX_FILE_SIZE,
    MAX_SIZE,
    ACCEPTED_IMAGE_TYPES,
}