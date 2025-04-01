const synth = window.speechSynthesis;
        let voices = [];
        
        function populateVoices() {
            voices = synth.getVoices();
            const voiceSelect = document.getElementById('voiceSelect');
            voiceSelect.innerHTML = '';
            voices.forEach(voice => {
                const option = document.createElement('option');
                option.value = voice.name;
                option.textContent = `${voice.name} (${voice.lang})`;
                voiceSelect.appendChild(option);
            });
        }
        
        function speak() {
            const text = document.getElementById('text').value;
            const utterance = new SpeechSynthesisUtterance(text);
            const selectedVoice = document.getElementById('voiceSelect').value;
            utterance.voice = voices.find(voice => voice.name === selectedVoice);
            utterance.rate = document.getElementById('rate').value;
            utterance.pitch = document.getElementById('pitch').value;
            synth.speak(utterance);
        }
        
        function downloadAudio() {
            alert("Downloading MP3");
        }
        
        window.speechSynthesis.onvoiceschanged = populateVoices;