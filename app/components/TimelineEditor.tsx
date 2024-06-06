import { addStyles } from "~/styles/cssManager";

export interface TimelineEditorProps { }

export const TimelineEditor = (props: TimelineEditorProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      TimelineEditor
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
    },
  });

  return cls;
}

export default TimelineEditor;
