import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RotateCcw, Trophy, Settings, Home } from 'lucide-react'
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