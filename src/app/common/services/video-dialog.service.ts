import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogVideoDetails, DialogVideoThumbnail, VideoMap } from "../models";
import { BehaviorSubject, filter, Observable, } from "rxjs";
import { VideoDialogComponent } from "../components";
import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class VideoDialogService {

    private currentRouteVideos: DialogVideoDetails[];
    private currentVideoSrcBehavior: BehaviorSubject<DialogVideoDetails | undefined>;
    private videoThumbnailsBehavior: BehaviorSubject<DialogVideoThumbnail[]>;
    private currentIndexBehavior: BehaviorSubject<number>;

    constructor(private matDialog: MatDialog,
        private route: Router) {
        this.currentRouteVideos = [];
        this.currentVideoSrcBehavior =
            new BehaviorSubject<DialogVideoDetails | undefined>(undefined);
        this.videoThumbnailsBehavior = new BehaviorSubject<DialogVideoThumbnail[]>([]);
        this.currentIndexBehavior = new BehaviorSubject<number>(0);

        route.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                console.log('Route changed:', (event as NavigationEnd).urlAfterRedirects);
                this.PlayVideo();
            });
    }

    public get CurrentVideoSrc$(): Observable<DialogVideoDetails | undefined> {
        return this.currentVideoSrcBehavior.asObservable();
    }

    public get VideoThumbnails$(): Observable<DialogVideoThumbnail[]> {
        return this.videoThumbnailsBehavior.asObservable();
    }

    public get CurrentVideoIndex$(): Observable<number> {
        return this.currentIndexBehavior.asObservable();
    }

    public PlayVideo(): void {
        const foundVideos = this.VideoBasedOnRoute();
        if (!!foundVideos) {
            this.NotifyVideoChange(foundVideos);
        }
    }

    private NotifyVideoChange(videos: VideoMap): void {
        this.currentRouteVideos = videos.video;
        this.currentVideoSrcBehavior.next(this.currentRouteVideos[0]);
        this.videoThumbnailsBehavior.next(this.currentRouteVideos.map(v => v.ToThumbnail()));
        this.currentIndexBehavior.next(0);
        this.matDialog.open(VideoDialogComponent);
    }

    public PlayVideoByIndex(index: number): void {
        if (index < 0 || index >= this.currentRouteVideos.length) {
            console.error("Invalid video index:", index);
            return;
        }

        this.currentVideoSrcBehavior.next(this.currentRouteVideos[index]);
        this.videoThumbnailsBehavior.next(this.currentRouteVideos.map(v => v.ToThumbnail()));
        this.currentIndexBehavior.next(index);
    }

    private VideoBasedOnRoute(): VideoMap | undefined {
        const path = window.location.pathname;
        return VideoMap.All.find(v => v.route === path);
    }
}
