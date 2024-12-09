import { Map, MapGeoJSONFeature } from 'maplibre-gl';
import { Scenario } from 'src/stores/scenarii';

export type State = {
  sensors: string[]; // selected sensors
  scenarii: Scenario[]; // selected scenarii
};

export abstract class LayerManager {
  /**
   * Get the identifier of the managed layer.
   */
  abstract getId(): string;

  /**
   * Add the layer to the map.
   */
  abstract append(
    map: Map,
    selectionCallback: FeatureSelectionCallback,
  ): Promise<void>;

  /**
   * Set the visibility of the layer.
   */
  abstract setVisible(map: Map, visible: boolean): void;

  /**
   * Apply the application state to the layer.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyState(map: Map, state: State): void {
    return;
  }
}

export interface FeatureSelectionCallback {
  (name: string, feature: MapGeoJSONFeature): void;
}
