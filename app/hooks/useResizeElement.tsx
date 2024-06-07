import React from "react";

import { VideoProject, PlayerElement } from "~/utils/VideoProjectTypes";

export const GLOBAL_TRACK_WRAPPER_ID = "global-track-wrapper";

const MIN_DURATION = 1;

export const setResizeMousedown = (
  videoProjectData: VideoProject,
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>,
  isStartTime: boolean,
  trackIndex: number,
  elementIndex: number,
) => {
  let startX = 0;
  let movedX = 0;
  let elementEl: HTMLElement | null = null;
  let trackEl: HTMLElement | null = null;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!e.currentTarget) {
      return;
    }
    // currentTarget element is handler
    elementEl = (e.currentTarget as HTMLElement)?.parentElement ?? null;
    trackEl = document.querySelector(`#${GLOBAL_TRACK_WRAPPER_ID}`) ?? null;
    startX = e.clientX;
    movedX = 0;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    movedX = e.clientX - startX;
    if (trackEl) {
      handleChange?.(movedX);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    movedX = e.clientX - startX;
    if (trackEl) {
      handleChanged?.(movedX);
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };


  function getNewElement(element: PlayerElement, movedX: number, isStartTime: boolean) {
  [elementIndex];
    const newElement = { ...element };
    const singleSecondWidth = (trackEl?.clientWidth ?? 0) / videoProjectData.duration;
    if (isStartTime) {
      newElement.startTime += movedX / singleSecondWidth; 
      if (newElement.startTime > element.endTime) {
        newElement.startTime = element.endTime - MIN_DURATION;
      }
      if (newElement.startTime < 0) {
        newElement.startTime = 0;
      }
    } else {
      newElement.endTime += movedX / singleSecondWidth;
      if (newElement.endTime < element.startTime) {
        newElement.endTime = element.startTime + MIN_DURATION;
      }
      if (newElement.endTime > videoProjectData.duration) {
        newElement.endTime = videoProjectData.duration;
      }
    }
  
    return newElement;
  }

  function handleChange(movedX: number) {
    const element = videoProjectData.tracks[trackIndex].elements[elementIndex];
    const newElement = getNewElement(element, movedX, isStartTime);
    const newStyle = elementTime2style(newElement, videoProjectData.duration);

    if (elementEl) {
      Object.assign(elementEl?.style, newStyle);
    }
  }

  function handleChanged(movedX: number) {
    const element = videoProjectData.tracks[trackIndex].elements[elementIndex];
    const newElement = getNewElement(element, movedX, isStartTime);
    const tracks = videoProjectData.tracks;
    tracks[trackIndex].elements[elementIndex] = { ...newElement };
    setVideoProjectData({
      ...videoProjectData,
      tracks,
    });
  }

  return [handleMouseDown, handleMouseMove, handleMouseUp] as const;
};

export function offsetX2time(offsetX: number, totalDuration: number) {
  const trackEl = document.querySelector(`#${GLOBAL_TRACK_WRAPPER_ID}`) ?? null;
  if (!trackEl) {
    return 0;
  }
  const singleSecondWidth = (trackEl?.clientWidth ?? 0) / totalDuration;
  
  return offsetX / singleSecondWidth;
}

export function elementTime2style(element: PlayerElement, totalDuration: number) {
  return {
    left: element.startTime / totalDuration * 100 + "%",
    width: (element.endTime - element.startTime) / totalDuration * 100 + "%",
  } as const;
}