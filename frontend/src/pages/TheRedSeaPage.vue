<template>
  <div class="red-sea-container">
    <div class="q-pa-md">
      <p>
        <b>Coral Reefs and the Red Sea’s Unique Ecosystem</b>
      </p>
      <p>
        Coral reefs, vital ecosystems which support a third of all marine species,
        are facing severe threats from climate change, such as rising sea
        temperatures and ocean acidification, as well as local issues like
        pollution and overfishing. The past decade has seen devastating coral
        bleaching events, notably in the Great Barrier Reef, where half of its
        coral cover has been lost. With current climate trends, only about 10%
        of coral reefs are expected to survive by 2050, leading to a massive
        loss in biodiversity and threatening the livelihoods of millions who
        depend on reefs for food, tourism, and coastal protection.
      </p>
      <p>
        However, the Red Sea offers hope. Studies, including those by teams at
        EPFL, and researchers from Israel, Jordan, Saudi Arabia, and Egypt, show
        that corals in the Gulf of Aqaba and northern Red Sea are more resilient
        to rising temperatures compared to other reefs. These corals have evolved
        in unique conditions, making them highly resistant to heat stress. This
        offers a chance for the Red Sea reefs to survive trscand possibly act as a
        source for restoring other reefs globally, but protection from further
        environmental threats is crucial and urgent.
      </p>
      <p>
        <b>The Red Sea and Gulf of Aden (RSGA)</b>
      </p>
      <p>
        The Red Sea and Gulf of Aden (RSGA region) host about 13,605 km² of coral
        reefs, representing 5.24% of the world’s total. This region is home to a
        high diversity of marine life, including 401 species of corals (359 in
        the Red Sea, with 6,4% of endemics <span class="trsc-link" @click="scrollToRef('ref1')">[1]</span>) and over
        1,100 fish species, with 165 endemic to the Red Sea <span class="trsc-link" @click="scrollToRef('ref2')">[2]</span>. The Red
        Sea’s warm (SST ranging from 27°C in the North to above 32 in the south),
        saline waters (ranging from 42‰ in the north to 37‰ in the south), and
        nutrient-poor environment support unique coral ecosystems, while the
        eastern portion of the Gulf of Aden is influenced by upwelling of cooler,
        nutrient-rich water, which tend to limit the develop of fringing coral
        reefs. The region is vital for about 240 million of people who rely on
        the health of the sea for fishing, tourism, and coastal resources.
      </p>
      <p>
        However, local disturbances like pollution and coastal development
        threaten reef health and resilience. Because many of these impacts cross
        national borders, coordinated, regional action is needed to protect these
        ecosystems. Currently, coral reef monitoring in the region is sparse,
        inconsistent, and costly, making it difficult to compare data across
        countries and implement an effective conservation policy, coherent at a
        regional level.
      </p>
      <p>
        <b>Our scientific objectives</b>
      </p>
      <ul>
        <li>
          Understanding Coral Resilience: The first goal is to understand why Red
          Sea corals are so resilient to climate change, potentially offering
          insights into how other reefs could adapt.
        </li>
        <li>
          Innovative Monitoring Tools: The second goal is to develop affordable,
          high-resolution monitoring tools that can be standardized across RSGA
          countries, enabling better tracking of reef health and more coordinated
          science-based conservation efforts.
        </li>
        <li>
          Integrated Research Framework: The third goal is to create a
          comprehensive, cost-effective, and scalable framework for assessing
          reef vulnerability and guiding conservation, which can be applied
          globally.
        </li>
      </ul>
      <p>
        The TRSC involves scientists from Red Sea countries in every step of the
        research and transfers their innovative technologies through training
        workshops, ensuring local expertise, leadership, and autonomy to support
        long-term regional monitoring programs. By using advanced, affordable
        technology developed at EPFL, the center fosters international
        partnerships and trains the next generation of scientists in the region.
      </p>
      <p>
        <b>References</b>
      </p>
      <ol>
        <li id="ref1">
          Berumen, M.L., Arrigoni, R., Bouwmeester, J., Terraneo, T.I., Benzoni, F. (2019). Corals of the Red Sea. In: Voolstra, C., Berumen, M. (eds) Coral Reefs of the Red Sea. Coral Reefs of the World, vol 11. Springer, Cham.<a class="trsc-link" href="https://doi.org/10.1007/978-3-030-05802-9_7" target="_blank">DOI</a> <a class="trsc-link" href="https://link.springer.com/chapter/10.1007/978-3-030-05802-9_7" target="_blank">https://link.springer.com/chapter/10.1007/978-3-030-05802-9_7</a>
        </li>
        <li id="ref2">
          Bogorodsky, S.V., Randall, J.E. (2019). Endemic Fishes of the Red Sea. In: Rasul, N., Stewart, I. (eds) Oceanographic and Biological Aspects of the Red Sea. Springer Oceanography. Springer, Cham. <a class="trsc-link" href="https://doi.org/10.1007/978-3-319-99417-8_14" target="_blank">DOI</a> <a class="trsc-link" href="https://link.springer.com/chapter/10.1007/978-3-319-99417-8_14" target="_blank">https://link.springer.com/chapter/10.1007/978-3-319-99417-8_14</a>
        </li>
      </ol>
    </div>
    <div class="q-pa-md">
      <q-img fit="cover" src="/theredsea.jpeg"
        alt="Red Sea Map"
        style="height: 100%; width: 100%;"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
const scrollToRef = (refId: string) => {
  const element = document.getElementById(refId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
</script>

<style scoped>
.red-sea-container {
  display: grid;
  grid-template-columns: 3fr 2fr;
}
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

.ref-link {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
