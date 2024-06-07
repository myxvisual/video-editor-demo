import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import SideBar from "~/components/SideBar";
import SideContent from "~/components/SideContent";
import TimelineEditor from "~/components/TimelineEditor";
import Toolbar from "~/components/Toolbar";
import VideoPreview from "~/components/VideoPreview";
import { addStyles } from "~/styles/cssManager";
import { VideoProject } from "~/utils/VideoProjectTypes";

const vpData: VideoProject = {
  id: "project-1",
  title: "Project 1",
  description: "Project 1 description",
  thumbnail: "https://picsum.photos/id/237/200/300",
  duration: 30,
  width: 1280,
  height: 720,
  tracks: [{
    elements: [{
      id: "element-1",
      type: "image",
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
      startTime: 0,
      endTime: 5,
      url: "https://picsum.photos/id/237/200/300",
    }],
  }, {
    elements: [{
      id: "element-2",
      type: "image",
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
      startTime: 3,
      endTime: 15,
      url: "https://picsum.photos/id/238/200/300",
    }, {
      id: "element-3",
      type: "image",
      x: 0,
      y: 0,
      width: 1280,
      height: 720,
      startTime: 20,
      endTime: 25,
      url: "https://picsum.photos/id/239/200/300",
    }],
  }],
};

export const Home = () => {
  const cls = getClasses();
  const [videoProjectData, setVideoProjectData] = React.useState<VideoProject>(vpData);

  return (
    <DndProvider backend={HTML5Backend}>
    <div className={cls.root}>
      <div className={cls.sides}>
        <SideBar />
        <SideContent
          videoProjectData={videoProjectData}
          setVideoProjectData={setVideoProjectData}
        />
      </div>
      <div className={cls.rightSide}>
        <Toolbar />
        <VideoPreview />
        <TimelineEditor videoProjectData={videoProjectData} setVideoProjectData={setVideoProjectData} />
      </div>
    </div>
    </DndProvider>
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