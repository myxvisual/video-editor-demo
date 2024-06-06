import { addStyles } from "~/styles/cssManager";

export interface MockProps {}

export const Mock = (props: MockProps) => {
  const cls = getClasses();
  return (
    <div className={cls.root}>
      Mock
    </div>
  )
};

export function getClasses() {
  const cls = addStyles({
    root: {}
  });

  return cls;
}

export default Mock;
