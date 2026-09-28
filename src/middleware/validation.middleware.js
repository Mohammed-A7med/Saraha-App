const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const messageList = error.details.map((obj) => obj.message)
      return next(new Error(messageList, { cause: 400 }));
    }

    return next();
  };
};

export default validation;