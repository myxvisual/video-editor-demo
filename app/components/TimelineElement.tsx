import React from "react";
import { addStyles } from "~/styles/cssManager";
import { VideoProject, PlayerElement } from "~/utils/VideoProjectTypes";
import { elementTime2style, offsetX2time, setResizeMousedown } from "~/hooks/useResizeElement";
import { useDrag } from "react-dnd";
import { DragTypes, DropResult } from "~/utils/DND";

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

  const startRectRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
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

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.TimelineElement,
    item: {},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;

      if (dropResult) {
        const toTrackIndex = dropResult?.toTrackIndex ?? 0;
        const newVideoProject = {
          ...videoProjectData,
          tracks: [...videoProjectData.tracks.map((track) => {
            if (track.elements.length === 0) {
              return track;
            }
            return {
              ...track,
              elements: [...track.elements],
            };
          })],
        };
        const offsetX = (dropResult?.position?.x ?? 0) - startRectRef.current.x;

        let targetTrack = newVideoProject.tracks[toTrackIndex];
        if (toTrackIndex < 0) {
          targetTrack = {
            elements: [],
          };
        }
        if (toTrackIndex >= newVideoProject.tracks.length) {
          targetTrack = {
            elements: [],
          };
        }

        const currentTrack = newVideoProject.tracks[trackIndex];
        
        const element = currentTrack.elements[elementIndex];
        const startTimeOffset = offsetX2time(offsetX, newVideoProject.duration);
        element.startTime += startTimeOffset;
        element.endTime += startTimeOffset;
        targetTrack.elements.push(element);

        currentTrack.elements.splice(elementIndex, 1);
        if (currentTrack.elements.length === 0) {
          newVideoProject.tracks.splice(trackIndex, 1);
        }

        if (toTrackIndex < 0) {
          newVideoProject.tracks.unshift(targetTrack);
        }
        if (toTrackIndex >= newVideoProject.tracks.length) {
          newVideoProject.tracks.push(targetTrack);
        }

        setVideoProjectData({
          ...newVideoProject,
          tracks: [...newVideoProject.tracks],
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }), [
    videoProjectData,
    setVideoProjectData,
    trackIndex,
    elementIndex,
  ]);

  return (
    <div
      className={cls.root}
      style={elementTime2style(element, videoProjectData.duration)}
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
