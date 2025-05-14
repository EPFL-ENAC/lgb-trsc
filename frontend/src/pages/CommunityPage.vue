<template>
  <q-page class="col items-center justify-center community-page">
    <p class="q-pa-md">
      <a class="trsc-link" href="https://trsc.org" target="_blank">
        {{ t('community.header') }}
      </a>
      {{ t('community.description') }}
    </p>
    <div class="logo-row">
      <div
        v-for="community in communities"
        :key="community.nameKey"
        class="logo-item"
      >
        <a :href="community.url" target="_blank" class="logo-item-link">
          <q-img
            :src="community.logo"
            :alt="t(community.nameKey)"
            fit="contain"
            style="height: 150px; width: 150px"
          >
          </q-img>
          <p>{{ t(community.nameKey) }}</p>
        </a>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import communities from 'assets/communities';

const { t } = useI18n();
</script>

<i18n lang="yaml">
en:
  community:
    header: "The Transnational Red Sea Center"
    description: "relies on many collaborators from the Red Sea region and Gulf of Aden"
  communities:
    aqabaSpecialEconomicZoneAuthority: "Aqaba Special Economic Zone Authority, Jordan"
    marineScienceStationOfAqaba: "Marine Science Station of Aqaba, Jordan"
    aqabaMarineReserve: "Aqaba Marine Reserve, Jordan"
    redSeaUniversityOfPortSudan: "Red Sea University of Port-Sudan, Sudan"
    ministryOfMaritimeResourcesOfMassawa: "Ministry of Maritime Resources of Massawa, Eritrea"
    ministereEnvironnementDjibouti: "Ministère de l'Environnement et du Développement Durable de Djibouti"
    universiteDeDjibouti: "Université de Djibouti"
    centreEtudeRechercheDjibouti: "Centre d'étude et de recherche de Djibouti"
    universityOfKonstanz: "University of Konstanz, Germany"
    ecolePolytechniqueFederealeZurich: "Swiss Federal Institute of Technology Zurich, Switzerland"
    ecolePolytechniqueFederealeLausanne: "Swiss Federal Institute of Technology Lausanne, Switzerland"
fr:
  community:
    header: "Le Centre Transnational de la Mer Rouge"
    description: "compte sur de nombreux collaborateurs de la région de la Mer Rouge et du Golfe d'Aden"
  communities:
    aqabaSpecialEconomicZoneAuthority: "Aqaba Special Economic Zone Authority, Jordan"
    marineScienceStationOfAqaba: "Marine Science Station of Aqaba, Jordan"
    aqabaMarineReserve: "Aqaba Marine Reserve, Jordan"
    redSeaUniversityOfPortSudan: "Red Sea University of Port-Sudan, Sudan"
    ministryOfMaritimeResourcesOfMassawa: "Ministère des Ressources Maritimes de Massawa, Eritrea"
    ministereEnvironnementDjibouti: "Ministère de l'Environnement et du Développement Durable de Djibouti"
    universiteDeDjibouti: "Université de Djibouti"
    centreEtudeRechercheDjibouti: "Centre d'étude et de recherche de Djibouti"
    universityOfKonstanz: "University of Konstanz, Germany"
    ecolePolytechniqueFederealeZurich: "École polytechnique fédérale de Zurich, Switzerland"
    ecolePolytechniqueFederealeLausanne: "École polytechnique fédérale de Lausanne, Switzerland"
ar:
  community:
    header: "المركز العابر للحدود لبحر الأحمر"
    description: "يعتمد على العديد من المتعاونين من منطقة البحر الأحمر وخليج عدن"
  communities:
    aqabaSpecialEconomicZoneAuthority: "Aqaba Special Economic Zone Authority, Jordan"
    marineScienceStationOfAqaba: "Marine Science Station of Aqaba, Jordan"
    aqabaMarineReserve: "Aqaba Marine Reserve, Jordan"
    redSeaUniversityOfPortSudan: "Red Sea University of Port-Sudan, Sudan"
    ministryOfMaritimeResourcesOfMassawa: "Ministry of Maritime Resources of Massawa, Eritrea"
    ministereEnvironnementDjibouti: "Ministère de l'Environnement et du Développement Durable de Djibouti"
    universiteDeDjibouti: "Université de Djibouti"
    centreEtudeRechercheDjibouti: "Centre d'étude et de recherche de Djibouti"
    universityOfKonstanz: "University of Konstanz, Germany"
    ecolePolytechniqueFederealeZurich: "École polytechnique fédérale de Zurich, Switzerland"
    ecolePolytechniqueFederealeLausanne: "École polytechnique fédérale de Lausanne, Switzerland"
</i18n>

<style scoped>
.trsc-link {
  color: red;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: red;
  }
  &:active {
    color: red;
  }
}
.red-bold {
  color: red;
  font-weight: bold;
}

.logo-item-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;

  p {
    margin-top: 1rem;
    text-align: center;
    transition: all 0.2s ease;
  }

  &:hover {
    text-decoration: none;

    p {
      text-decoration: underline;
    }
  }
}

.logo-row {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 3rem;
  width: 100%;
  justify-content: space-around;
  margin-top: 3rem;
  padding: 0 2rem;
}

.logo-item {
  display: flex;
  justify-content: center;
}
</style>