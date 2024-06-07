import * as React from "react";

import { GLOBAL_TRACK_WRAPPER_ID, offsetX2time } from "~/utils/resizeElement";
import { PlayerElement, VideoProject } from "~/utils/VideoProjectTypes";
import { useDrag } from "react-dnd";
import { DragTypes, DropResult } from "~/utils/DND";

export type ElementData = {
  type: DragTypes.TimelineElement;
  currTrackIndex: number;
  currElementIndex: number;
} | {
  type: DragTypes.OutsideElement;
  newElement: PlayerElement;
};

export function useElementDrag(
  videoProjectData: VideoProject,
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>,
  elementData: ElementData,
) {

  const startRectRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.TimelineElement,
    item: {},
    end: (item, monitor) => {
      const isTimelineElement = elementData.type === DragTypes.TimelineElement;

      const dropResult = monitor.getDropResult() as DropResult;

      if (dropResult) {
        const targetTrackIndex = dropResult?.targetTrackIndex ?? 0;
        const newVideoProject = {
          ...videoProjectData,
        };
        const currElement: PlayerElement = isTimelineElement ? newVideoProject.tracks[elementData.currTrackIndex].elements[elementData.currElementIndex] : elementData.newElement;
    
        // calculate element start and end time
        if (isTimelineElement) {
          const offsetX = (dropResult?.position?.x ?? 0) - startRectRef.current.x;

          const startTimeOffset = offsetX2time(offsetX, newVideoProject.duration);
          const newStartTime = currElement.startTime + startTimeOffset;
          currElement.startTime = newStartTime;
          currElement.endTime += startTimeOffset;
        } else {
          const trackWrapperEl = document.querySelector(`#${GLOBAL_TRACK_WRAPPER_ID}`);
          if (trackWrapperEl) {
            const offsetX = (dropResult?.position?.x ?? 0) - trackWrapperEl.getBoundingClientRect().left;
            const startTime = offsetX2time(offsetX, newVideoProject.duration);
            const duration = currElement.endTime - currElement.startTime;
            currElement.startTime = startTime;
            currElement.endTime = startTime + duration;
          }
        }

        // check bounds, fit in time range.
        const duration = currElement.endTime - currElement.startTime;
        if (currElement.endTime > newVideoProject.duration) {
          currElement.endTime = newVideoProject.duration;
          currElement.startTime = currElement.endTime - duration;
        }
        if (currElement.startTime < 0) {
          currElement.startTime = 0;
          currElement.endTime = duration;
        }

        // if target track is empty, create a new track
        let targetTrack: VideoProject["tracks"][0];
        if (targetTrackIndex < 0 || targetTrackIndex >= newVideoProject.tracks.length) {
          targetTrack = {
            elements: [],
          };
        } else {
          targetTrack = newVideoProject.tracks[targetTrackIndex];
        }

        // add element
        targetTrack.elements.push(currElement);

        // remove element
        if (isTimelineElement) {
          newVideoProject.tracks[elementData.currTrackIndex].elements.splice(elementData.currElementIndex, 1);
        }

        // add track to project
        if (targetTrackIndex < 0) {
          newVideoProject.tracks.unshift(targetTrack);
        }
        if (targetTrackIndex >= newVideoProject.tracks.length) {
          newVideoProject.tracks.push(targetTrack);
        }

        // update project
        setVideoProjectData({
          ...newVideoProject,
          tracks: [...newVideoProject.tracks.filter((track) => track.elements.length > 0)],
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
    elementData,
  ]);

  function handleDragStart(e: React.DragEvent) {
    startRectRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  return [handleDragStart, drag, isDragging] as const;
}
