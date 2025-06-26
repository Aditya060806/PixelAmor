import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trophy, RotateCcw, Star, Share2, Download } from 'lucide-react'

interface CompletionModalProps {
  moves: number
  time: number | null
  onRestart: () => void
}

const CompletionModal: React.FC<CompletionModalProps> = ({ moves, time, onRestart }) => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    // Create heart particles
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))
    setHearts(newHearts)
    
    // Show stats after a delay
    setTimeout(() => setShowStats(true), 500)
  }, [])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getMessage = () => {
    const messages = [
      "You're absolutely amazing! 💖",
      "Perfect match! Love wins! 💕",
      "You're a puzzle master! 💝",
      "Made with love! You did it! 💗",
      "You're incredible! Love is in the air! 💓",
      "You're a star! ⭐️💖",
      "Love conquers all! 💘",
      "You're magical! ✨💖"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const getPerformanceRating = () => {
    if (!time) return { rating: 'Amazing', color: 'text-green-400', icon: '🌟' }
    const timeInSeconds = time / 1000
    const efficiency = moves / timeInSeconds
    
    if (efficiency < 0.5) return { rating: 'Perfect', color: 'text-yellow-400', icon: '👑' }
    if (efficiency < 1) return { rating: 'Excellent', color: 'text-green-400', icon: '🌟' }
    if (efficiency < 2) return { rating: 'Great', color: 'text-blue-400', icon: '⭐' }
    return { rating: 'Good', color: 'text-purple-400', icon: '💫' }
  }

  const performance = getPerformanceRating()

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Enhanced Heart Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-love-pink text-2xl"
            style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.8],
              y: [-20, -120],
              rotate: [0, 360]
            }}
            transition={{
              delay: heart.delay,
              duration: 4,
              ease: "easeOut"
            }}
          >
            <Heart className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Enhanced Modal Content */}
      <motion.div
        className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 max-w-lg w-full text-center shadow-2xl border border-white/30 overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-love-pink/10 to-love-purple/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,105,180,0.1),transparent_50%)]" />
        
        {/* Enhanced Celebration Icon */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-love-pink to-love-red rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <motion.div
              className="absolute -inset-2 bg-gradient-to-br from-love-pink to-love-red rounded-full blur opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Enhanced Title */}
        <motion.h2
          className="relative text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Puzzle Complete! 🎉
        </motion.h2>

        {/* Enhanced Message */}
        <motion.p
          className="relative text-xl text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {getMessage()}
        </motion.p>

        {/* Performance Rating */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-love-pink/20 to-love-purple/20 px-6 py-3 rounded-2xl border border-love-pink/30">
            <span className="text-2xl">{performance.icon}</span>
            <span className={`text-lg font-bold ${performance.color}`}>
              {performance.rating} Performance
            </span>
          </div>
        </motion.div>

        {/* Enhanced Stats */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-love-pink/20 to-love-red/20 rounded-2xl p-6 border border-love-pink/30 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-love-pink to-love-red rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">Moves</span>
                </div>
                <div className="text-3xl font-bold text-gray-800">{moves}</div>
              </motion.div>
              
              {time && (
                <motion.div 
                  className="bg-gradient-to-br from-love-purple/20 to-love-rose/20 rounded-2xl p-6 border border-love-purple/30 shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-love-purple to-love-rose rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-600">Time</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">{formatTime(time)}</div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.button
            onClick={onRestart}
            className="flex-1 bg-gradient-to-r from-love-pink to-love-red text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Play Again
          </motion.button>
          
          <motion.button
            className="flex-1 bg-white/20 backdrop-blur-sm text-gray-700 font-semibold py-4 px-8 rounded-2xl border border-gray-300 flex items-center justify-center gap-3 hover:bg-white/30 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Share
          </motion.button>
        </motion.div>

        {/* Enhanced Floating Hearts */}
        <motion.div
          className="absolute -top-4 -left-4 w-10 h-10 bg-love-pink rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-5 h-5 text-white animate-heart-beat" />
        </motion.div>
        
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-love-red rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -5, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          <Heart className="w-4 h-4 text-white animate-heart-beat" style={{ animationDelay: '0.5s' }} />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 -left-2 w-8 h-8 bg-love-purple rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <Heart className="w-4 h-4 text-white animate-heart-beat" style={{ animationDelay: '1s' }} />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-4 -right-4 w-10 h-10 bg-love-rose rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -8, 0]
          }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1.5 }}
        >
          <Heart className="w-5 h-5 text-white animate-heart-beat" style={{ animationDelay: '1.5s' }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default CompletionModal 