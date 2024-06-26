import { addStyles } from "~/styles/cssManager";
import { VideoProject } from "~/utils/VideoProjectTypes";
import TimelineTrack from "./TimelineTrack";
import TimelineEmptyTrack from "./TimelineEmptyTrack";

export interface TimelineEditorProps {
  videoProjectData: VideoProject;
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>;
}

export const TimelineEditor = (props: TimelineEditorProps) => {
  const cls = getClasses();

  return (
    <div className={cls.root}>
      <div className={cls.tracksWrapper}>
        <TimelineEmptyTrack isTop={true} tracksLength={props.videoProjectData?.tracks?.length ?? 0} />
        <div className={cls.tracks}>
          {props.videoProjectData?.tracks?.map((track, trackIndex) => {
            return <TimelineTrack
              key={trackIndex}
              videoProjectData={props.videoProjectData}
              setVideoProjectData={props.setVideoProjectData}
              track={track}
              trackIndex={trackIndex}
            />
          })}
        </div>
        <TimelineEmptyTrack isTop={false} tracksLength={props.videoProjectData?.tracks?.length ?? 0} />
      </div>
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      width: "100%",
      height: 360,
      background: theme => theme.altMedium,
      borderTop: theme => `1px solid ${theme.baseLow}`,
      padding: "20px 40px",
    },
    tracksWrapper: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    tracks: {
      width: "100%",
    },
  });

  return cls;
}

export default TimelineEditor;
