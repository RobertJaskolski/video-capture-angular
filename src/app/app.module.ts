import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {VideoCaptureComponent} from "./modules/video-capture/video-capture.component";
import { AudioCaptureComponent } from './modules/audio-capture/audio-capture.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoCaptureComponent,
    VideoCaptureComponent,
    AudioCaptureComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
