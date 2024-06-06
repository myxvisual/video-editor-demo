import * as React from "react";
import { addStyles } from "~/styles/cssManager";
import Icon from "./Icon";

export interface IconButton {
  icon: string;
  key: string;
  description: string;
}

// icons: media, templates, texts, captions, transcript, effects, transition, filters, plugins
export const sideBarIconButtons = [{
  icon: "movie",
  key: "media",
  description: "Media"
}, {
  icon: "layers",
  key: "templates",
  description: "Templates"
}, {
  icon: "text_fields",
  key: "texts",
  description: "Texts"
}, {
  icon: "subtitles",
  key: "captions",
  description: "Captions"
}, {
  icon: "format_quote",
  key: "transcript",
  description: "Transcript"
}, {
  icon: "blur_on",
  key: "effects",
  description: "Effects"
}, {
  icon: "swap_horiz",
  key: "transition",
  description: "Transition"
}, {
  icon: "app_registration",
  key: "filters",
  description: "Filters"
}, {
  icon: "mediation",
  key: "plugins",
  description: "Plugins"
}];

export const SideBar = () => {
  const cls = getClasses();
  const [activeKey, setActiveKey] = React.useState("media" as string);

  return (
    <div className={cls.root}>
      <div className={cls.brand}>
        <Icon name="dataset" style={{ fontSize: 60 }} />
      </div>
      {sideBarIconButtons.map(button => (
        <div
          data-active={activeKey === button.key}
          className={cls.iconButton}
          key={button.key}
          role="presentation"
          onClick={() => setActiveKey(button.key)}
        >
          <Icon name={button.icon} style={{ fontSize: 30, margin: 4 }} />
          <p>{button.description}</p>
        </div>
      ))}
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      width: 90,
      height: "100%",
      background: theme => theme.altHigh,
    },
    brand: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 100,
      margin: 20,
      borderBottom: theme => `1px solid ${theme.baseLow}`,
    },
    iconButton: theme => ({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 70,
      height: 70,
      margin: "12px auto",
      borderRadius: 5,
      fontSize: 12,
      cursor: "pointer",
      userSelect: "none",
      transition: "all .25s 0s ease-in-out",
      "&:hover": {
        background: theme?.listLow,
      } as React.CSSProperties,
      "&[data-active='true']": {
        background: theme?.accent,
      } as React.CSSProperties
    }),
  });

  return cls;
}

export default SideBar;
