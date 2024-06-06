import { addStyles } from "~/styles/cssManager";

export interface SideContentProps {}

export const SideContent = (props: SideContentProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      SideContent
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
    }
  });

  return cls;
}

export default SideContent;
