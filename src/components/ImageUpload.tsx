import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon, Sparkles, Camera, FileImage, Heart } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file!')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB!')
      return
    }

    setIsProcessing(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setPreviewUrl(imageUrl)
      
      // Create a canvas to crop the image to square
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Make it square by using the smaller dimension
        const size = Math.min(img.width, img.height)
        canvas.width = size
        canvas.height = size

        // Calculate cropping position (center the image)
        const offsetX = (img.width - size) / 2
        const offsetY = (img.height - size) / 2

        // Draw the cropped image
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size)

        // Convert to blob and create URL
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedUrl = URL.createObjectURL(blob)
            setTimeout(() => {
              onImageUpload(croppedUrl)
              setIsProcessing(false)
            }, 1000) // Add a small delay for better UX
          }
        }, 'image/jpeg', 0.9)
      }
      img.src = imageUrl
    }
    reader.readAsDataURL(file)
  }, [onImageUpload])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center mb-6 md:mb-8">
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-2xl border border-white/20 mb-3 md:mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-love-pink to-love-red rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/90 font-medium">Create Your Love Puzzle</span>
        </motion.div>
        
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Upload Your Image
        </motion.h2>
        <motion.p 
          className="text-sm md:text-base text-white/80 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Choose a beautiful image to create your love puzzle! 💖
        </motion.p>
      </div>

      <motion.div
        className={`relative group ${isDragging ? 'dragover' : ''} w-full max-w-xs md:max-w-md mx-auto`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-4 md:p-6 border-2 border-dashed border-white/40 transition-all duration-300 hover:border-white/60 hover:bg-white/15 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-love-pink/10 to-love-purple/10 rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,105,180,0.1),transparent_50%)]" />
          
          {isDragging && (
            <motion.div
              className="absolute inset-0 bg-love-pink/20 backdrop-blur-sm rounded-3xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Upload className="w-10 h-10 text-white" />
                </motion.div>
                <p className="text-2xl font-bold text-white">Drop your image here!</p>
              </div>
            </motion.div>
          )}
        
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative"
              animate={{ 
                rotate: isDragging ? 5 : 0,
                scale: isDragging ? 1.02 : 1
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-love-pink/20 to-love-red/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-2xl">
                  <Upload className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <motion.div
                  className="absolute -top-4 -right-4 w-10 h-10 bg-love-pink rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 w-8 h-8 bg-love-purple rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <div className="text-center">
              <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
                {isDragging ? 'Drop your image here!' : 'Click to upload or drag & drop'}
              </h3>
              <p className="text-white/70 text-xs md:text-sm mb-1 md:mb-2">
                Supports JPG, PNG, GIF • Max 10MB
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                <motion.button
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 group text-sm md:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span className="text-white font-semibold">Choose File</span>
                </motion.button>
                
                <motion.button
                  className="flex items-center gap-2 bg-gradient-to-r from-love-pink to-love-red px-3 md:px-4 py-1.5 md:py-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group text-sm md:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileImage className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span className="text-white font-semibold">Browse Images</span>
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {previewUrl && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-white" />
                    </div>
                    
                    {isProcessing && (
                      <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="text-center">
                          <motion.div
                            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <p className="text-white text-sm font-medium">Processing...</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-white/80 text-center mt-3 font-medium">
                    {isProcessing ? 'Processing your image...' : 'Image ready!'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-6 md:mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-lg mx-auto">
          <h4 className="text-lg font-semibold text-white mb-3">💡 Pro Tips</h4>
          <ul className="text-white/70 text-sm space-y-2 text-left">
            <li>• Choose images with clear details for the best puzzle experience</li>
            <li>• High contrast images work great for puzzle solving</li>
            <li>• Square images will be automatically cropped to fit</li>
            <li>• You can restart anytime to try a different image</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ImageUpload 