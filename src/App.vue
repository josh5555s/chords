<template>
  <div>
    <div id="controls">
      <div class="control">
        <h3>Seconds</h3>
        <button v-on:click="tempoDown">-</button>
        <input type="text" v-model="tempo">
        <button v-on:click="tempoUp">+</button>
      </div>
      <div class="control">
       <h3>Bass</h3>
       <button @click="bassWander">{{ bassButton }}</button>
      </div>
      <div class="control">
       <h3>Inversions</h3>
       <button @click="toggleInversions">{{ inversionButton ? 'On' : 'Off' }}</button>
      </div>
    </div>
    <div id="display">
     <h1>{{ chord }}<span id="inversion" v-html="inversion"></span>{{ bass }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempo: 5,
      chord: 'Chord',
      inversion: '',
      bass: '',
      inversionButton: false,
      bassButton: 'Root',
      bassCounter: 0,
    }
  },
  methods: {
    tempoUp() {this.tempo++},
    tempoDown() {this.tempo--},
    bassWander() {
      this.bassCounter++
      if (this.bassCounter === 3) {this.bassCounter = 0;}
      if (this.bassCounter === 0) {
        this.bassButton = 'Root';
        this.bass = '';
      }
      else if (this.bassCounter === 1) {this.bassButton = 'Triad';}
      else if (this.bassCounter === 2) {this.bassButton = 'Complex';}
    },
    toggleInversions() {
      this.inversionButton = !this.inversionButton;
      if (!this.inversionButton) {this.inversion = ''}
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
        if (inversion === 0) { inversion = "" }
        else if (inversion === 1) { inversion = "6".sup() }
        else if (inversion === 2) { inversion = "6".sup() + "4".sub() }

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
        console.log(bass)
        console.log(chord)
        if (bass !== '' && bass != chord) {this.bass = `/${bass}`}
        else {this.bass = ''}
        if (this.inversionButton) { this.inversion = inversion }
        if (chord !== this.chord) { 
          this.chord = chord; 
          this.sleep();
        }
        else { this.newChord(); }
        
      },
      async sleep() {
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(this.tempo * 1000)
        this.newChord();
      },
    },
    mounted() { 
      this.newChord();
    },
}

</script>

<style>
    body {
      background-color: rgb(31, 31, 31);
      color: whitesmoke;
      font-family: 'Courier New', Courier, monospace;
    }

    #controls {
      display: flex;
      justify-content: center;
    }

    .control {
      margin: 10px;
    }

    .control h3 {
      margin: 2px;
    }

    div {
      margin-top: 50px;
      text-align: center;
    }

    input {
      width: 20px;
    }

    h1 {
      margin: 0px;
      font-size: 80px;
    }

    #inversion {
      font-size: 60px;
    }
</style>
