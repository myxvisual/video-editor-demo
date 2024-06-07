import React from "react";
import { addStyles } from "~/styles/cssManager";
import { elementTime2style, setResizeMousedown } from "~/utils/resizeElement";

import { VideoProject, PlayerElement } from "~/utils/VideoProjectTypes";
import { useElementDrag } from "~/hooks/useElementDrag";
import { DragTypes } from "~/utils/DND";

export interface TimelineElementProps {
  videoProjectData: VideoProject;
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>;

  element: PlayerElement;
  trackIndex: number;
  elementIndex: number;
}


export const TimelineElement = (props: TimelineElementProps) => {
  const cls = getClasses();
  const {
    videoProjectData,
    setVideoProjectData,
    element,
    trackIndex,
    elementIndex,
  } = props;

  const [lMouseDown] = setResizeMousedown(
    videoProjectData,
    setVideoProjectData,
    true,
    trackIndex,
    elementIndex,
  );

  const [rMouseDown] = setResizeMousedown(
    videoProjectData,
    setVideoProjectData,
    false,
    trackIndex,
    elementIndex,
  );
  const [handleDragStart, drag] = useElementDrag(videoProjectData, setVideoProjectData, {
    type: DragTypes.TimelineElement,
    currTrackIndex: trackIndex,
    currElementIndex: elementIndex,
  });

  return (
    <div
      className={cls.root}
      style={elementTime2style(element, videoProjectData.duration)}
      ref={drag}
      onDragStart={handleDragStart}
    >
      <div
        className={cls.handlerL}
        onMouseDown={lMouseDown}
        role="presentation"
      />
      <div
        className={cls.handlerR}
        onMouseDown={rMouseDown}
        role="presentation"
      />
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      background: theme => theme.accent,
      height: "100%",
      position: "absolute",
    },
    handlerL: {
      position: "absolute",
      left: 0,
      width: 10,
      height: "100%",
      background: theme => theme.altMedium,
    },
    handlerR: {
      position: "absolute",
      right: 0,
      width: 10,
      height: "100%",
      background: theme => theme.altMedium,
    },
  });

  return cls;
}

export default TimelineElement;
