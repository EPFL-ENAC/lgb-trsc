<template>
  <div class="popup">
    <button class="close-btn" @click="() => closeDrawer()">{{ $t('back') }}</button>
    <h3 class="country-name">{{ country.name }}</h3>
    <div class="country-info">
      <p><strong>{{ $t('dateOfPastVisits') }}</strong> {{ country.visited }}</p>
      <p><strong>{{ $t('ongoingProjects') }}</strong> {{ country.projects }}</p>
      <p><strong>{{ $t('numberOfSitesVisited') }}</strong> {{ country.sites }}</p>
      <p>
        <strong>{{ $t('numberOfPermanentMonitoringSites') }}</strong>
        {{ country.monitoring }}
      </p>
      <p v-if="country.training">
        <strong>{{ $t('numberOfTrainingWorkshopCompleted') }}</strong>
        {{ country.training }}
      </p>
      <p><strong>{{ $t('localCollaborators') }}</strong> {{ country.collaboration }}</p>
      <p v-if="country.contact">
        <strong>{{ $t('contactPersons') }}</strong> {{ country.contact }}
      </p>
    </div>
    <q-dialog
      v-model="showZoomedChart"
      persistent
      :maximized="false"
      class="popup"
    >
      <q-card
        style="width: 80vw; max-width: 1200px; height: 80vh; max-height: 800px"
      >
        <q-card-section class="q-pa-md row items-center justify-between">
          <h4 class="q-pa-sm q-ma-sm">{{ $t('3dMapping') }}</h4>
          <div class="right-actions">
            <q-toggle
              v-model="substrateLevel"
              true-value="Substrate_coarse"
              false-value="Substrate_intermediate"
              :label="substrateLevel"
            ></q-toggle>
            <q-btn
              v-close-popup
              icon="close"
              class="close-btn"
              flat
              round
              dense
            />
          </div>
        </q-card-section>
        <BarChart3DMapping
          :raw-data="country.rawData"
          :style="{ margin: '0 auto' }"
          height="76%"
          width="90%"
          :tooltip="true"
          :substrate-level="substrateLevel"
        />

        <q-card-actions align="right">
          <q-btn
            :label="$t('viewOnMap')"
            color="white"
            flat
            @click="toggle3DZoomedChart"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="images">
      <div class="card" style="cursor: pointer" @click="toggle3DZoomedChart">
        <BarChart3DMapping
          :raw-data="country.rawData"
          :tooltip="false"
          width="90%"
        />
        <p>{{ $t('3dMapping') }}</p>
      </div>
      <div class="card">
        <h3 class="card_title">{{ $t('numberOfDetectedSpeciesPerFamily') }}</h3>
        <img src="/eDNANew.png" alt="eDNA" />
        <p>{{ $t('environmentalDNAProject') }}</p>
        <p><i>{{ $t('temporaryResults') }}</i></p>
      </div>
      <div class="card">
        <!-- <img src="/seacape-genomics.png" alt="Seascape Genomics" /> -->
        <p>{{ $t('seascapeGenomics') }}</p>
        <p><i>{{ $t('comingSoon') }}</i></p>
      </div>
      <div class="card">
        <!-- <img src="/seacape-genomics.png" alt="Seascape Genomics" /> -->
        <p>{{ $t('inCollaborationWith') }}</p>

        <div style="display: flex; gap: 1rem">
          <div
            v-for="community in computedCountryCommunities"
            :key="community.name"
            class="logo-item"
          >
            <a :href="community.url" target="_blank" class="logo-item-link">
              <q-img
                :src="community.logo"
                :alt="community.name"
                fit="contain"
                style="height: 150px; width: 150px"
              >
              </q-img>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BarChart3DMapping from './BarChart3DMapping.vue';
import communities from 'assets/communities';
import { useI18n } from 'vue-i18n';

    const { t: $t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
  closeDrawer: {
    type: Function,
    required: true,
  },
});

const computedCountryCommunities = computed(() => {
  return communities.filter(
    (community) => community.country === props.country.name
  );
});
const substrateLevel = ref('Substrate_coarse');

let showZoomedChart = ref(false);
const toggle3DZoomedChart = () => {
  showZoomedChart.value = !showZoomedChart.value;
};
</script>


<i18n lang="yaml">
en:
  back: Back
  dateOfPastVisits: 'Date of past visits:'
  ongoingProjects: 'Ongoing projects:'
  numberOfSitesVisited: 'Number of sites visited:'
  numberOfPermanentMonitoringSites: 'Number of permanent monitoring sites:'
  numberOfTrainingWorkshopCompleted: 'Number of training workshop completed:'
  localCollaborators: 'Local collaborators:'
  contactPersons: 'Contact persons:'
  3dMapping: 3D Mapping
  viewOnMap: View on Map
  numberOfDetectedSpeciesPerFamily: Number of detected species per family
  environmentalDNAProject: Environmental DNA project
  temporaryResults: Temporary results
  seascapeGenomics: Seascape Genomics
  comingSoon: Coming soon
  inCollaborationWith: In Collaboration with

fr:
  back: Retour
  dateOfPastVisits: 'Date des visites précédentes :'
  ongoingProjects: 'Projets en cours :'
  numberOfSitesVisited: 'Nombre de sites visités :'
  numberOfPermanentMonitoringSites: 'Nombre de sites de suivi permanent :'
  numberOfTrainingWorkshopCompleted: 'Nombre d''ateliers de formation réalisés :'
  localCollaborators: 'Collaborateurs locaux :'
  contactPersons: 'Personnes de contact :'
  3dMapping: Cartographie 3D
  viewOnMap: Voir sur la carte
  numberOfDetectedSpeciesPerFamily: Nombre d'espèces détectées par famille
  environmentalDNAProject: Projet ADN environnemental
  temporaryResults: Résultats temporaires
  seascapeGenomics: Génomique des paysages marins
  comingSoon: Bientôt disponible
  inCollaborationWith: En collaboration avec

ar:
  back: عودة
  dateOfPastVisits: ':تاريخ الزيارات السابقة'
  ongoingProjects: ':المشاريع الجارية'
  numberOfSitesVisited: ':عدد المواقع التي تمت زيارتها'
  numberOfPermanentMonitoringSites: ':عدد مواقع المراقبة الدائمة'
  numberOfTrainingWorkshopCompleted: ':عدد ورش العمل التدريبية المنجزة'
  localCollaborators: ':المتعاونون المحليون'
  contactPersons: ':الأشخاص المسؤولون'
  3dMapping: رسم الخرائط ثلاثية الأبعاد
  viewOnMap: عرض على الخريطة
  numberOfDetectedSpeciesPerFamily: ':عدد الأنواع المكتشفة لكل عائلة'
  environmentalDNAProject: مشروع الحمض النووي البيئي
  temporaryResults: نتائج مؤقتة
  seascapeGenomics: الجينوميات البحرية
  comingSoon: قريباً
  inCollaborationWith: بالتعاون مع
</i18n>
<style scoped>
.card_title {
  font-size: 1rem;
  font-weight: 900;
  margin: 0;
  padding-left: 0.3rem;
}
.country-name {
  margin: 0px;
}
.popup {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
}

.right-actions {
  display: flex;
  width: 206px;
  justify-content: space-between;
  align-self: center;
  flex-direction: column;
  margin-right: 60px;
}

.close-btn {
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  margin-bottom: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.images {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto-fit, minmax(50px, 1fr));
  gap: 1rem;
  width: 100%;
}

:deep(.card) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid #ccc; /* Optional styling */
  overflow: hidden; /* To avoid overflow issues */
  /* height: 80vh; */
  width: 100%;
}

.card img {
  width: 100%;
  height: auto; /* Maintains aspect ratio */
  flex: 1; /* Allows the image to grow and fill space */
}

.card p {
  margin: 0; /* Removes default margin */
  height: 50px; /* Set the footer height */
  line-height: 50px; /* Centers text vertically */
  text-align: center; /* Centers text horizontally */
  background-color: #f0f0f0; /* Optional background for distinction */
  flex-shrink: 0; /* Prevents shrinking of the footer */
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.country-info {
  width: 100%;
  text-align: left;
  margin: 1rem 0;
}

.country-info p {
  margin: 0.5rem 0;
}

.country-info strong {
  font-weight: bold;
}
</style>
