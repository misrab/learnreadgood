import { useCallback, useEffect, useRef, useState } from 'react'

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
  const [voicesReady, setVoicesReady] = useState(
    () => window.speechSynthesis.getVoices().length > 0
  )
  const [speaking, setSpeaking] = useState(false)
  const timerRef = useRef<number>(0)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (voicesReady) return
    const synth = window.speechSynthesis
    const onVoicesChanged = () => {
      if (synth.getVoices().length > 0) setVoicesReady(true)
    }
    synth.addEventListener('voiceschanged', onVoicesChanged)
    // Poll fallback — some browsers never fire voiceschanged
    const poll = setInterval(() => {
      if (synth.getVoices().length > 0) {
        setVoicesReady(true)
        clearInterval(poll)
      }
    }, 100)
    return () => {
      synth.removeEventListener('voiceschanged', onVoicesChanged)
      clearInterval(poll)
    }
  }, [voicesReady])

  const speak = useCallback((text: string, lang = 'ar-SA', rate = 0.8) => {
    const synth = window.speechSynthesis
    synth.cancel()
    clearTimeout(timerRef.current)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    const voice = getBestVoice(lang)
    if (voice) utterance.voice = voice

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    utteranceRef.current = utterance

    // Short timer lets the browser finish processing cancel() before speaking.
    // Unlike the old double-rAF approach, setTimeout fires reliably even when
    // the tab is throttled or the main thread is busy.
    timerRef.current = window.setTimeout(() => synth.speak(utterance), 10)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
      window.speechSynthesis.cancel()
    }
  }, [])

  return { speak, voicesReady, speaking }
}
