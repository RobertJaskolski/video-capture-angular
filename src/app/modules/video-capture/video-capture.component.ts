import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss']
})
export class VideoCaptureComponent implements OnInit {
  @ViewChild('video') videoElementRef: any;
  videoElement: any;
  // mediaRecorder: any;
  // recordedBlobs: Blob[];
  // isRecording: boolean = false;
  // downloadUrl: string;
  stream: any;


  constructor() {
  }

  async ngOnInit() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then(stream => {
        this.videoElement = this.videoElementRef.nativeElement;

        this.stream = stream;
        this.videoElement.srcObject = this.stream;
      });
  }
}
