export type Background = ColorBackground | DotsBackground | CustomBackground;

export interface ColorBackground {
  type: 'solid';
  color: string;
}

export interface DotsBackground {
  type: 'dots';
  /**
   * Gap between dots
   */
  gap?: number;

  /**
   * Color of the dot
   */
  color?: string;

  /**
   * Diameter of the dot
   */
  size?: number;

  /**
   * Color behind tha dot pattern
   */
  backgroundColor?: string;
}

//Custom Svg Background
export interface CustomBackground {
  type: 'custom';
  color?: string;
  svg: string;
}
