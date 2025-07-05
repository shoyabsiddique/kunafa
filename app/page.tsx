"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, Play, ShoppingBag, Utensils, Wine, Bookmark, User, Mic, ThumbsDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const chocolates = [
  {
    id: 1,
    name: "DARK TRUFFLE",
    subtitle: "PREMIUM COLLECTION",
    rank: "#1 Best Seller",
    rating: 4.9,
    chef: "Master Chocolatier Emma",
    chefTitle: "Swiss Chocolate Expert",
    description:
      "Rich 85% dark chocolate truffle with Madagascar vanilla ganache center, handcrafted with premium Belgian cocoa",
    likes: 156,
    image: "/placeholder.svg?height=300&width=300&text=Dark+Truffle",
    color: "from-amber-700 to-orange-800",
  },
  {
    id: 2,
    name: "MILK CARAMEL",
    subtitle: "ARTISAN SERIES",
    rank: "#2 Most Loved",
    rating: 4.8,
    chef: "Chef Marcus Brown",
    chefTitle: "Caramel Specialist",
    description:
      "Creamy milk chocolate filled with salted caramel made from French butter and Madagascar vanilla beans",
    likes: 142,
    image: "/placeholder.svg?height=300&width=300&text=Milk+Caramel",
    color: "from-orange-600 to-amber-700",
  },
  {
    id: 3,
    name: "WHITE RASPBERRY",
    subtitle: "LUXURY LINE",
    rank: "#3 Premium Choice",
    rating: 4.7,
    chef: "Chocolatier Sophie",
    chefTitle: "Berry Fusion Expert",
    description: "Delicate white chocolate infused with freeze-dried raspberries and a hint of rose water",
    likes: 128,
    image: "/placeholder.svg?height=300&width=300&text=White+Raspberry",
    color: "from-rose-400 to-pink-600",
  },
  {
    id: 4,
    name: "HAZELNUT PRALINE",
    subtitle: "CLASSIC COLLECTION",
    rank: "#4 Traditional Favorite",
    rating: 4.6,
    chef: "Master Pierre",
    chefTitle: "Praline Artisan",
    description: "Traditional milk chocolate with roasted Italian hazelnuts and smooth praline cream center",
    likes: 98,
    image: "/placeholder.svg?height=300&width=300&text=Hazelnut+Praline",
    color: "from-amber-600 to-yellow-700",
  },
  {
    id: 5,
    name: "ESPRESSO DARK",
    subtitle: "COFFEE SERIES",
    rank: "#5 Coffee Lover's Choice",
    rating: 4.5,
    chef: "Barista Chocolatier Ana",
    chefTitle: "Coffee Chocolate Expert",
    description: "Intense dark chocolate blended with premium espresso beans and a touch of cinnamon",
    likes: 87,
    image: "/placeholder.svg?height=300&width=300&text=Espresso+Dark",
    color: "from-stone-800 to-amber-900",
  },
  {
    id: 6,
    name: "RUBY PASSION",
    subtitle: "EXOTIC COLLECTION",
    rank: "#6 Unique Creation",
    rating: 4.4,
    chef: "Innovation Chef Luna",
    chefTitle: "Ruby Chocolate Pioneer",
    description: "Rare ruby chocolate with passion fruit ganache and crystallized ginger pieces",
    likes: 76,
    image: "/placeholder.svg?height=300&width=300&text=Ruby+Passion",
    color: "from-rose-600 to-red-700",
  },
]

const menuItems = [
  { name: "Dark Truffle", subtitle: "premium", image: "/placeholder.svg?height=60&width=60&text=Truffle" },
  { name: "Milk Caramel", subtitle: "artisan", image: "/placeholder.svg?height=60&width=60&text=Caramel" },
  { name: "White Berry", subtitle: "luxury", image: "/placeholder.svg?height=60&width=60&text=Berry" },
  { name: "Hazelnut", subtitle: "classic", image: "/placeholder.svg?height=60&width=60&text=Hazelnut" },
]

export default function ChocolateCarousel() {
  const [currentChocolateIndex, setCurrentChocolateIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showingInfo, setShowingInfo] = useState(false)
  const [pausedChocolates, setPausedChocolates] = useState<Set<number>>(new Set())

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setRotation((prev) => {
          const newRotation = prev + 0.8

          // Check each chocolate to see if it's at a pause position
          chocolates.forEach((_, index) => {
            const chocolateAngle = (newRotation + (index * 360) / chocolates.length) % 360
            const normalizedAngle = chocolateAngle < 0 ? chocolateAngle + 360 : chocolateAngle

            // Pause only at the center bottom position (270 degrees)
            const centerPosition = 270

            if (Math.abs(normalizedAngle - centerPosition) < 2 && !pausedChocolates.has(index)) {
              // This chocolate has reached a pause position
              setIsPaused(true)
              setCurrentChocolateIndex(index)
              setShowingInfo(true)
              setPausedChocolates((prev) => new Set([...prev, index]))

              // Show info for 3 seconds, then continue
              setTimeout(() => {
                setShowingInfo(false)
                setTimeout(() => {
                  setIsPaused(false)
                }, 500)
              }, 3000)
            }
          })

          // Reset paused chocolates when we complete a full rotation
          if (newRotation % 360 < 10) {
            setPausedChocolates(new Set())
          }

          return newRotation
        })
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isPaused, pausedChocolates])

  // Responsive radius and center positioning - moved up significantly
  const getResponsiveValues = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight

      // Adjust radius based on screen size
      let radius = 300 // Base radius for mobile
      if (width >= 768) radius = 350 // Tablet
      if (width >= 1024) radius = 400 // Desktop
      if (width >= 1440) radius = 450 // Large desktop

      // Center the carousel horizontally and move it up so products appear in center screen
      const centerX = width < 1024 ? width / 2 : (width * 0.6) / 2 // Account for sidebar on desktop
      const centerY = -radius * 0.3 // Move the center point way up so the bottom arc (products) appear in screen center

      return { radius, centerX, centerY }
    }

    // Default values for SSR
    return { radius: 400, centerX: 400, centerY: -120 }
  }

  const { radius, centerX, centerY } = getResponsiveValues()

  const getItemPosition = (index: number, totalItems: number) => {
    const angle = (rotation + (index * 360) / totalItems) * (Math.PI / 180)
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    const scale = 0.6 + 0.4 * Math.sin(angle) // Scale based on position (larger at bottom)
    const zIndex = Math.round(50 + 50 * Math.sin(angle))

    return { x, y, scale, zIndex, angle }
  }

  const handleItemClick = (index: number) => {
    setCurrentChocolateIndex(index)
    setIsPaused(false)
    setShowingInfo(false)
  }

  const currentChocolate = chocolates[currentChocolateIndex]
  const displayChocolate = showingInfo ? currentChocolate : chocolates[currentChocolateIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
      {/* Background Chocolate Texture */}
      <div className="absolute inset-0 opacity-15">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Chocolate+Background"
          alt="Chocolate background"
          fill
          className="object-cover"
        />
      </div>

      {/* Rich chocolate decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-amber-800 rounded-full opacity-30 blur-sm"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-orange-800 rounded-full opacity-25 blur-sm"></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-red-800 rounded-full opacity-20 blur-sm"></div>
      <div className="absolute top-60 left-1/3 w-8 h-8 bg-yellow-700 rounded-full opacity-15 blur-sm"></div>
      <div className="absolute bottom-60 right-1/3 w-14 h-14 bg-amber-700 rounded-full opacity-25 blur-sm"></div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center space-x-4">
          <div className="text-2xl lg:text-3xl font-bold text-amber-200">🍫</div>
          <div className="text-lg lg:text-xl font-bold text-amber-100">ChocolateHaven</div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-amber-200 hover:bg-amber-800/50">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-amber-200 hover:bg-amber-800/50">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        {/* Main Carousel Area - Full width on mobile, left side on desktop */}
        <div className="flex-1 relative overflow-hidden">
          {/* Circular Carousel Container */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              {chocolates.map((chocolate, index) => {
                const position = getItemPosition(index, chocolates.length)

                // Check if this chocolate is currently at a pause position
                const normalizedAngle = ((position.angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
                const angleDegrees = (normalizedAngle * 180) / Math.PI
                const centerPosition = 270
                const isAtPausePosition = Math.abs(angleDegrees - centerPosition) < 10

                const isCurrentlyPaused = isAtPausePosition && isPaused && index === currentChocolateIndex

                // Only show items that are in the visible arc (bottom half of circle)
                const isVisible = normalizedAngle > Math.PI / 4 && normalizedAngle < (7 * Math.PI) / 4

                if (!isVisible) return null

                // Responsive item size
                const itemSize =
                  typeof window !== "undefined" && window.innerWidth < 768 ? "w-32 h-32" : "w-40 h-40 lg:w-48 lg:h-48"

                return (
                  <motion.div
                    key={chocolate.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: position.x - (typeof window !== "undefined" && window.innerWidth < 768 ? 64 : 96),
                      top: position.y - (typeof window !== "undefined" && window.innerWidth < 768 ? 64 : 96),
                      zIndex: position.zIndex,
                    }}
                    animate={{
                      scale: isCurrentlyPaused ? position.scale * 1.3 : position.scale,
                      opacity: position.scale > 0.3 ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleItemClick(index)}
                    whileHover={{ scale: position.scale * 1.1 }}
                    whileTap={{ scale: position.scale * 0.95 }}
                  >
                    <div
                      className={`relative ${itemSize} rounded-full overflow-hidden shadow-2xl border-2 lg:border-4 border-amber-200 bg-gradient-to-br ${chocolate.color} p-1 lg:p-2 ${
                        isCurrentlyPaused ? "ring-2 lg:ring-4 ring-yellow-400 ring-opacity-80 shadow-yellow-400/60" : ""
                      } ${isAtPausePosition && !isPaused ? "ring-1 lg:ring-2 ring-amber-300 ring-opacity-60" : ""}`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
                        <Image
                          src={chocolate.image || "/placeholder.svg"}
                          alt={chocolate.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Rating badge for all chocolates at pause positions */}
                      {isAtPausePosition && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-amber-100 rounded-full p-1 lg:p-2 shadow-lg"
                        >
                          <div
                            className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r ${chocolate.color} flex items-center justify-center text-white font-bold text-xs lg:text-sm shadow-lg`}
                          >
                            {chocolate.rating}
                          </div>
                        </motion.div>
                      )}

                      {/* Pause indicator */}
                      {isCurrentlyPaused && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute inset-0 bg-amber-900/30 rounded-full flex items-center justify-center"
                        >
                          <div className="w-12 h-12 lg:w-16 lg:h-16 border-2 lg:border-4 border-amber-200 rounded-full flex items-center justify-center">
                            <motion.div
                              className="w-8 h-8 lg:w-12 lg:h-12 border-2 lg:border-4 border-amber-200 border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, ease: "linear" }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Chocolate Name Label */}
                    <motion.div
                      className="absolute -bottom-8 lg:-bottom-12 right-2 transform -translate-x-1/2 text-center w-24 lg:w-32"
                      animate={{
                        opacity: position.scale > 0.7 ? 1 : 0,
                        scale: isCurrentlyPaused ? 1.1 : 1,
                      }}
                    >
                      <p
                        className={`text-xs lg:text-sm font-bold text-center ${isCurrentlyPaused ? "text-yellow-300" : "text-amber-200"}`}
                      >
                        {chocolate.name}
                      </p>
                      <p className={`text-xs text-center ${isCurrentlyPaused ? "text-yellow-400" : "text-amber-300"}`}>
                        {chocolate.subtitle}
                      </p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Center Info Display - Shows when paused - positioned in the middle of screen */}
          <AnimatePresence>
            {showingInfo && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-50"
                style={{ left: typeof window !== "undefined" && window.innerWidth >= 1024 ? "30%" : "50%" }}
              >
                <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-2xl max-w-xs lg:max-w-md border-2 lg:border-4 border-amber-600 mx-4">
                  <Badge variant="secondary" className="mb-2 lg:mb-3 text-xs lg:text-sm bg-amber-700 text-amber-100">
                    {displayChocolate.rank}
                  </Badge>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl lg:text-3xl font-light text-amber-800 mb-1 lg:mb-2"
                  >
                    {displayChocolate.name}
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg lg:text-2xl font-bold text-amber-900 mb-3 lg:mb-4"
                  >
                    {displayChocolate.subtitle}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 lg:mb-4"
                  >
                    <Button className="flex items-center space-x-2 bg-amber-800 hover:bg-amber-900 text-amber-100 text-sm lg:text-base">
                      <Play className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>Watch Recipe</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 border-amber-800 text-amber-800 hover:bg-amber-100 bg-transparent text-sm lg:text-base"
                    >
                      <ShoppingBag className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span>Order Now</span>
                    </Button>
                  </motion.div>

                  {/* Progress indicator */}
                  <motion.div
                    className="w-full bg-amber-200 rounded-full h-1 lg:h-2 mt-3 lg:mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className={`bg-gradient-to-r ${displayChocolate.color} h-1 lg:h-2 rounded-full`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Menu Carousel */}
          <div className="absolute bottom-4 lg:bottom-20 left-1/2 transform -translate-x-1/2 z-40">
            <div className="flex items-center space-x-2 lg:space-x-4 bg-amber-100/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-2 lg:p-4 shadow-lg border border-amber-600">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex-shrink-0 text-center cursor-pointer p-2 lg:p-3 rounded-lg transition-all ${
                    index === currentChocolateIndex % menuItems.length
                      ? "bg-amber-200 shadow-md scale-105"
                      : "hover:bg-amber-150"
                  }`}
                  onClick={() => handleItemClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full overflow-hidden mx-auto mb-1 border border-amber-600">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-xs font-medium text-amber-900 hidden sm:block">{item.name}</p>
                  <p className="text-xs text-amber-800 hidden lg:block">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Details Panel (Hidden on mobile, visible on desktop) */}
        <div className="hidden lg:block lg:w-96 bg-gradient-to-b from-amber-100/95 to-orange-100/95 backdrop-blur-sm shadow-xl relative z-30 border-l border-amber-600">
          <div className="p-8 h-full">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" className="border-amber-800 text-amber-800 bg-amber-200">
                  Details
                </Button>
                <Button variant="ghost" size="sm" className="text-amber-800 hover:bg-amber-200">
                  Ingredients
                </Button>
              </div>

              <motion.div
                key={displayChocolate.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`bg-gradient-to-r ${displayChocolate.color} text-white rounded-2xl px-4 py-2 text-2xl font-bold shadow-lg`}
                  >
                    {displayChocolate.rating}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1 text-amber-900">{displayChocolate.chef}</h3>
                  <p className="text-amber-800 text-sm mb-3">{displayChocolate.chefTitle}</p>
                  <p className="text-amber-900 text-sm leading-relaxed">{displayChocolate.description}</p>
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-amber-800 hover:bg-amber-200"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{displayChocolate.likes} loves</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-amber-800 hover:bg-amber-200">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Decorative Chocolate Bar */}
            <div className="absolute bottom-8 right-8">
              <div className="w-12 h-16 bg-gradient-to-b from-amber-800 to-amber-900 rounded-sm relative shadow-lg">
                <div className="absolute top-1 left-1 right-1 h-2 bg-amber-700 rounded-sm"></div>
                <div className="absolute top-4 left-1 right-1 h-2 bg-amber-700 rounded-sm"></div>
                <div className="absolute top-7 left-1 right-1 h-2 bg-amber-700 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-50 flex items-center justify-center space-x-4 lg:space-x-8 p-4 lg:p-6 bg-amber-100/90 backdrop-blur-sm border-t border-amber-600">
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-200">
          <Utensils className="h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-200">
          <Wine className="h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-200">
          <Bookmark className="h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-200">
          <User className="h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
        <Button size="icon" className="rounded-full bg-amber-800 hover:bg-amber-900 shadow-lg text-amber-100">
          <Mic className="h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
      </div>
    </div>
  )
}
