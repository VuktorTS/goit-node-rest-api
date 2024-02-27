export const controllerWraper = (controller) => {
  const func = async (res, req, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};
