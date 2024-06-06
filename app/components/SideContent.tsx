import { addStyles } from "~/styles/cssManager";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { seconds2mmss } from "~/utils/seconds2mmss";

export interface SideContentProps {}

export interface MediaData {
  id: string;
  title: string;
  previewUrl: string;
  isAdded: boolean;
  // seconds
  duration?: number;
  
}

const medias: MediaData[] = [{
  id: "media-1",
  title: "Media 1",
  previewUrl: "https://picsum.photos/id/237/200/300",
  isAdded: true,
}, {
  id: "media-2",
  title: "Media 2",
  previewUrl: "https://picsum.photos/id/238/200/300",
  isAdded: false,
  duration: 10,
}, {
  id: "media-3",
  title: "Media 3",
  previewUrl: "https://picsum.photos/id/239/200/300",
  isAdded: false,
  duration: 20,
}];

export const SideContent = (props: SideContentProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      <div className={cls.header}>
        <div className={cls.userInfo}>
          <Icon name="supervisor_account" style={{ fontSize: 32, color: "#ff123f" }} />
          <span>MyXVisual's space</span>
          <Icon name="arrow_drop_down" style={{ fontSize: 32 }} />
        </div>
        <IconButton name="more_horiz" style={{ fontSize: 28 }} />
      </div>
      <div className={cls.actions}>
        <IconButton name="upload" label="Upload" style={{ fontSize: 14, height: 38, width: "100%", color: "#0078D7" }} />
        <div className={cls.actionsGroup}>
          <IconButton name="stay_current_portrait" style={{ width: "25%" }} />
          <IconButton name="stay_current_landscape" style={{ width: "25%" }} />
          <IconButton name="capture" style={{ width: "25%" }} />
        </div>
      </div>
      <div className={cls.resources}>
        {medias.map(media => (
          <div key={media.id} className={cls.media}>
            <div className={cls.mediaPreview}>
              <img src={media.previewUrl} alt={media.title} />
              {media.isAdded && <p className={cls.added}>{"Added"}</p>}
              {media.duration && <p className={cls.duration}>{seconds2mmss(media.duration)}</p>}
            </div>
            <p>{media.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      width: 320,
      height: "100%",
      background: theme => theme.altLow,
      borderRight: theme => `1px solid ${theme.baseLow}`,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: 20,
      borderBottom: theme => `1px solid ${theme.listLow}`,
    },
    userInfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "& > *": {
        marginLeft: 4,
      } as React.CSSProperties,
    },
    actions: {
      width: "100%",
      padding: "10px 20px",
    },
    actionsGroup: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
    },
    resources: {
      width: "100%",
      padding: "10px 20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    media: {
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

export default SideContent;
