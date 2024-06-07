import React from "react";
import { addStyles } from "~/styles/cssManager";
import { VideoProject, PlayerElement } from "~/utils/VideoProjectTypes";
import { elementTime2style, offsetX2time, setResizeMousedown } from "~/hooks/useResizeElement";
import { useDrag } from "react-dnd";
import { DragTypes, DropResult } from "~/routes/DND";

export interface TimelineElementProps {
  videoProjectData: VideoProject;
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>;

  element: PlayerElement;
  trackIndex: number;
  elementIndex: number;
}


export const TimelineElement = (props: TimelineElementProps) => {
  const cls = getClasses();
  const startRectRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [lMouseDown] = setResizeMousedown(
    props.videoProjectData,
    props.setVideoProjectData,
    true,
    props.trackIndex,
    props.elementIndex,
  );

  const [rMouseDown] = setResizeMousedown(
    props.videoProjectData,
    props.setVideoProjectData,
    false,
    props.trackIndex,
    props.elementIndex,
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.TimelineElement,
    item: {},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;
      if (dropResult) {
        const newVideoProject = props.videoProjectData;
        const offsetX = (dropResult?.position?.x ?? 0) - startRectRef.current.x;
        const targetTrack = props.videoProjectData.tracks[dropResult?.toTrackIndex ?? 0];
        const currentTrack = props.videoProjectData.tracks[props.trackIndex];
        
        const element = currentTrack.elements[props.elementIndex];
        const startTimeOffset = offsetX2time(offsetX, props.videoProjectData.duration);
        element.startTime += startTimeOffset;
        element.endTime += startTimeOffset;
        targetTrack.elements.push(element);

        currentTrack.elements.splice(props.elementIndex, 1);
        if (currentTrack.elements.length === 0) {
          newVideoProject.tracks.splice(props.trackIndex, 1);
        }

        props.setVideoProjectData({
          ...newVideoProject
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      className={cls.root}
      style={elementTime2style(props.element, props.videoProjectData.duration)}
      ref={drag}
      onDragStart={(e) => {
        startRectRef.current = {
          x: e.clientX,
          y: e.clientY,
        };
      }}
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
