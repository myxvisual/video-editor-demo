import * as React from "react";
import { addStyles } from "~/styles/cssManager";
import { VideoProject } from "~/utils/VideoProjectTypes";
import TimelineElement from "./TimelineElement";
import { GLOBAL_TRACK_WRAPPER_ID } from "~/utils/resizeElement";
import { useTrackDrop } from "~/hooks/useTrackDrop";

export interface TimelineTrackProps {
  videoProjectData: VideoProject;
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>;
  track: VideoProject["tracks"][0];
  trackIndex: number;
}

export const TimelineTrack = (props: TimelineTrackProps) => {
  const cls = getClasses();
  const [drop, isDragOver, handleDropOver] = useTrackDrop(props.trackIndex);

  return (
    <div
      className={cls.root}
      onDragOver={handleDropOver}
      ref={drop}
      data-is-drag-over={isDragOver}
    >
      <div id={GLOBAL_TRACK_WRAPPER_ID}>
        {props.track.elements.map((element, elementIndex) => (
          <TimelineElement
            key={elementIndex}
            videoProjectData={props.videoProjectData}
            setVideoProjectData={props.setVideoProjectData}
            element={element}
            trackIndex={props.trackIndex}
            elementIndex={elementIndex}
          />
        ))}
      </div>
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: theme => ({
      height: 32,
      width: "100%",
      background: theme?.listLow,
      margin: "8px 0",
      position: "relative",
      transition: "all .25s 0s ease-in-out",
      "&:hover": {
        background: theme?.baseLow,
      } as React.CSSProperties,
      "&[data-is-drag-over=true]": {
        background: theme?.baseMedium,
      } as React.CSSProperties,
    }),
  });

  return cls;
}

export default TimelineTrack;
