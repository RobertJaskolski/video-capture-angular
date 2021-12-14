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
  devicesInfo: any;

  constructor() {
  }

  async ngOnInit() {
    const deives = await this.getDevices();
    this.gotDevices(deives);
  }

  getDevices() {
    console.log(navigator.mediaDevices.enumerateDevices());
    return navigator.mediaDevices.enumerateDevices();
  }

  gotDevices(devicesInfo: any) {
    this.devicesInfo = devicesInfo;
    const audioSource = devicesInfo.find((device: any) => device.kind === 'audioinput');
    const videoSource = devicesInfo.find((device: any) => device.kind === 'videoinput');
    if (this.stream) {
      this.stream.getTracks().forEach((track: any) => {
        track.stop();
      });
    }
    const constrants = {
      audio: {deviceId: audioSource.deviceId ? {exact: audioSource.deviceId} : undefined},
      video: {deviceId: videoSource.deviceId ? {exact: videoSource.deviceId} : undefined},
    }
    return navigator.mediaDevices.getUserMedia(constrants).then(result => this.gotStream(result)).catch((err) => console.log(err));
  }

  gotStream(stream: any) {
    this.videoElement = this.videoElementRef.nativeElement;
    this.stream = stream;
    this.videoElement.srcObject = stream;
  }

  // record() {
  //   if (this.isRecording) {
  //     this.stopRecording()
  //   } else {
  //     this.startRecording()
  //   }
  // }

  // startRecording() {
  //   this.recordedBlobs = [];
  //   let options: any = { mimeType: 'video/webm'};
  //
  //   try {
  //     this.mediaRecorder = new MediaRecorder(this.stream, options);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //
  //   this.mediaRecorder.start(); // collect 100ms of data
  //   this.isRecording = !this.isRecording;
  //   this.onDataAvailableEvent();
  //   this.onStopRecordingEvent();
  // }
  //
  // stopRecording() {
  //   this.mediaRecorder.stop();
  //   this.isRecording = !this.isRecording;
  // }

  // onDataAvailableEvent() {
  //   try {
  //     this.mediaRecorder.ondataavailable = (event: any) => {
  //       if (event.data && event.data.size > 0) {
  //         this.recordedBlobs.push(event.data);
  //       }
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  //
  // onStopRecordingEvent() {
  //   try {
  //     this.mediaRecorder.onstop = (event: Event) => {
  //       const videoBuffer = new Blob(this.recordedBlobs, {
  //         type: 'video/webm'
  //       });
  //       this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
  //       this.recordVideoElement.src = this.downloadUrl;
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
