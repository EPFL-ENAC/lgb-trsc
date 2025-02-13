<template>
  <q-page class="col items-center justify-center community-page">
    <!-- <h1 class="red-bold">Community</h1> -->
    <p class="q-pa-md"><a class="trsc-link" href="https://trsc.org" target="_blank">The Transnational Red Sea Center</a> relies on many collaborators from the Red Sea region and Gulf of Aden</p>
    <div class="logo-row">
      <div class="logo-item" v-for="community in communities" :key="community.name" >
        <a :href="community.url" target="_blank" class="logo-item-link">
        <q-img :src="community.logo" :alt="community.name" fit="contain" style="min-height: 150px;">
        </q-img>
        <p>{{ community.name }}</p>
      </a>
      </div>
      
    </div>
  </q-page>
</template>

<script setup lang="ts">
const communities = [
  {
    url: "https://aseza.jo/Default/Ar",
    name: "Aqaba Special Economic Zone Authority",
    country: "Jordan",
    logo: "/community/Aqaba.jpg"
  },
  {
    url: "https://mss.ju.edu.jo/Home.aspx",
    name: "Marine Science Station of Aqaba",
    country: "Jordan",
    logo: "/community/MarineScienceStation.png"
  },

  
  {
    url: "https://rsu.edu.sd/?page_id=14026&lang=en",
    name: "Red Sea University",
    country: "Sudan",
    logo: "/community/RedSeaUniversity.jpg"
  },
  {
    name: "Ministry of Marine Resources of Massawa, Eritrea",
    country: "Eritrea",
    logo: "/community/MinistryMarineResources.png"
  },

  {
    url: "https://www.facebook.com/people/Minist%C3%A8re-de-lEnvironnement-et-du-D%C3%A9veloppement-Durable/61553005181813/",
    name: "Ministère de l'Environnement et du Développement Durable",
    country: "Djibouti",
    logo: "/community/MinistèreEnvironnement.png"
  },
  // {
  //   url: "https://mensur.gouv.dj/",
  //   name: "Ministère de l'Enseignement Supérieur & de la Recherche djibouti",
  //   country: "Djibouti",
  //   logo: "/community/MinistèreRecherche.jpg"
  // },
  

  {
    url: "https://www.univ.edu.dj/",
    name: "Université de Djibouti",
    country: "Djibouti",
    logo: "/community/UniversitéDjibouti.jpg"
  },
  {
    url: "https://www.cerd.dj",
    name: "CERD (centre d'étude et de recherche à Djibouti)",
    country: "Djibouti",
    logo: "/community/cerd.png"
  },
  // {
  //   url: "https://iui-eilat.ac.il/",
  //   name: "The Interuniversity Institute for Marine Sciences in Eilat",
  //   country: "Israel",
  //   logo: "/community/EilatInstitute.png"
  // },
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

.logo-item-link {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: end;
  text-decoration: none;
  color: inherit;

  p {
    margin: 0;
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

  display:grid;
  grid-auto-flow: column;
  height: 300px;
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
