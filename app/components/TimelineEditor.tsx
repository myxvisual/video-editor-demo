import { elementTime2style, setResizeMousedown } from "~/hooks/useResizeElement";
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
          {props.videoProjectData?.tracks?.map((track, trackIndex) => {
            return (
              <div key={trackIndex} className={cls.track}>
                {track.elements.map((element, index) => {

                  const [lMouseDown] = setResizeMousedown(
                    props.videoProjectData,
                    props.setVideoProjectData,
                    true,
                    trackIndex,
                    index,
                  );

                  const [rMouseDown] = setResizeMousedown(
                    props.videoProjectData,
                    props.setVideoProjectData,
                    false,
                    trackIndex,
                    index,
                  );

                  return (
                    <div
                      key={index}
                      className={cls.element}
                      style={elementTime2style(element, props.videoProjectData.duration)}
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
