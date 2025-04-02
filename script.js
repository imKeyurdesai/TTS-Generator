// Text-to-Speech Generator - Basic Version
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textInput = document.getElementById('text');
    const voiceSelect = document.getElementById('voiceSelect');
    const modelSelect = document.getElementById('model');
    const rateInput = document.getElementById('rate');
    const pitchInput = document.getElementById('pitch');
    
    // Speech synthesis
    const synth = window.speechSynthesis;
    let voices = [];

    // Initialize voices
    function populateVoices() {
        voices = synth.getVoices();
        voiceSelect.innerHTML = '';
        modelSelect.innerHTML = '';

        // Get unique languages
        const languages = [...new Set(voices.map(voice => voice.lang))];

        // Populate language dropdown
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang;
            voiceSelect.appendChild(option);
        });

        // Populate voice models for default language
        updateVoiceModels();
    }

    // Update voice models based on selected language
    function updateVoiceModels() {
        const selectedLang = voiceSelect.value;
        const filteredVoices = voices.filter(voice => voice.lang === selectedLang);
        
        modelSelect.innerHTML = '';
        
        if (filteredVoices.length === 0) {
            const option = document.createElement('option');
            option.textContent = 'No voices available';
            modelSelect.appendChild(option);
            return;
        }
        
        filteredVoices.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = voice.name;
            modelSelect.appendChild(option);
        });
    }

    // language changes, update voice models
    voiceSelect.addEventListener('change', updateVoiceModels);

    // Some browsers need this event to load voices
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoices;
    }

    // Initial population if voices are already loaded
    if (voices.length > 0) {
        populateVoices();
    } else {
        // Force voices to load in some browsers
        setTimeout(populateVoices, 1000);
    }

    // Speak function
   
    window.speak = function() {
    const speakBtn = document.querySelector('.button-1');
    const originalBtnText = speakBtn.innerHTML;
    const speakingText = {
        'en': 'Speaking...',
        'es': 'Hablando...',
        'fr': 'Parle...',
        'de': 'Spricht...',
        'it': 'Parla...',
        'ja': '話しています...',
        'zh': '正在说话...',
        'hi': 'बोल रहा है...',
        'ar': 'يتحدث...',
        'ru': 'Говорит...',
        'pt': 'Falando...',
        'ko': '말하는 중...'
    };

    if (synth.speaking) {
        synth.cancel();
    }
    
    const text = textInput.value;
    if (text.trim() === '') {
        alert('Please enter some text');
        return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set utterance properties
    const selectedVoice = voices.find(voice => 
        voice.name === modelSelect.value && voice.lang === voiceSelect.value
    );
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
        // Get language code (first 2 characters)
        const langCode = selectedVoice.lang.substring(0, 2);
        // Set speaking text based on language or default to English
        const currentSpeakingText = speakingText[langCode] || speakingText['en'];
        
        utterance.onstart = function() {
            speakBtn.innerHTML = `<i class="fas fa-volume-up"></i> ${currentSpeakingText} 🗣️🗣️🗣️`;
        };
    }
    
    
    // Revert button text when speaking ends
    utterance.onend = function() {
        speakBtn.innerHTML = originalBtnText;
    };
    
    // Revert button text if there's an error
    utterance.onerror = function() {
        speakBtn.innerHTML = originalBtnText;
    };
    
    utterance.rate = parseFloat(rateInput.value);
    utterance.pitch = parseFloat(pitchInput.value);

    synth.speak(utterance);
};

    // Download function 
    window.downloadAudio = function() {
        alert('MP3 download would require server-side processing\nThis is just a simulation');
    };
});