import React, { useState, useEffect } from 'react'
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core'
import { motion, AnimatePresence } from 'framer-motion'
import { PuzzleTile } from '../types'
import { CheckCircle, Sparkles } from 'lucide-react'

interface PuzzleBoardProps {
  imageUrl: string
  onComplete: () => void
  onMove: () => void
}

const GRID_SIZE = 3
const TILE_COUNT = GRID_SIZE * GRID_SIZE

function getBackgroundPosition(index: number) {
  const row = Math.floor(index / GRID_SIZE)
  const col = index % GRID_SIZE
  return `${(col * 100) / (GRID_SIZE - 1)}% ${(row * 100) / (GRID_SIZE - 1)}%`
}

// Enhanced Draggable puzzle piece in the frame
function FramePiece({ tile, idx, isCorrect }: { 
  tile: PuzzleTile; 
  idx: number; 
  isCorrect: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging: dndDragging } = useDraggable({
    id: `piece-${idx}`,
    data: { idx },
  })
  
  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`relative w-full h-full rounded-xl border-2 overflow-hidden cursor-grab select-none transition-all duration-300 ${
        isCorrect 
          ? 'border-green-400/60 bg-green-400/10 shadow-lg shadow-green-400/20' 
          : 'border-white/40 bg-white/10 hover:border-white/60'
      } ${dndDragging ? 'z-50' : ''}`}
      animate={{
        x: transform?.x || 0,
        y: transform?.y || 0,
        scale: dndDragging ? 1.15 : isCorrect ? 1.02 : 1,
        rotate: dndDragging ? 5 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      whileHover={!isCorrect ? { scale: 1.05, y: -2 } : {}}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${tile.imageUrl})`,
          backgroundPosition: tile.backgroundPosition,
          backgroundSize: '300% 300%',
        }}
      />
      
      {/* Correct position indicator */}
      {isCorrect && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <CheckCircle className="w-4 h-4 text-white" />
        </motion.div>
      )}
      
      {/* Glow effect when dragging */}
      {dndDragging && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: '0 0 30px rgba(255, 105, 180, 0.6)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  )
}

// Enhanced Droppable frame slot
function FrameSlot({ idx, children, isOver, isCorrect }: { 
  idx: number; 
  children: React.ReactNode; 
  isOver: boolean;
  isCorrect: boolean;
}) {
  const { setNodeRef } = useDroppable({
    id: `slot-${idx}`,
  })
  
  return (
    <motion.div
      ref={setNodeRef}
      className={`relative w-full h-full rounded-xl border-2 flex items-center justify-center overflow-hidden transition-all duration-300 ${
        isCorrect 
          ? 'border-green-400/60 bg-green-400/10 ring-2 ring-green-400/30' 
          : isOver 
            ? 'border-love-pink/80 bg-love-pink/20 ring-4 ring-love-pink/40' 
            : 'border-white/40 bg-white/10'
      }`}
      animate={{ 
        scale: isOver ? 1.08 : isCorrect ? 1.02 : 1,
        y: isOver ? -4 : 0
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
      
      {/* Drop indicator */}
      {isOver && !isCorrect && (
        <motion.div
          className="absolute inset-0 bg-love-pink/20 rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sparkles className="w-8 h-8 text-love-pink" />
        </motion.div>
      )}
    </motion.div>
  )
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ imageUrl, onComplete, onMove }) => {
  const [frameTiles, setFrameTiles] = useState<number[]>([])
  const [tiles, setTiles] = useState<PuzzleTile[]>([])
  const [overIdx, setOverIdx] = useState<number | null>(null)
  const [isShuffling, setIsShuffling] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const newTiles: PuzzleTile[] = []
    for (let i = 0; i < TILE_COUNT; i++) {
      newTiles.push({
        id: i,
        position: i,
        correctPosition: i,
        imageUrl,
        backgroundPosition: getBackgroundPosition(i),
      })
    }
    const shuffled = [...Array(TILE_COUNT).keys()].sort(() => Math.random() - 0.5)
    setTiles(newTiles)
    setFrameTiles(shuffled)
    setIsShuffling(true)
    setTimeout(() => setIsShuffling(false), 800)
  }, [imageUrl])

  // Calculate progress
  useEffect(() => {
    const correctTiles = frameTiles.filter((id, idx) => id === idx).length
    setProgress((correctTiles / TILE_COUNT) * 100)
  }, [frameTiles])

  // DnD event handlers
  function handleDragStart(event: any) {
    // activeIdx is not used, so we can remove this function or just leave it empty
  }
  
  function handleDragOver(event: any) {
    const overId = event.over?.id
    if (typeof overId === 'string' && overId.startsWith('slot-')) {
      const idx = parseInt(overId.replace('slot-', ''))
      setOverIdx(idx)
    } else {
      setOverIdx(null)
    }
  }
  
  function handleDragEnd(event: DragEndEvent) {
    setOverIdx(null)
    const { active, over } = event
    if (!active || !over) return
    const fromIdx = parseInt(String(active.id).replace('piece-', ''))
    const toIdx = parseInt(String(over.id).replace('slot-', ''))
    if (fromIdx !== toIdx) {
      setFrameTiles(prev => {
        const newTiles = [...prev]
        // swap
        const temp = newTiles[fromIdx]
        newTiles[fromIdx] = newTiles[toIdx]
        newTiles[toIdx] = temp
        onMove()
        return newTiles
      })
    }
  }

  useEffect(() => {
    if (!isShuffling && frameTiles.every((id, idx) => id === idx)) {
      onComplete()
    }
  }, [frameTiles, isShuffling, onComplete])

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        {/* Progress Bar */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 font-medium">Progress</span>
            <span className="text-white font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-love-pink to-love-red rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Enhanced Puzzle Frame */}
        <motion.div
          className="relative grid grid-cols-3 grid-rows-3 gap-3 bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 shadow-2xl w-96 h-96 min-w-[24rem] min-h-[24rem]"
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-love-pink/20 to-love-purple/20 rounded-3xl blur-xl" />
          
          {frameTiles.map((tileId, idx) => {
            const isCorrect = tileId === idx
            return (
              <FrameSlot 
                key={idx} 
                idx={idx} 
                isOver={overIdx === idx}
                isCorrect={isCorrect}
              >
                <FramePiece 
                  tile={tiles[tileId]} 
                  idx={idx} 
                  isCorrect={isCorrect}
                />
              </FrameSlot>
            )
          })}
          
          {/* Shuffling overlay */}
          <AnimatePresence>
            {isShuffling && (
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-white text-xl font-semibold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  Shuffling...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-white/80 text-sm">
            💡 Drag and drop pieces to arrange them in the correct order
          </p>
        </motion.div>
      </div>
    </DndContext>
  )
}

export default PuzzleBoard 