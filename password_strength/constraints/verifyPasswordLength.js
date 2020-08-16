module.exports = password => {

  if (password.length < 6) {
    return Promise.reject({
      message: 'El password es demasiado corto'
    });
  }

  return Promise.resolve({
    message: 'El pasword pasa la verificación de longitud'
  });
}