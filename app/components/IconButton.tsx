import { addStyles } from "~/styles/cssManager";

export interface IconButtonProps {
  name: string;
  label?: string;
  style?: React.CSSProperties;
}

// @ref [Material Symbols & Icons - Google Fonts](https://fonts.google.com/icons)
export const IconButton = (props: IconButtonProps) => {
  const cls = getClasses(props.style);
  return (
    <span className={cls.root}>
      <span className="material-symbols-outlined">{props.name}</span>
      {props.label && <span className={cls.label}>{props.label}</span>}
    </span>
  )
};

export function getClasses(style?: React.CSSProperties) {
  const cls = addStyles({
    root: theme => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
      padding: 4,
      background: theme?.baseLow,
      width: 36,
      height: 36,
      cursor: "pointer",
      transition: "all .25s 0s ease-in-out",
      "&:hover": {
        background: theme?.baseMedium
      } as React.CSSProperties,
      ...style,
    }),
    label: {
      marginLeft: 4,
    },
  });

  return cls;
}

export default IconButton;
