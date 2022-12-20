export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum InputErrors {
  MIN_LENGTH = "Minimum 4 characters required",
  PATTERN = "Invalid value for field",
  MAX_LENGTH = "Maximum 15 characters required",
  ERROR = "Something went wrong",
  REQUIRED = "Please, enter a value",
}