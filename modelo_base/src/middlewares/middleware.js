exports.middlewareGlobal = (req, res, next) => {
    next();
};

exports.checkCsrfError = (err, req, res, next) =>{
    if (err && err.code === 'EBADCSRFTOKEN'){
        return res.send('ERROR!');
    }
}