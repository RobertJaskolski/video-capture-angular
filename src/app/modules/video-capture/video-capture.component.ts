import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare const MediaRecorder: any;
@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss']
})
export class VideoCaptureComponent implements OnInit {
  @ViewChild('video') videoElementRef: any;
  @ViewChild('recordedVideo') recordVideoElementRef: any;
  videoElement: any;
  stream: any;
  isRecording: boolean = false;
  recordedBlobs: any[] = [];
  mediaRecorder: any;
  downloadUrl: string = '';
  recordVideoElement: any;

  constructor() {
  }

  async ngOnInit() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(stream => {
        this.videoElement = this.videoElementRef.nativeElement;
        this.videoElement.volume = 0;
        this.recordVideoElement = this.recordVideoElementRef.nativeElement;
        this.stream = stream;
        this.videoElement.srcObject = this.stream;
      });
  }

  record() {
    if (this.isRecording) {
      this.stopRecording()
    } else {
      this.startRecording()
    }
  }

  startRecording() {
    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm;codecs=h264'};

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }

    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = !this.isRecording;
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm'
        });
        console.log(videoBuffer);
        this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        this.recordVideoElement.src = this.downloadUrl;
      };
    } catch (error) {
      console.log(error);
    }
  }
}
