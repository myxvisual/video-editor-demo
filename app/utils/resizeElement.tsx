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
  let offsetX = 0;
  let elementEl: HTMLElement | null = null;
  let trackWrapperEl: HTMLElement | null = null;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!e.currentTarget) {
      return;
    }
    // currentTarget element is handler
    elementEl = (e.currentTarget as HTMLElement)?.parentElement ?? null;
    trackWrapperEl = document.querySelector(`#${GLOBAL_TRACK_WRAPPER_ID}`) ?? null;
    startX = e.clientX;
    offsetX = 0;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    offsetX = e.clientX - startX;
    if (trackWrapperEl) {
      handleChange?.(offsetX);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    offsetX = e.clientX - startX;
    if (trackWrapperEl) {
      handleChanged?.(offsetX);
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };


  function getNewElementByOffsetX(element: PlayerElement, offsetX: number, isStartTime: boolean) {
  [elementIndex];
    const newElement = { ...element };
    const singleSecondWidth = (trackWrapperEl?.clientWidth ?? 0) / videoProjectData.duration;
    if (isStartTime) {
      newElement.startTime += offsetX / singleSecondWidth; 
      if (newElement.startTime > element.endTime) {
        newElement.startTime = element.endTime - MIN_DURATION;
      }
      if (newElement.startTime < 0) {
        newElement.startTime = 0;
      }
    } else {
      newElement.endTime += offsetX / singleSecondWidth;
      if (newElement.endTime < element.startTime) {
        newElement.endTime = element.startTime + MIN_DURATION;
      }
      if (newElement.endTime > videoProjectData.duration) {
        newElement.endTime = videoProjectData.duration;
      }
    }
  
    return newElement;
  }

  function handleChange(offsetX: number) {
    const element = videoProjectData.tracks[trackIndex].elements[elementIndex];
    const newElement = getNewElementByOffsetX(element, offsetX, isStartTime);
    const newStyle = elementTime2style(newElement, videoProjectData.duration);

    if (elementEl) {
      Object.assign(elementEl?.style, newStyle);
    }
  }

  function handleChanged(offsetX: number) {
    const element = videoProjectData.tracks[trackIndex].elements[elementIndex];
    const newElement = getNewElementByOffsetX(element, offsetX, isStartTime);
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