export interface IconProps {
  name: string;
  style?: React.CSSProperties;
}

// @ref [Material Symbols & Icons - Google Fonts](https://fonts.google.com/icons)
export const Icon = (props: IconProps) => {
  return (
    <span className="material-symbols-outlined" style={props.style}>
      {props.name}
    </span>
  )
};

export default Icon;
