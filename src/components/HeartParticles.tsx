import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

interface HeartParticle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
  rotation: number
  type: 'heart' | 'sparkle'
}

const HeartParticles: React.FC = () => {
  const [particles, setParticles] = useState<HeartParticle[]>([])

  useEffect(() => {
    // Create initial particles with more variety
    const initialParticles: HeartParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.3, // 0.3 to 1.1
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 5, // 5 to 9 seconds
      opacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
      rotation: Math.random() * 360,
      type: Math.random() > 0.7 ? 'sparkle' : 'heart'
    }))
    setParticles(initialParticles)

    // Add new particles periodically with different types
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticle: HeartParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.8 + 0.3,
          delay: 0,
          duration: Math.random() * 4 + 5,
          opacity: Math.random() * 0.6 + 0.2,
          rotation: Math.random() * 360,
          type: Math.random() > 0.7 ? 'sparkle' : 'heart'
        }
        return [...prev.slice(-19), newParticle] // Keep max 20 particles
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size * 24}px`,
            opacity: particle.opacity
          }}
          initial={{ 
            opacity: 0, 
            scale: 0, 
            y: 0, 
            rotate: particle.rotation,
            filter: 'blur(0px)'
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0, 1.3, 1, 0.7],
            y: [-20, -150],
            rotate: [particle.rotation, particle.rotation + 360],
            filter: ['blur(0px)', 'blur(1px)', 'blur(0px)']
          }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 4 + 3
          }}
        >
          {particle.type === 'heart' ? (
            <motion.div
              className="text-love-pink"
              animate={{ 
                scale: [1, 1.2, 1],
                filter: ['drop-shadow(0 0 5px rgba(255,105,180,0.3))', 'drop-shadow(0 0 15px rgba(255,105,180,0.6))', 'drop-shadow(0 0 5px rgba(255,105,180,0.3))']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-full h-full" />
            </motion.div>
          ) : (
            <motion.div
              className="text-love-purple"
              animate={{ 
                scale: [1, 1.5, 1],
                filter: ['drop-shadow(0 0 3px rgba(218,112,214,0.3))', 'drop-shadow(0 0 10px rgba(218,112,214,0.6))', 'drop-shadow(0 0 3px rgba(218,112,214,0.3))']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Additional floating elements for more visual interest */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`floating-${i}`}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${10 + (i * 10)}%`,
            top: `${20 + (i * 8)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default HeartParticles 