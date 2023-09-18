interface CustomError extends Error {
  response?: {
    data?: any;
  };
  request?: any;
  toJSON?: () => {
    status?: number;
  };
}

export const apiHelper = async <T>(func: Promise<any>): Promise<T> => {
  try {
    const {data} = await func;
    return data;
  } catch (error) {
    const customError = error as CustomError;
    if (customError?.toJSON && !customError.toJSON()?.status) {
      throw 'Network error!';
    } else if (customError?.response) {
      throw customError.response.data?.error;
    } else if (customError?.request) {
      throw 'Request not processed!';
    } else {
      throw customError.message;
    }
  }
};
