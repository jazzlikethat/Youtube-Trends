import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { appConfig } from 'appConfig';

@Component({
  selector   : 'app-player',
  templateUrl: './player.component.html',
  styleUrls  : [ './player.component.scss' ]
})
export class PlayerComponent implements OnInit {
  public embedUrl: string;
  public trustedEmbedUrl: SafeUrl;
  public videoLoader: boolean;

  constructor(private sanitizer: DomSanitizer) {}

  public ngOnInit() {
    const id = window.location.href
                     .replace(/^.*\//g, '')
                     .replace(/^.*\..*/g, '');

    if (!id.length) {
      return;
    }

    this.videoLoader = true;
    this.embedUrl = appConfig.getYoutubeEmbdedUrl(id);
    this.trustedEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl);
  }

  /* On video ready hide loader */
  public loadVideo(): void {
    this.videoLoader = false;
  }

}
