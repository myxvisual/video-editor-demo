export interface VideoProject {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  width: number;
  height: number;
  tracks: Track[];
}

export interface PlayerStatus {
  playing: boolean;
  currentTime: number;
  tracks: Track[];
}

export interface Track {
  elements: Element[];
}

export type Element = TextElement | VideoElement | AudioElement | ImageElement | ShapeElement;

export interface Transform {
  rotate: number;
  scale: [number, number];
}

export interface Effect {
  fill: string;
  shadow: string;
  blur: string;
  opacity: number;
}

export interface Mask {
  id: string;
  clipPaths: string;
  filterColor: string;
  alpha: boolean;
  luma: boolean;
  maskElementId: string;
}

export interface Animator {
  keyframes: Keyframe[];
  property: string;
  loop: boolean;
}

export interface BaseElement {
  id: string;
  visible: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  startTime: number;
  endTime: number;
  transform?: Transform;
  opacity?: number;
  effects?: Effect[];
  mask?: Mask;
  animators?: Animator[];
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fill: string;
  stroke: string;
  fontFamily?: string;
  source?: string;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: string;
  underline?: boolean;
  fontWeight?: string | number;
  fontStyle?: "normal" | "italic" | "oblique";
  fontCase?: "uppercase" | "lowercase" | "capitalize";
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType:
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'triangle'
  | 'polygon'
  | 'polyline'
  | 'line'
  | 'star'
  | 'heart'
  | 'path';
  fill: string;
  stroke: string;
  radius: number;
  path: string[] | string;
  strokeWidth: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  url: string;
  thumbnailUrl?: string;
  isGif?: boolean;
}

export interface VideoElement extends BaseElement {
  type: 'video';
  url: string;
  thumbnailUrl?: string;
  codecs: 'av1' | 'avc';
  format: 'mp4' | 'webm' | 'ogg' | 'mkv' | 'avi' | 'mov';
  duration: number;
  muted?: boolean;
  volume?: number;
}

export interface AudioElement extends BaseElement {
  type: 'audio';
  url: string;
  duration: number;
  volume: number;
  speed: number;
  isSoundtrack?: boolean;
}
