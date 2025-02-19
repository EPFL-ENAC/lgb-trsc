# Transnational Red Sea Center

This tool allows you to visualize various data associated with the work conducted by the TRSC in the Red Sea. The TRSC platform provides an interactive interface for exploring research data, expeditions, and scientific findings across the Red Sea region.

**Access the platform here: [https://lgb-trsc-dev.epfl.ch/](https://lgb-trsc-dev.epfl.ch/)**

## Contributors

- EPFL - TRSC (Research & Data): [Add main researchers]
- EPFL - ENAC-IT4R (Web Platform Implementation): Pierre Guilbert
- EPFL - ENAC-IT4R (Project Management): Charlie Weil
- EPFL - ENAC-IT4R (Contributors): Pierre Ripoll, Yannick Marcon

## Tech Stack

### Frontend
- [Vue.js 3](https://vuejs.org/) - Progressive JavaScript Framework
- [Quasar](https://quasar.dev/) - Vue.js Framework
- [OpenLayers](https://openlayers.org/) - Mapping Library
- [ECharts](https://echarts.apache.org/) - Data Visualization
- [nginx](https://nginx.org/) - Web Server

### Backend
- [Python](https://www.python.org/) with FastAPI
- [PostgreSQL](https://www.postgresql.org/) - Database

### Infrastructure
- [Docker](https://www.docker.com/) - Containerization
- [Traefik](https://traefik.io/) - Edge Router

## Development

### Prerequisites
- Node.js (v14.19+ / v16+ / v18+)
- npm
- Python 3
- Docker

### Setup & Usage

You can use Make with the following commands:

```bash
# Frontend
make install          # Install dependencies
make run-frontend    # Run development server
make test           # Run tests
make lint           # Run linter
make convert        # Convert data files

# Database
make run-db         # Start PostgreSQL database
make stop-db        # Stop database
make down-db        # Remove database container

# Production deployment
make setup          # Create required Docker network
make run            # Build and run all services
make stop           # Stop all services
make logs          # View service logs
```

### Development Environment

The development environment includes:
- Frontend at http://localhost:9000 (usually)
- Backend API at https://localhost:8060
- Traefik Dashboard at http://localhost:8080

## Data Management

## Data Management

Data for the platform is organized across two repositories:

### Main Data Repository
- Location: [github.com/EPFL-ENAC/lgb-trsc-data](https://github.com/EPFL-ENAC/lgb-trsc-data)
- Contains:
    - PMTiles files (optimized vector tiles)
    - Large GeoJSON datasets

### Application Data
- Location: `./frontend/src/assets`
- Contains:
    - Application-specific data
    - Configuration files
    - Smaller datasets (GeoJSON format):
        - Expedition routes and sampling locations
        - Djibouti 3D bathymetry data
        - Coral reef monitoring sites
        - Environmental parameters

Data is version-controlled and regularly updated to reflect the latest research findings from the TRSC expeditions.

## Internationalization

The platform supports multiple languages including English, French, and Arabic. Translations are managed through i18n files located in `frontend/src/i18n/`. based on `frontend/src/assets/i18n`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Status

Under active development. [Report bugs here](https://github.com/EPFL-ENAC/lgb-trsc/issues).

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE) - see the LICENSE file for details.

This is free software: you can redistribute it and/or modify it under the terms of the GPL-3.0 as published by the Free Software Foundation.

## Project Setup Checklist

- [x] Learn how to use github template repository: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
- [x] Activate discussion (https://github.com/EPFL-ENAC/lgb-trsc/settings)
- [x] Replace `lgb-trsc` by the name of your repo
- [x] Modifiy or remove the `CITATION.cff` file. [How to format it ?](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files) 
- [x] Check if you need all those labels: https://github.com/EPFL-ENAC/lgb-trsc/labels
- [x] Create your first milestone: https://github.com/EPFL-ENAC/lgb-trsc/milestones
- [x] Protect your branch if you're a pro user: https://github.com/EPFL-ENAC/lgb-trsc/settings/branches

