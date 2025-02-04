export type ErrorCode =
  | "ArticleNotFoundException"
  | "InvalidMasterStatusException"
  | "InvalidAnnotationReferencesException";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class ArticleNotFoundException extends Error implements ReducerError {
  errorCode = "ArticleNotFoundException" as ErrorCode;
  constructor(message = "ArticleNotFoundException") {
    super(message);
  }
}

export class InvalidMasterStatusException
  extends Error
  implements ReducerError
{
  errorCode = "InvalidMasterStatusException" as ErrorCode;
  constructor(message = "InvalidMasterStatusException") {
    super(message);
  }
}

export class InvalidAnnotationReferencesException
  extends Error
  implements ReducerError
{
  errorCode = "InvalidAnnotationReferencesException" as ErrorCode;
  constructor(message = "InvalidAnnotationReferencesException") {
    super(message);
  }
}

export const errors = {
  UpdateFoundation: {
    ArticleNotFoundException,
    InvalidMasterStatusException,
    InvalidAnnotationReferencesException,
  },
};
