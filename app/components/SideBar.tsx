import { addStyles, theme } from "~/styles/cssManager";

export interface SideBarProps {}

export const SideBar = (props: SideBarProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      SideBar
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {
      width: 80,
      height: "100%",
      background: theme => theme.altHigh,
    }
  });

  return cls;
}

export default SideBar;
