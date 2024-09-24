export interface IResponseDto<T> {
  success: true;
  message: string;
  responseObject: T;
}
