class UnauthorizedError extends Error {
  request: any;

  constructor(message?: string, request?: any) {
    super(message);
    this.name = 'UnauthorizedError';
    this.request = request;
  }
}

export default UnauthorizedError;
