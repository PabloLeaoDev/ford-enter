export class FileReadError extends Error {
  constructor(message = 'Error reading file') {
    super(message);
    this.name = 'FileReadError';
  }
}

export class DataAlreadyExistsError extends Error {
  constructor(message = 'Data already exists') {
    super(message);
    this.name = 'DataAlreadyExistsError';
  }
}

export class SavingDataError extends Error {
  constructor(message = 'Error saving data') {
    super(message);
    this.name = 'SavingDataError';
  }
}