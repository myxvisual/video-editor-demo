import { useElementDrag } from "~/hooks/useElementDrag";
import { addStyles } from "~/styles/cssManager";
import { DragTypes } from "~/utils/DND";
import { PlayerElement, VideoProject } from "~/utils/VideoProjectTypes";
import { seconds2mmss } from "~/utils/seconds2mmss";

export interface SideContentElementProps {
  id: string;
  title: string;
  previewUrl: string;
  isAdded: boolean;
  // seconds
  duration?: number;
}

export const SideContentElement = (props: SideContentElementProps & {
  videoProjectData: VideoProject,
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>
}) => {
  const cls = getClasses();

  const [handleDragStart, drag] = useElementDrag(props.videoProjectData, props.setVideoProjectData, {
    type: DragTypes.OutsideElement,
    newElement: {
      id: "element-" + props.id,
      type: "image",
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
      startTime: 0,
      endTime: 5,
      url: props.previewUrl,
    } as PlayerElement
  });

  return (
    <div
      className={cls.root}
      ref={drag}
      onDragStart={handleDragStart}
    >
      <div className={cls.mediaPreview}>
        <img src={props.previewUrl} alt={props.title} />
        {props.isAdded && <p className={cls.added}>{"Added"}</p>}
        {props.duration && <p className={cls.duration}>{seconds2mmss(props.duration)}</p>}
      </div>
      <p>{props.title}</p>
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      marginBottom: 12,
    },
    mediaPreview: theme => ({
      width: 130,
      height: 90,
      borderRadius: 8,
      background: theme?.baseLow,
      marginBottom: 4,
      position: "relative",
      "& > img": {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      } as React.CSSProperties,
    }),
    duration: {
      position: "absolute",
      fontSize: 12,
      left: 8,
      bottom: 8,
      padding: "2px 4px",
      borderRadius: 4,
      background: theme => theme.altMedium,
    },
    added: {
      position: "absolute",
      fontSize: 12,
      left: 8,
      top: 8,
      padding: "2px 4px",
      borderRadius: 4,
      background: theme => theme.altMedium,
    },
  });

  return cls;
}

export default SideContentElement;
