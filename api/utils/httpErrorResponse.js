

exports.httpErrorHandler = async (code, message) => {
  let myError;
  try {
    switch (code) {
      case 400: {
        myError = {
          message: 'Bad request',
          code: 400,
          description: message,
        };
        return myError;
      }
      case 500: {
        myError = {
          message: 'Internal Error',
          code: 500,
          description: 'opan\'ki ' + message,
        };
        return myError;
      }
    }

  } catch (e) {
    console.log(e);
  }
};
