import { useTrackDrop } from "~/hooks/useTrackDrop";
import { addStyles } from "~/styles/cssManager";

export interface TimelineEmptyTrackProps {
  isTop?: boolean;
  tracksLength: number;
}

export const TimelineEmptyTrack = (props: TimelineEmptyTrackProps) => {
  const cls = getClasses(props.isTop);

  const [drop, isDragOver, handleDropOver] = useTrackDrop(props.isTop ? -1 : props.tracksLength);

  return (
    <div
      className={cls.root}
      onDragOver={handleDropOver}
      ref={drop}
      data-is-drag-over={isDragOver}
    />
  )
};

export function getClasses(isTop?: boolean) {
  const cls = addStyles({
    root: theme => ({
      height: "100%",
      width: "100%",
      flex: "1 1 auto",
      [isTop ? "borderBottom" : "borderTop"]: `2px solid transparent`,
      "&[data-is-drag-over=true]": {
        [isTop ? "borderBottom" : "borderTop"]: `2px solid ${theme?.accentDarker1}`,
      } as React.CSSProperties,
    }),
  });

  return cls;
}

export default TimelineEmptyTrack;
