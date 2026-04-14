export const playAudio = (text: string, onEnd?: () => void) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel Previous Speech
  window.speechSynthesis.cancel();

  // Improve Pronunciation
  const processedText = text.replace(/\./g, ". ");
  const utterance = new SpeechSynthesisUtterance(processedText);

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  // Improve Voice Settings
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  const applyVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    
    // Select a Better Voice
    let selectedVoice = voices.find(v =>
      v.name.includes("Google US English") ||
      v.name.includes("Google UK English Female") ||
      v.name.includes("Microsoft Aria") ||
      v.name.includes("Microsoft Jenny")
    );

    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Microsoft"));
    }

    // Fallback Strategy
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Ensure Voices Are Loaded
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', applyVoiceAndSpeak, { once: true });
  } else {
    applyVoiceAndSpeak();
  }
};

export const pauseAudio = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.pause();
  }
};

export const resumeAudio = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.resume();
  }
};

export const stopAudio = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
