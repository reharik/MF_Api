module.exports = function(logger) {
  return notification => {
    const status = notification.success ? 200 : 422;
    let body = {};
    if(!notification.success) {
      body.success = false;
      body.exception = notification.exception;
      body.errors = notification.errors;
      body.message = notification.handlerResult;
      logger.error(notification.handlerResult)
    }else{
      body.success = notification.success;
      body.payload = notification.handlerResult;
    }

    return {
      body,
      status
    }
  }
};