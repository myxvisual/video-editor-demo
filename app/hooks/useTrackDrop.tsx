import * as React from "react";
import { useDrop } from "react-dnd";
import { DragTypes, DropResult } from "~/utils/DND";

export function useTrackDrop(toTrackIndex: number) {
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleDropOver = React.useCallback((e: React.DragEvent) => {
    const { clientX, clientY } = e;
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
        toTrackIndex: toTrackIndex,
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

  return [drop, isDragOver, handleDropOver] as const;
}