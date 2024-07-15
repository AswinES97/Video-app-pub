import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable } from "rxjs";
import { ErrorHandlerService } from "src/app/services/error-haandler.service";
import { ModalService } from "src/app/services/modal.service";
import { VideoService } from "src/app/services/video.service";

@Component({
  selector: "app-video-upload-modal",
  templateUrl: "./video-upload-modal.component.html",
  styleUrls: ["./video-upload-modal.component.css"],
})
export class VideoUploadModalComponent implements OnInit {
  isOpen = false;
  isDragOver = false;
  selectedFile: File | null = null;
  storeData!: Observable<object>;
  user: any;
  connectId: string = "";

  constructor(
    private modalService: ModalService,
    private videoService: VideoService,
    private errorhandler: ErrorHandlerService,
    private toaster: ToastrService,
    private store: Store<{ user: object }>,
  ) {}

  ngOnInit(): void {
    this.modalService.currentState.subscribe((boolean) => {
      this.isOpen = boolean;
    });
    this.storeData = this.store.select("user");
    this.storeData.subscribe((data) => {
      this.user = data;
    });
  }

  closeModal() {
    this.isOpen = false;
    this.selectedFile = null;
    this.isDragOver = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadVideo() {
    if (this.selectedFile) {
      console.log("Uploading video:", this.selectedFile);
      const formData = new FormData();
      formData.append("filename", this.selectedFile.name);
      this.videoService
        .initializeUpload(formData)
        .pipe(
          catchError((err) => {
            return this.errorhandler.handleError(err, this.toaster);
          }),
        )
        .subscribe((data) => {
          // console.log(data)
          this.connectId = data.connectId;
          this.uploadChunks(data.uploadId);
        });
    }
  }

  async uploadChunks(uploadId: string) {
    if (!this.selectedFile) return;
    const intervelTime = 5000;

    // this.videoService.pollHealth(intervelTime, this.connectId).subscribe(
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.error("Error checking health:", error);
    //   },
    // );

    const chunkSize = 6 * 1024 * 1024; // 5 MB chunks
    const file = this.selectedFile;
    const totalChunks = Math.ceil((file?.size as number) / chunkSize);

    let start = 0;
    let uploadedBytes = 0;
    const uploadPromises = [];

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const chunk = file.slice(start, start + chunkSize);
      start += chunkSize;
      const chunkFormData = new FormData();
      chunkFormData.append("filename", file?.name as string);
      chunkFormData.append("chunk", chunk);
      chunkFormData.append("totalChunks", totalChunks.toString());
      chunkFormData.append("chunkIndex", chunkIndex.toString());
      chunkFormData.append("uploadId", uploadId);
      chunkFormData.append("userId", this.user.user.userId);

      uploadPromises.push(
        this.videoService.chunkUpload(chunkFormData, this.connectId as string),
      );
    }

    try {
      await Promise.all(uploadPromises);
      console.log("All chunks uploaded successfully");

      this.videoService
        .uploadComplete({
          filename: this.selectedFile.name,
          totalChunks,
          uploadId,
          connectId: this.connectId,
        })
        .subscribe((data) => {
          console.log("upload complete", data);
        });
    } catch (error) {
      console.error("Error uploading chunks:", error);
    }
  }
}
