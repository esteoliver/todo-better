const basicController = {
  beforeAction: [],
  runBeforeActions: () => {
    console.log("Running before actions");
  }
}

const basicControllerHandler = {
  get: (obj, prop) => {
    if (typeof obj[prop] === 'function') {

      return (...args) => {
        basicController.runBeforeActions();
        obj[prop].apply(null, args)
      }
    }
    return obj[prop];
  }
}

export { basicController, basicControllerHandler };