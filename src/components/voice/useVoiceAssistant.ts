import { useState, useEffect, useRef, useCallback } from 'react';

export interface VoiceAssistantState {
  isListening: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  isThinking: boolean;
  speechRate: number; // 0.8, 1.0, 1.2
  transcript: string;
  lastResponse: string;
  hasSpeechRecognition: boolean;
  hasSpeechSynthesis: boolean;
  error: string | null;
}

export const useVoiceAssistant = (options?: {
  currentLessonTitle?: string;
  currentCode?: string;
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [transcript, setTranscript] = useState<string>('');
  const [lastResponse, setLastResponse] = useState<string>(
    'Bonjour ! Je suis votre Professeur CSS Quest. Posez-moi vos questions à la voix ou avec les boutons rapides ci-dessous : demandez un indice, une analogie pour débutant ou une explication ligne par ligne.'
  );
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check browser API support
  const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const hasSpeechRecognition =
    typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  // Initialize SpeechSynthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Speak text in French
  const speakText = useCallback(
    (text: string) => {
      if (!synthRef.current) return;

      // Stop any current utterance
      synthRef.current.cancel();
      setIsPaused(false);

      const cleanText = text.replace(/[{}`*#_]/g, ' ');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'fr-FR';
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      // Try selecting a French voice if available
      const voices = synthRef.current.getVoices();
      const frenchVoice = voices.find((v) => v.lang.startsWith('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      currentUtteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    },
    [speechRate]
  );

  // Stop speaking immediately
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  // Pause / Resume commands
  const pauseSpeaking = useCallback(() => {
    if (synthRef.current && isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resumeSpeaking = useCallback(() => {
    if (synthRef.current && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  // Repeat last message
  const repeatLastMessage = useCallback(() => {
    if (lastResponse) {
      speakText(lastResponse);
    }
  }, [lastResponse, speakText]);

  // Change speed
  const adjustSpeechRate = useCallback(
    (newRate: number) => {
      setSpeechRate(newRate);
      if (isSpeaking && lastResponse) {
        stopSpeaking();
        // Re-speak at new rate
        setTimeout(() => {
          const u = new SpeechSynthesisUtterance(lastResponse.replace(/[{}`*#_]/g, ' '));
          u.lang = 'fr-FR';
          u.rate = newRate;
          synthRef.current?.speak(u);
        }, 100);
      }
    },
    [isSpeaking, lastResponse, stopSpeaking]
  );

  // Query tutor endpoint
  const askProfessor = useCallback(
    async (
      messageText: string,
      action: 'why' | 'beginner' | 'hint' | 'example' | 'explain_code' | 'chat' = 'chat'
    ) => {
      setIsThinking(true);
      setError(null);
      stopSpeaking();

      try {
        const res = await fetch('/api/tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: messageText,
            action,
            context: {
              currentLessonTitle: options?.currentLessonTitle,
              currentCode: options?.currentCode,
            },
          }),
        });

        const data = await res.json();
        const reply = data.reply || data.fallbackReply || "Je n'ai pas pu formuler d'explication pour l'instant.";
        setLastResponse(reply);
        speakText(reply);
      } catch (err: any) {
        console.error('Error contacting tutor:', err);
        let fallback = "Astuce CSS Quest : Pensez à vérifier le modèle de boîte (box-sizing: border-box) et l'alignement sur le conteneur parent !";
        if (action === 'hint') {
          fallback = "Indice : Observez le conteneur parent. Avez-vous pensé à déclarer display: flex ou display: grid avant d'utiliser gap ou justify-content ?";
        } else if (action === 'beginner') {
          fallback = "Voyez le CSS comme la peinture et l'agencement des pièces : le HTML pose les briques, et le CSS dispose les meubles harmonieusement !";
        }
        setLastResponse(fallback);
        speakText(fallback);
      } finally {
        setIsThinking(false);
      }
    },
    [options?.currentLessonTitle, options?.currentCode, speakText, stopSpeaking]
  );

  // Voice command detector
  const handleVoiceCommand = useCallback(
    (spokenText: string) => {
      const lower = spokenText.toLowerCase().trim();

      if (lower.includes('répéter') || lower.includes('repete')) {
        repeatLastMessage();
        return;
      }
      if (lower.includes('pause') || lower.includes('mettre en pause')) {
        pauseSpeaking();
        return;
      }
      if (lower.includes('reprendre') || lower.includes('continue')) {
        resumeSpeaking();
        return;
      }
      if (lower.includes('ralentir') || lower.includes('plus lent')) {
        adjustSpeechRate(0.8);
        return;
      }
      if (lower.includes('plus vite') || lower.includes('accélérer')) {
        adjustSpeechRate(1.2);
        return;
      }
      if (lower.includes('stop') || lower.includes('tais-toi') || lower.includes('arrêter')) {
        stopSpeaking();
        return;
      }

      // Default : ask question to AI
      askProfessor(spokenText, 'chat');
    },
    [repeatLastMessage, pauseSpeaking, resumeSpeaking, adjustSpeechRate, stopSpeaking, askProfessor]
  );

  // Start voice recognition
  const startListening = useCallback(() => {
    if (!hasSpeechRecognition) {
      setError(
        "La reconnaissance vocale n'est pas supportée par votre navigateur. Vous pouvez utiliser la saisie texte ou les questions suggérées."
      );
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        if (event.results[0].isFinal) {
          setIsListening(false);
          handleVoiceCommand(currentTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setError('Autorisation du microphone refusée. Vous pouvez poser vos questions par écrit.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start recognition:', err);
      setIsListening(false);
    }
  }, [hasSpeechRecognition, handleVoiceCommand]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    isPaused,
    isThinking,
    speechRate,
    setSpeechRate: adjustSpeechRate,
    transcript,
    lastResponse,
    hasSpeechRecognition,
    hasSpeechSynthesis,
    error,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    repeatLastMessage,
    askProfessor,
  };
};
