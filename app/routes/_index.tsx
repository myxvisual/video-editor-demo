import SideBar from "~/components/SideBar";
import SideContent from "~/components/SideContent";
import TimelineEditor from "~/components/TimelineEditor";
import Toolbar from "~/components/Toolbar";
import VideoPreview from "~/components/VideoPreview";
import { addStyles } from "~/styles/cssManager";

export const Home = () => {
  const cls = getClasses();

  return (
    <div className={cls.root}>
      <div className={cls.sides}>
        <SideBar />
        <SideContent />
      </div>
      <div className={cls.rightSide}>
        <Toolbar />
        <VideoPreview />
        <TimelineEditor />
      </div>
    </div>
  );
}

export function getClasses() {
  const cls = addStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
    },
    sides: {
      display: "flex",
      flexDirection: "row",
    },
    rightSide: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      flex: "1 1 auto",
    },
  });

  return cls;
}


export default Home;