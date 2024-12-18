<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';

const isLoggedIn = ref(false);

onMounted(() => {
  checkLoginStatus();
});

function checkLoginStatus() {
  isLoggedIn.value = !!Cookies.get('id');
}
</script>

<template>
  <v-container class="mt-5">
    <!-- Welcome Section -->
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="pa-5" color="grey lighten-4" elevation="2">
          <v-card-title>
            <h3>Dobrodošli na TvojKoticek.si</h3>
          </v-card-title>
          <v-card-subtitle class="subtitle-1">
            Vašem varnem prostoru za deljenje misli in iskanje podpore
          </v-card-subtitle>
          <v-divider class="my-4"></v-divider>

          <v-card-text>
            <p>
              Vsi se kdaj znajdemo v trenutkih, ko nas življenje preizkuša in potrebujemo prostor, kjer
              lahko brez obsojanja izrazimo svoje misli, težave in stiske. TvojKoticek.si je varen kotiček,
              kjer se lahko odprete, napišete svoje izkušnje in poiščete nasvet, tolažbo ali preprosto
              podporo.
            </p>
            <p>
              Naša skupnost verjame v moč odprtega in razumevajočega dialoga. Ko napišete svoje misli, vam
              drugi uporabniki lahko komentirajo in s tem pomagajo videti stvari iz drugačnih perspektiv ali
              pa preprosto nudijo toplo besedo, ki včasih pomeni največ.
            </p>
            <v-divider class="my-4"></v-divider>

            <p>
              Spletna stran TvojKoticek.si je namenjena vsem, ki si želijo:
              <ul>
                <li>Podeliti svoje občutke in misli v varnem in podpornem okolju.</li>
                <li>Pridobiti mnenje ali nasvet od ljudi, ki razumejo ali so šli skozi podobne izzive.</li>
                <li>Zgraditi skupnost, ki temelji na spoštovanju, razumevanju in empatiji.</li>
              </ul>
            </p>

            <v-divider class="my-4"></v-divider>
            <p>Vaša anonimnost je pri nas zagotovljena, saj želimo, da se počutite sproščeno in brez skrbi ob izražanju svojih občutkov.</p>
            <p>Pridružite se nam na TvojKoticek.si – vašem prostoru za deljenje, podporo in korak naprej k notranjemu miru.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Action Section -->
    <v-row class="mt-5">
      <v-col v-if="isLoggedIn" class="text-center">
        <v-btn color="red" large>
          <router-link class="button-link-text" to="/ask">Vprašaj</router-link>
        </v-btn>
      </v-col>
      
      <v-col v-if="!isLoggedIn" class="text-center" cols="12" sm="6" offset-sm="3">
        <v-btn class="mb-4" color="primary" large>
          <router-link class="button-link-text" to="/login">Prijava</router-link>
        </v-btn>
        <v-btn color="secondary" large>
          <router-link class="button-link-text" to="/register">Registracija</router-link>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.button-link-text {
  color: white;
  text-decoration: none;
}

.v-btn {
  width: 100%;
}
</style>
