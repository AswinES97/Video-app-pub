import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpinterceptorInterceptor } from "./httpinterceptor.interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorInterceptor, multi: true },
];