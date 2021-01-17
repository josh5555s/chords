// If both the chord and the inversion are the same after the refresh, refresh again

// Transition direction mode. Gives up or down arrow signaling to move up or down to the next chord

// Turn into a vue app
//  - Tempo selection
//  - Meter selection, eg. none, 4/4, 3/4, 6/8
//  - Flashing background option for visual metronome
//  - Toggle wandering bass mode
//  - Toggle transition direction

function refresh() {
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

  let bass = getRandomInt(6)
  if (bass === 0) { bass = "I" }
  else if (bass === 1) { bass = "ii" }
  else if (bass === 2) { bass = "iii" }
  else if (bass === 3) { bass = "IV" }
  else if (bass === 4) { bass = "V" }
  else if (bass === 5) { bass = "vi" }

  if (bass !== chord) { chord = `${chord}/${bass}` }

  document.getElementById("chord").innerText = chord;
  document.getElementById("inversion").innerText = inversion;
}

refresh()
setInterval(() => {
  refresh()
}, 10000);