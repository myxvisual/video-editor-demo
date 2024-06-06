import { addStyles } from "~/styles/cssManager";

export interface ToolbarProps {}

export const Toolbar = (props: ToolbarProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      Toolbar
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      width: "100%",
      height: 60,
      background: theme => theme.altMedium,
      borderBottom: theme => `1px solid ${theme.baseLow}`,
    },
  });

  return cls;
}

export default Toolbar;
