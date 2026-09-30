const isAuthorized = (roles) => {
  return (req, res, next) => {
    // check if role not includes in roles
    if (!roles.includes(req.user.role))
      return next(new Error("Not Authorized!", { cause: 403 }));

    return next();
  };
};

export default isAuthorized;
