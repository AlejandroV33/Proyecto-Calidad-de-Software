'use client';

import React, { useState } from 'react';
import Header from '@/components/Header'
import TextInput from '@/components/braille/TextInput'
import BrailleDisplay from '@/components/braille/BrailleDisplay'
import Footer from '@/components/Footer'
import { SpanishToBrailleTranscriber } from '@/lib/braille-transcriber'
import { BrailleOutput } from '@/types/braille'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [transcriptionResult, setTranscriptionResult] = useState<BrailleOutput | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [unsupportedCharacters, setUnsupportedCharacters] = useState<string[]>([])
  
  const transcriber = new SpanishToBrailleTranscriber()
  
  /**
   * Maneja la transcripción del texto
   */
  const handleTranscribe = async () => {
    if (!inputText.trim()) return
    
    setIsProcessing(true)
    setErrors([])
    setUnsupportedCharacters([])
    
    try {
      // Validar entrada
      const isValid = transcriber.validateInput(inputText)
      if (!isValid) {
        const unsupported = transcriber.getUnrecognizedCharacters(inputText)
        setUnsupportedCharacters(unsupported)
        setErrors(['El texto contiene caracteres no soportados'])
        return
      }
      
      // Realizar transcripción
      const result = transcriber.transcribe(inputText)
      setTranscriptionResult(result)
      
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Error en la transcripción'])
    } finally {
      setIsProcessing(false)
    }
  }
  
  /**
   * Maneja la exportación de resultados
   */
  const handleExport = (format: 'text' | 'json' | 'pdf') => {
    if (!transcriptionResult) return
    
    switch (format) {
      case 'text':
        exportAsText(transcriptionResult)
        break
      case 'json':
        exportAsJSON(transcriptionResult)
        break
      case 'pdf':
        exportAsPDF(transcriptionResult)
        break
    }
  }
  
  /**
   * Exporta como archivo de texto
   */
  const exportAsText = (result: BrailleOutput) => {
    const content = `Texto Original:\n${result.originalText}\n\nTranscripción Braille:\n${result.brailleText}\n\nEstadísticas:\nCaracteres: ${result.statistics.totalCharacters}\nSímbolos: ${result.statistics.totalSymbols}\nTiempo: ${result.statistics.processingTime.toFixed(2)}ms`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'braille-transcription.txt'
    a.click()
    URL.revokeObjectURL(url)
  }
  
  /**
   * Exporta como JSON
   */
  const exportAsJSON = (result: BrailleOutput) => {
    const content = JSON.stringify(result, null, 2)
    
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'braille-transcription.json'
    a.click()
    URL.revokeObjectURL(url)
  }
  
  /**
   * Exporta como PDF (placeholder)
   */
  const exportAsPDF = (result: BrailleOutput) => {
    alert('Exportación PDF en desarrollo. Por ahora, usa la opción de texto.')
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section adaptado para el transcriptor */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transcriptor Español a
              <span className="text-blue-600"> Braille</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convierte texto español a su representación en Braille. 
              Soporta el alfabeto completo, números, vocales acentuadas y signos de puntuación.
            </p>
          </div>
          
          {/* Características principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-blue-600 text-3xl font-bold mb-2">🔤</div>
              <div className="text-gray-900 font-semibold mb-1">Alfabeto Completo</div>
              <div className="text-gray-600 text-sm">Soporta todas las letras del español</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-green-600 text-3xl font-bold mb-2">🔢</div>
              <div className="text-gray-900 font-semibold mb-1">Números</div>
              <div className="text-gray-600 text-sm">Conversión de dígitos del 0 al 9</div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-purple-600 text-3xl font-bold mb-2">✨</div>
              <div className="text-gray-900 font-semibold mb-1">Caracteres Especiales</div>
              <div className="text-gray-600 text-sm">Vocales acentuadas y signos</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección principal del transcriptor */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Panel de entrada */}
            <div className="space-y-6">
              <TextInput
                value={inputText}
                onChange={setInputText}
                onTranscribe={handleTranscribe}
                isProcessing={isProcessing}
                errors={errors}
                unsupportedCharacters={unsupportedCharacters}
                placeholder="Escribe o pega el texto en español que quieres convertir a Braille..."
                maxLength={5000}
              />
            </div>
            
            {/* Panel de resultados */}
            <div className="space-y-6">
              {transcriptionResult ? (
                <BrailleDisplay
                  transcriptionResult={transcriptionResult}
                  onExport={handleExport}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Esperando texto para transcribir
                    </h3>
                    <p className="text-gray-500">
                      Ingresa texto en el panel izquierdo y haz clic en "Transcribir"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
