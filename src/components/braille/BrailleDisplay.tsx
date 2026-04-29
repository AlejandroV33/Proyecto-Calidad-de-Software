/**
 * @fileoverview Componente para mostrar texto Braille transcribido
 * @author Kevin Palacios
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { BrailleSymbol } from './BrailleSymbol';
import { BrailleOutput } from '@/types/braille';
import { Button } from '@/components/ui/Button';
import { Download, Eye, Settings, Grid, List } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BrailleDisplayProps {
  /** Resultado de la transcripción a mostrar */
  transcriptionResult: BrailleOutput;
  
  /** Clases CSS adicionales */
  className?: string;
  
  /** Callback para exportar resultados */
  onExport?: (format: 'text' | 'json' | 'pdf') => void;
}

/**
 * Componente que muestra el resultado de la transcripción Braille
 * Permite diferentes modos de visualización y exportación
 */
export const BrailleDisplay: React.FC<BrailleDisplayProps> = ({
  transcriptionResult,
  className,
  onExport
}) => {
  const [displayMode, setDisplayMode] = useState<'dots' | 'binary' | 'unicode'>('dots');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSettings, setShowSettings] = useState(false);
  
  const { symbols, tokens, brailleText, statistics } = transcriptionResult;
  
  /**
   * Renderiza los símbolos en modo grid
   */
  const renderGridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {symbols.map((symbol, index) => (
        <div
          key={index}
          className="flex flex-col items-center space-y-2"
        >
          <BrailleSymbol
            dots={symbol.dots}
            size="md"
            displayMode={displayMode}
            interactive
            onClick={() => {
              // Future: show symbol details
            }}
          />
          <span className="text-xs text-gray-600 font-mono">
            {symbol.character}
          </span>
        </div>
      ))}
    </div>
  );
  
  /**
   * Renderiza los símbolos en modo lista horizontal
   */
  const renderListView = () => (
    <div className="flex flex-wrap gap-3 p-4">
      {symbols.map((symbol, index) => (
        <div
          key={index}
          className="flex items-center space-x-2"
        >
          <BrailleSymbol
            dots={symbol.dots}
            size="sm"
            displayMode={displayMode}
          />
          <span className="text-sm text-gray-600 font-mono">
            {symbol.character}
          </span>
        </div>
      ))}
    </div>
  );
  
  /**
   * Renderiza la vista de texto plano
   */
  const renderTextView = () => (
    <div className="p-4 bg-gray-50 rounded-lg">
      <pre className="font-mono text-sm whitespace-pre-wrap break-all">
        {brailleText}
      </pre>
    </div>
  );
  
  /**
   * Renderiza las estadísticas
   */
  const renderStatistics = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-blue-900 mb-3">
        Estadísticas de Transcripción
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Caracteres totales</div>
          <div className="font-semibold text-blue-900">
            {statistics.totalCharacters}
          </div>
        </div>
        <div>
          <div className="text-gray-600">Símbolos Braille</div>
          <div className="font-semibold text-blue-900">
            {statistics.totalSymbols}
          </div>
        </div>
        <div>
          <div className="text-gray-600">No reconocidos</div>
          <div className="font-semibold text-red-600">
            {statistics.unrecognizedCharacters}
          </div>
        </div>
        <div>
          <div className="text-gray-600">Tiempo procesamiento</div>
          <div className="font-semibold text-blue-900">
            {statistics.processingTime.toFixed(2)}ms
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className={cn('bg-white rounded-lg shadow-lg border border-gray-200', className)}>
      {/* Header con controles */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Resultado Braille
            </h2>
            <p className="text-sm text-gray-600">
              {symbols.length} símbolos generados
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Controles de visualización */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={displayMode === 'dots' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDisplayMode('dots')}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant={displayMode === 'binary' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDisplayMode('binary')}
              >
                101
              </Button>
              <Button
                variant={displayMode === 'unicode' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDisplayMode('unicode')}
              >
                Br
              </Button>
            </div>
            
            {/* Controles de vista */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Exportación */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport?.('text')}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panel de configuración */}
      {showSettings && (
        <div className="border-b border-gray-200 p-4 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Opciones de Exportación
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport?.('text')}
            >
              Exportar como Texto
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport?.('json')}
            >
              Exportar como JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport?.('pdf')}
            >
              Exportar como PDF
            </Button>
          </div>
        </div>
      )}
      
      {/* Contenido principal */}
      <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
        {displayMode === 'unicode' ? (
          renderTextView()
        ) : viewMode === 'grid' ? (
          renderGridView()
        ) : (
          renderListView()
        )}
      </div>
      
      {/* Estadísticas */}
      <div className="border-t border-gray-200 p-4">
        {renderStatistics()}
      </div>
    </div>
  );
};

export default BrailleDisplay;
