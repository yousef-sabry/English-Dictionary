
const searchInput = document.getElementById('searchInput');
const resultBox = document.getElementById('result');
const wordDisplay = document.getElementById('word');
const phoneticDisplay = document.getElementById('phonetic');
const partOfSpeechDisplay = document.getElementById('partOfSpeech');
const definitionDisplay = document.getElementById('definition');
const exampleDisplay = document.getElementById('example');
const errorMsg = document.getElementById('error');
const playAudioBtn = document.getElementById('playAudio');
let audio;

function searchWord() {
  const word = searchInput.value.trim();
  if (!word) return;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) throw new Error('Word not found');
      return response.json();
    })
    .then(data => {
      const entry = data[0];
      const meaning = entry.meanings[0];
      const definition = meaning.definitions[0];

      wordDisplay.textContent = entry.word;
      phoneticDisplay.textContent = entry.phonetic || 'N/A';
      partOfSpeechDisplay.textContent = meaning.partOfSpeech || 'N/A';
      definitionDisplay.textContent = definition.definition || 'N/A';
      exampleDisplay.textContent = definition.example || 'No example available';

      if (entry.phonetics && entry.phonetics[0] && entry.phonetics[0].audio) {
        audio = new Audio(entry.phonetics[0].audio);
        playAudioBtn.style.display = 'inline-block';
      } else {
        playAudioBtn.style.display = 'none';
      }

      resultBox.classList.remove('hidden');
      errorMsg.classList.add('hidden');
    })
    .catch(error => {
      errorMsg.textContent = '❌ Could not find the word.';
      errorMsg.classList.remove('hidden');
      resultBox.classList.add('hidden');
    });
}

playAudioBtn.addEventListener('click', () => {
  if (audio) audio.play();
});
