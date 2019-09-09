'use strict';
module.exports = async(req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      req.isAuth = false;
      return;
    };

    const token = authHeader;
    if (!token || token === '') {
      req.isAuth = false;
      return;
    };

    if (token !== 'secret-ilove-coding') {
      req.isAuth = false;
      return;
    };
    req.isAuth = true;
    return;
  } catch (error) {
    console.log(error);
  }
};
