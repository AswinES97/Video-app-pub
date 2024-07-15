import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  interval,
  catchError,
  lastValueFrom,
  Observable,
  switchMap,
  takeWhile,
} from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  private healthCheckUrl = "http://your-node-server:3000/health";
  constructor(private _http: HttpClient) {}

  initializeUpload(formData: FormData) {
    return this._http.post<initializeResponse>(
      `${environment.apiURL}/upload-video/initialize`,
      formData,
      {
        withCredentials: true,
      },
    );
  }

  chunkUpload(formData: FormData, connectId: string) {
    return lastValueFrom(
      this._http.post(
        `http://${connectId}.${environment.customURL}/video/upload`,
        formData,
        {
          withCredentials: true,
        },
      ),
    );
  }

  uploadComplete(data: any) {
    return this._http.post<initializeResponse>(
      `${environment.apiURL}/upload-video/complete`,
      data,
      {
        withCredentials: true,
      },
    );
  }

  checkHealth(connectId: string): Observable<any> {
    return this._http
      .get(`http://${connectId}.${environment.customURL}/healthCheck`)
      .pipe(
        catchError(() => {
          return [{ status: "unhealthy" }];
        }),
      );
  }

  pollHealth(intervalTime: number, connectId: string): Observable<any> {
    return interval(intervalTime).pipe(
      switchMap(() => this.checkHealth(connectId)),
      takeWhile((response) => response.status === "healthy", true),
    );
  }
}
// angular automaticall adds multipar-formdata to the content-type header

interface initializeResponse {
  uploadId: string;
  connectId: string;
}
