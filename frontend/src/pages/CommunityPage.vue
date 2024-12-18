<template>
  <q-page class="col items-center justify-center community-page">
    <!-- <h1 class="red-bold">Community</h1> -->
    <p class="q-pa-md"><a class="trsc-link" href="https://trsc.org" target="_blank">The Transnational Red Sea Center</a> relies on many collaborators from the Red Sea region mainly, and beyond….</p>
    <div class="logo-row">
      <a v-for="community in communities" :key="community.name" :href="community.url" target="_blank">
        <q-img :src="community.logo" :alt="community.name" fit="contain">
          <q-icon class="absolute all-pointer-events" size="8px" name="info" color="black" style="bottom: 4px; right: 4px">
            <q-tooltip>
              {{ community.name }}
            </q-tooltip>
          </q-icon>
        </q-img>
      </a>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const communities = [
  {
    url: "https://aseza.jo/Default/Ar",
    name: "Aqaba Special Economic Zone Authority",
    country: "Jordanie",
    logo: "/community/Aqaba.jpg"
  },
  {
    url: "https://mss.ju.edu.jo/Home.aspx",
    name: "Marine Science Station-The University of Jordan & Yarmouk University",
    country: "Jordanie",
    logo: "/community/MarineScienceStation.png"
  },
  {
    url: "https://www.univ.edu.dj/",
    name: "Université de Djibouti",
    country: "Djibouti",
    logo: "/community/UniversitéDjibouti.jpg"
  },
  {
    url: "https://mensur.gouv.dj/",
    name: "Ministère de l'Enseignement Supérieur & de la Recherche djibouti",
    country: "Djibouti",
    logo: "/community/MinistèreRecherche.jpg"
  },
  {
    url: "https://rsu.edu.sd/?page_id=14026&lang=en",
    name: "Red Sea University",
    country: "Sudan",
    logo: "/community/RedSeaUniversity.jpg"
  },
  {
    url: "https://iui-eilat.ac.il/",
    name: "The Interuniversity Institute for Marine Sciences in Eilat",
    country: "Israel",
    logo: "/community/EilatInstitute.png"
  },
  {
    url: "https://www.facebook.com/people/Minist%C3%A8re-de-lEnvironnement-et-du-D%C3%A9veloppement-Durable/61553005181813/",
    name: "Ministère de l'Environnement et du Développement Durable",
    country: "Djibouti",
    logo: "/community/MinistèreEnvironnement.png"
  }
];
</script>

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

.logo-row {

  display:grid;
  grid-auto-flow: column;
  height: 200px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;
}

.logo-row a {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: end;
}
</style>
