import { addStyles } from "~/styles/cssManager";

export interface VideoPreviewProps {}

export const VideoPreview = (props: VideoPreviewProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      VideoPreview
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      width: "100%",
      height: "100%",
      flex: "1 1 auto",
      background: theme => theme.listLow,
    }
  });

  return cls;
}

export default VideoPreview;
