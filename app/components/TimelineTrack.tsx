import * as React from "react";
import { addStyles } from "~/styles/cssManager";
import { VideoProject } from "~/utils/VideoProjectTypes";
import TimelineElement from "./TimelineElement";
import { useDrop } from "react-dnd";
import { DragTypes, DropResult } from "~/routes/DND";
import { GLOBAL_TRACK_WRAPPER_ID } from "~/hooks/useResizeElement";

export interface TimelineTrackProps {
  videoProjectData: VideoProject;
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>;
  track: VideoProject["tracks"][0];
  trackIndex: number;
}

export const TimelineTrack = (props: TimelineTrackProps) => {
  const cls = getClasses();
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const rootEl = React.useRef<HTMLDivElement>(null);

  const handleDropOver = React.useCallback((e: React.DragEvent) => {
    const { clientX, clientY } = e;
    // const { left, top } = rootEl.current?.getBoundingClientRect() || { left: 0, top: 0 };
    // const relativeX = clientX - left;
    // const relativeY = clientY - top;
    positionRef.current = {
      x: clientX,
      y: clientY,
    };
  }, []);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [
      DragTypes.OutsideElement,
      DragTypes.TimelineElement,
    ],
    drop: () => {
      return {
        dropped: true,
        position: positionRef.current,
        toTrackIndex: props.trackIndex,
      } as DropResult;
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));
  const isDragOver = canDrop && isOver;

  return (
    <div
      className={cls.root}
      onDragOver={handleDropOver}
      ref={drop}
      data-is-drag-over={isDragOver}
    >
      <div ref={rootEl} id={GLOBAL_TRACK_WRAPPER_ID}>
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
