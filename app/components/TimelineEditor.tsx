import { addStyles } from "~/styles/cssManager";
import { VideoProject } from "~/utils/VideoProjectTypes";

export interface TimelineEditorProps {
  videoProjectData: VideoProject;
  setVideoProjectData: React.Dispatch<React.SetStateAction<VideoProject>>;
}

export const TimelineEditor = (props: TimelineEditorProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      <div className={cls.tracksWrapper}>
        <div className={cls.emptyTracks} />
        <div className={cls.tracks}>
          {props.videoProjectData?.tracks?.map((track, index) => {
            return (
              <div key={index} className={cls.track}>
                {track.elements.map((element, index) => {
                  return (
                    <div
                      key={index}
                      className={cls.element}
                      style={{
                        left: element.startTime / props.videoProjectData.duration * 100 + "%",
                        width: (element.endTime - element.startTime) / props.videoProjectData.duration * 100 + "%",
                      }}
                    >
                      <div className={cls.handlerL} />
                      <div className={cls.handlerR} />
                    </div>
                  );
                })}
              </div>
            )
          })}
        </div>
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
    tracksWrapper: {},
    emptyTracks: {
      height: 120,
      width: "100%",
    },
    tracks: {
      width: "100%",
    },
    track: theme => ({
      height: 40,
      width: "100%",
      background: theme?.listLow,
      margin: "8px 0",
      position: "relative",
    }),
    element: {
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

export default TimelineEditor;
