import multer from 'multer'

const storage = multer.diskStorage({
    destination: 'public/imagenes',
    filename: (req, _, cb) => {
      const file={fieldname: req.session.passport.user
      }
      const fileName = file.fieldname + '-' + Date.now()
      cb(null, fileName)
    }
  });
  
  export const uploader = multer({storage: storage});