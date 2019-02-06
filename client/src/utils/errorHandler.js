const getFriendlyMessage = (status, message) => {
  switch (status) {
    case 404:
      return `We're sorry, the requested resource was not found ${message}`;
    case 500:
      return `Something went wrong, please try later ${message}`;
    default:
      return `Ups! it looks like something went wrong :( ${message}`;
  }
};

const errorHandler = (err, message) => {
  const error = {
    friendlyMessage: "",
    originalMessage: "",
    is500: true,
    is404: false,
    status: 500
  };
  if (err && err.response) {
    const { status, statusText } = err.response;
    error.is404 = status === 404;
    error.status = status;
    error.originalMessage = statusText;
    error.is500 = status === 500;
    error.friendlyMessage = getFriendlyMessage(status, message);
  }
  //We should implement some sort of strategy here in order to follow up the undelying problem
  return error;
};

export default errorHandler;
