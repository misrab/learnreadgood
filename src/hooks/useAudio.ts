import { useCallback, useEffect, useState } from 'react'

// Prefer native OS (localService) voices — more reliable than online Google voices
function getBestVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices()
  const langLower = lang.toLowerCase()
  const prefix = langLower.split('-')[0]

  return (
    voices.find(v => v.lang.toLowerCase() === langLower && v.localService) ??
    voices.find(v => v.lang.toLowerCase() === langLower) ??
    voices.find(v => v.lang.toLowerCase().startsWith(prefix) && v.localService) ??
    voices.find(v => v.lang.toLowerCase().startsWith(prefix)) ??
    null
  )
}

export function useAudio() {
  // Initialize synchronously — voices may already be loaded on mount
  const [voicesReady, setVoicesReady] = useState(
    () => window.speechSynthesis.getVoices().length > 0
  )

  useEffect(() => {
    if (voicesReady) return
    const synth = window.speechSynthesis
    const onVoicesChanged = () => {
      if (synth.getVoices().length > 0) setVoicesReady(true)
    }
    synth.addEventListener('voiceschanged', onVoicesChanged)
    return () => synth.removeEventListener('voiceschanged', onVoicesChanged)
  }, [voicesReady])

  const speak = useCallback((text: string, lang = 'ar-SA', rate = 0.8) => {
    const synth = window.speechSynthesis
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    const voice = getBestVoice(lang)
    if (voice) utterance.voice = voice
    // Two rAF give Chrome exactly one rendering cycle to process cancel() before speak()
    requestAnimationFrame(() => requestAnimationFrame(() => synth.speak(utterance)))
  }, [])

  return { speak, voicesReady }
}
