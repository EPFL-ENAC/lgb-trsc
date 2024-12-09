export interface Column {
  name: string;
  measure: string;
  format?: string;
  data?: (number | string)[];
}

export interface SensorDataSpec {
  name: string;
  file: string;
  columns: Column[];
}

export interface DatasetFile {
  file: string;
  skip: number;
  separator: string;
}

export interface Datasets {
  files: DatasetFile[];
  sensors: SensorDataSpec[];
}

export interface Dataset {
  file: string;
  header: string[];
  data: string[][];
}

export interface Vector {
  measure: string;
  values: (string | null)[] | (number | null)[];
}

export interface SensorData {
  name: string;
  vectors: Vector[];
}