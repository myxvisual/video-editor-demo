
export enum DragTypes {
  TimelineElement = "TimelineElement",
  OutsideElement = "OutsideElement",
}

export interface DropResult {
  dropped: boolean;
  position: {
    x: number;
    y: number;
  };
  targetTrackIndex?: number;
}
