import { Control, Map } from 'maplibre-gl';

interface LayerItem {
  id: string;
  title: string;
}

interface LayerSwitcherOptions {
  baseLayers: LayerItem[];
  overlayLayers: LayerItem[];
}

export class MapLayerSwitcherControl implements Control {
  private container: HTMLDivElement;
  private options: LayerSwitcherOptions;
  private map!: Map;

  constructor(options: LayerSwitcherOptions) {
    this.options = options;
    this.container = document.createElement('div');
    this.container.className = 'maplibre-ctrl layerswitcher';
    this.buildUI();
  }

  private buildUI() {
    // Create container for base maps (radio buttons)
    const baseContainer = document.createElement('div');
    baseContainer.innerHTML = `<strong>Base maps</strong>`;
    this.options.baseLayers.forEach((layer) => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="radio" name="basemap" value="${layer.id}" /> ${layer.title}`;
      baseContainer.appendChild(label);
    });
    // Create container for overlays (checkboxes)
    const overlayContainer = document.createElement('div');
    overlayContainer.innerHTML = `<strong>Overlays</strong>`;
    this.options.overlayLayers.forEach((layer) => {
      const label = document.createElement('label');
      label.innerHTML = `<input type="checkbox" name="overlay" value="${layer.id}" checked /> ${layer.title}`;
      overlayContainer.appendChild(label);
    });

    this.container.appendChild(baseContainer);
    this.container.appendChild(overlayContainer);

    // Add event listeners
    this.container.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.name === 'basemap') {
        // Show only the selected base layer and hide others
        this.options.baseLayers.forEach((layer) => {
          const visibility = layer.id === target.value ? 'visible' : 'none';
          this.map.setLayoutProperty(layer.id, 'visibility', visibility);
        });
      } else if (target.name === 'overlay') {
        // Toggle overlay visibility
        const visibility = target.checked ? 'visible' : 'none';
        this.map.setLayoutProperty(target.value, 'visibility', visibility);
      }
    });
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
    return this.container;
  }

  onRemove(): void {
    this.container.parentNode?.removeChild(this.container);
    // ...existing code if needed...
  }
}
