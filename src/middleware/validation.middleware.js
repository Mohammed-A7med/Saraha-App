const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const message = error.details.map((obj) => obj.message).join(", ");
      return next(new Error(message, { cause: 400 }));
    }

    return next();
  };
};

export default validation;