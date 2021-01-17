<template>
    <div id="controls">
      <button v-on:click="tempoDown">-</button>
      <input type="text" v-model="tempo">
      <button v-on:click="tempoUp">+</button>
      <button @click="bassWander">{{ bass }}</button>
    </div>
    <div id="display">
    <h1 id="chord">{{ chord }}</h1>
    <h1 id="inversion">{{ inversion }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempo: 100,
      chord: 'Chord',
      inversion: 'Inversion',
      bassCounter: 0,
      bass: 'Bass: Root'
    }
  },
  methods: {
    tempoUp() {this.tempo++},
    tempoDown() {this.tempo--},
    bassWander() {
      this.bassCounter++
      if (this.bassCounter === 3) {this.bassCounter = 0;}
      if (this.bassCounter === 0) {this.bass = 'Bass: Root'; }
      else if (this.bassCounter === 1) {this.bass = 'Bass: Triad';}
      else if (this.bassCounter === 2) {this.bass = 'Bass: Complex';}
    },
    newChord() {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      let chord = getRandomInt(6)
      if (chord === 0) { chord = "I" }
      else if (chord === 1) { chord = "ii" }
      else if (chord === 2) { chord = "iii" }
      else if (chord === 3) { chord = "IV" }
      else if (chord === 4) { chord = "V" }
      else if (chord === 5) { chord = "vi" }

      let inversion = getRandomInt(3)
      if (inversion === 0) { inversion = "Root" }
      else if (inversion === 1) { inversion = "1st" }
      else if (inversion === 2) { inversion = "2nd" }

      let bass;
      if (this.bassCounter === 2) {
        bass = getRandomInt(6)
        if (bass === 0) { bass = "I" }
        else if (bass === 1) { bass = "ii" }
        else if (bass === 2) { bass = "iii" }
        else if (bass === 3) { bass = "IV" }
        else if (bass === 4) { bass = "V" }
        else if (bass === 5) { bass = "vi" }
      } 
      else if (this.bassCounter === 1) {
        bass = getRandomInt(2)
        if (chord === "I") {
          if (bass === 0) { bass = "I" }
          else if (bass === 1) { bass = "iii" }
          else if (bass === 2) { bass = "V" }
        } 
        else if (chord === "ii") {
           if (bass === 0) { bass = "ii" }
          else if (bass === 1) { bass = "IV" }
          else if (bass === 2) { bass = "vi" }
        }
        else if (chord === "iii") {
           if (bass === 0) { bass = "iii" }
          else if (bass === 1) { bass = "V" }
          else if (bass === 2) { bass = "vii" }
        }
        else if (chord === "IV") {
           if (bass === 0) { bass = "IV" }
          else if (bass === 1) { bass = "vi" }
          else if (bass === 2) { bass = "I" }
        }
        else if (chord === "V") {
           if (bass === 0) { bass = "V" }
          else if (bass === 1) { bass = "vii" }
          else if (bass === 2) { bass = "ii" }
        }
        else if (chord === "vi") {
           if (bass === 0) { bass = "vi" }
          else if (bass === 1) { bass = "I" }
          else if (bass === 2) { bass = "iii" }
        }
      }
      else if (this.bassCounter === 0) {
        bass = '';
      }

      if (bass !== chord && bass !== '') { chord = `${chord}/${bass}` }

      this.chord = chord;
      this.inversion = inversion; 
    }
  },
  mounted() { 
    setInterval(() => {
        this.newChord();
      }, 5000)
  },
}

</script>

<style>
    body {
      background-color: rgb(31, 31, 31);
      color: whitesmoke;
      font-family: 'Courier New', Courier, monospace;
    }

    div {
      margin-top: 50px;
      text-align: center;
    }

    h1 {
      margin: 0px;
    }
</style>
