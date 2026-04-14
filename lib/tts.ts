export const playAudio = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  // 4. Cancel Previous Speech
  window.speechSynthesis.cancel();

  // 5. Improve Pronunciation
  const processedText = text.replace(/\./g, ". ");
  const utterance = new SpeechSynthesisUtterance(processedText);

  // 2. Improve Voice Settings
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  const applyVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    
    // 1. Select a Better Voice
    let selectedVoice = voices.find(v =>
      v.name.includes("Google US English") ||
      v.name.includes("Google UK English Female") ||
      v.name.includes("Microsoft Aria") ||
      v.name.includes("Microsoft Jenny")
    );

    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Microsoft"));
    }

    // 6. Fallback Strategy
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // 3. Ensure Voices Are Loaded
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener('voiceschanged', applyVoiceAndSpeak, { once: true });
  } else {
    applyVoiceAndSpeak();
  }
};
