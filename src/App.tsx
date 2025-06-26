import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RotateCcw, Trophy, Home } from 'lucide-react'
import PuzzleBoard from './components/PuzzleBoard'
import ImageUpload from './components/ImageUpload'
import CompletionModal from './components/CompletionModal'
import HeartParticles from './components/HeartParticles'

function App() {
  const [gameState, setGameState] = useState<'upload' | 'playing' | 'completed'>('upload')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [moves, setMoves] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [completionTime, setCompletionTime] = useState<number | null>(null)

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setGameState('playing')
    setMoves(0)
    setStartTime(Date.now())
    setShowCompletion(false)
  }

  const handlePuzzleComplete = () => {
    setGameState('completed')
    setCompletionTime(Date.now() - (startTime || 0))
    setShowCompletion(true)
  }

  const handleRestart = () => {
    setGameState('upload')
    setSelectedImage(null)
    setMoves(0)
    setStartTime(null)
    setCompletionTime(null)
    setShowCompletion(false)
  }

  const handleMove = () => {
    setMoves(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-pink via-love-red to-love-purple bg-size-400 animate-gradient overflow-hidden relative">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-love-pink/20 via-love-red/20 to-love-purple/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,105,180,0.1),transparent_50%)]" />
      <HeartParticles />
      
      {/* Enhanced Header with Better Visual Hierarchy */}
      <motion.header 
        className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <motion.div 
              className="flex items-center gap-3 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                  <Heart className="w-7 h-7 text-white animate-heart-beat" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-love-pink to-love-red rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  PixelAmor
                </h1>
                <p className="text-xs md:text-sm text-white/70 font-medium">
                  Pixel-perfect love 💖
                </p>
              </div>
            </motion.div>
            
            {/* Social Media Links */}
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.p
                className="text-xs text-white/80 font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Developed By
              </motion.p>
              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com/Aditya060806"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:bg-white/25 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-love-pink transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/adityapandey_06/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:bg-white/25 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-white group-hover:text-love-pink transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
            
            {/* Enhanced Game Stats */}
            {gameState === 'playing' && (
              <motion.div 
                className="flex items-center gap-3 md:gap-6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {/* Moves Counter */}
                <motion.div 
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-love-pink to-love-red rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/70 font-medium">Moves</p>
                    <p className="text-lg font-bold text-white">{moves}</p>
                  </div>
                </motion.div>

                {/* Timer */}
                {startTime && (
                  <motion.div 
                    className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-love-purple to-love-rose rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs text-white/70 font-medium">Time</p>
                      <p className="text-lg font-bold text-white">
                        {Math.floor((Date.now() - startTime) / 1000)}s
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Restart Button */}
                <motion.button
                  onClick={handleRestart}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg hover:bg-white/25 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-white font-semibold hidden md:block">Restart</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Enhanced Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-2 md:px-4 pt-12 md:pt-16 pb-8 md:pb-12">
        <AnimatePresence mode="wait">
          {gameState === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-md md:max-w-lg mx-auto"
            >
              <ImageUpload onImageUpload={handleImageUpload} />
            </motion.div>
          )}

          {gameState === 'playing' && selectedImage && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-lg md:max-w-xl mx-auto"
            >
              <PuzzleBoard 
                imageUrl={selectedImage}
                onComplete={handlePuzzleComplete}
                onMove={handleMove}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Enhanced Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <CompletionModal
            moves={moves}
            time={completionTime}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Floating Action Button for Mobile */}
      {gameState === 'playing' && (
        <motion.div
          className="fixed bottom-6 right-6 z-30 md:hidden"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <motion.button
            onClick={handleRestart}
            className="w-14 h-14 bg-gradient-to-br from-love-pink to-love-red rounded-full shadow-2xl flex items-center justify-center border-2 border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default App 