module.exports = async(req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      req.isAuth = false;
      return req;
    };
    const token = authHeader;
    if (!token || token === '') {
      req.isAuth = false;
      return req;
    };
    if (token !== 'secret-ilove-coding') {
      req.isAuth = false;
      return req;
    };
    req.isAuth = true;
    return req;
  } catch (error) {
    console.log(error);
  }
};
