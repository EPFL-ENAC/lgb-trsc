/**
 * Legend component type definitions
 */

/**
 * Maps class names to colors
 */
export interface ClassColorMap {
  [key: string]: string;
}

/**
 * Metadata information for legend items
 */
export interface LegendMetadata {
  title?: string;
  unit?: string;
  variable?: string;
}

/**
 * Base props shared by all legend components
 */
export interface BaseLegendProps {
  showLegendText?: boolean;
  metadata?: LegendMetadata;
  isAbsolute?: boolean;
}

/**
 * Props for discrete legend with checkboxes
 */
export interface DiscreteLegendProps extends BaseLegendProps {
  classColorMap?: ClassColorMap;
  maxValue?: number;
}

/**
 * Props for continuous gradient legend
 */
export interface ContinuousLegendProps extends BaseLegendProps {
  classColorMap?: ClassColorMap;
}

/**
 * Props for simple color-text legend
 */
export interface SimpleLegendProps extends BaseLegendProps {
  color: string;
  text: string;
}

/**
 * Props for the main MapLegend component
 */
export interface MapLegendProps extends BaseLegendProps {
  selectedCountry?: string;
  selectedExpedition?: string;
  classColorMap?: ClassColorMap;
  isContinuous?: boolean;
  maxValue?: number;
}