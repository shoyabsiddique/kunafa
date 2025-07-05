"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, Play, ShoppingBag, Utensils, Wine, Bookmark, User, Mic, ThumbsDown, Heart, Star, Award, Clock, MapPin, Phone, Mail, Instagram, Facebook, Twitter, ChefHat, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
    price: "$24.99",
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
    price: "$22.99",
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
    price: "$26.99",
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
    price: "$21.99",
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
    price: "$23.99",
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
    price: "$28.99",
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

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    content: "The most exquisite chocolates I've ever tasted. Each piece is a work of art that melts perfectly on your tongue.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=Sarah"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Pastry Chef",
    content: "ChocolateHaven sets the gold standard for artisanal chocolates. Their attention to detail is unmatched.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=Michael"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Chocolate Enthusiast",
    content: "I've tried chocolates from around the world, but nothing compares to the quality and flavor here.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=Emma"
  }
]

const awards = [
  { year: "2024", title: "Best Artisan Chocolate", organization: "International Chocolate Awards" },
  { year: "2023", title: "Premium Quality Excellence", organization: "Gourmet Food Association" },
  { year: "2023", title: "Innovation in Chocolate Making", organization: "Culinary Masters Guild" },
  { year: "2022", title: "Sustainable Sourcing Award", organization: "Fair Trade Alliance" }
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-amber-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-60 left-1/3 w-16 h-16 bg-gradient-to-br from-orange-200/30 to-red-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-60 right-1/3 w-28 h-28 bg-gradient-to-br from-amber-200/30 to-yellow-300/30 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-4 lg:p-6 bg-white/80 backdrop-blur-sm border-b border-amber-200/50">
        <div className="flex items-center space-x-4">
          <div className="text-3xl lg:text-4xl">🍫</div>
          <div>
            <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">ChocolateHaven</div>
            <div className="text-xs text-amber-700">Artisan Chocolates Since 1892</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-amber-800 hover:bg-amber-100">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-amber-800 hover:bg-amber-100">
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
                      className={`relative ${itemSize} rounded-full overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br ${chocolate.color} p-2 ${
                        isCurrentlyPaused ? "ring-4 ring-yellow-400 ring-opacity-80 shadow-yellow-400/60" : ""
                      } ${isAtPausePosition && !isPaused ? "ring-2 ring-amber-300 ring-opacity-60" : ""}`}
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
                          className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-amber-200"
                        >
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${chocolate.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
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
                          <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center">
                            <motion.div
                              className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, ease: "linear" }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Chocolate Name Label */}
                    <motion.div
                      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center w-32"
                      animate={{
                        opacity: position.scale > 0.7 ? 1 : 0,
                        scale: isCurrentlyPaused ? 1.1 : 1,
                      }}
                    >
                      <p
                        className={`text-sm font-bold text-center ${isCurrentlyPaused ? "text-amber-800" : "text-amber-700"}`}
                      >
                        {chocolate.name}
                      </p>
                      <p className={`text-xs text-center ${isCurrentlyPaused ? "text-amber-600" : "text-amber-600"}`}>
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
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-md border-4 border-amber-200 mx-4">
                  <Badge variant="secondary" className="mb-3 text-sm bg-amber-100 text-amber-800 border border-amber-300">
                    {displayChocolate.rank}
                  </Badge>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-light text-amber-900 mb-2"
                  >
                    {displayChocolate.name}
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-amber-800 mb-4"
                  >
                    {displayChocolate.subtitle}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4"
                  >
                    <Button className="flex items-center space-x-2 bg-amber-800 hover:bg-amber-900 text-white">
                      <Play className="h-4 w-4" />
                      <span>Watch Recipe</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 border-amber-800 text-amber-800 hover:bg-amber-100"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>{displayChocolate.price}</span>
                    </Button>
                  </motion.div>

                  {/* Progress indicator */}
                  <motion.div
                    className="w-full bg-amber-200 rounded-full h-2 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className={`bg-gradient-to-r ${displayChocolate.color} h-2 rounded-full`}
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
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-40">
            <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-amber-200">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex-shrink-0 text-center cursor-pointer p-3 rounded-lg transition-all ${
                    index === currentChocolateIndex % menuItems.length
                      ? "bg-amber-100 shadow-md scale-105 border border-amber-300"
                      : "hover:bg-amber-50"
                  }`}
                  onClick={() => handleItemClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-1 border-2 border-amber-300">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-xs font-medium text-amber-900 hidden sm:block">{item.name}</p>
                  <p className="text-xs text-amber-700 hidden lg:block">{item.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Details Panel (Hidden on mobile, visible on desktop) */}
        <div className="hidden lg:block lg:w-96 bg-white/95 backdrop-blur-sm shadow-xl relative z-30 border-l border-amber-200">
          <div className="p-8 h-full">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" className="border-amber-800 text-amber-800 bg-amber-50">
                  Details
                </Button>
                <Button variant="ghost" size="sm" className="text-amber-800 hover:bg-amber-50">
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
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(displayChocolate.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1 text-amber-900">{displayChocolate.chef}</h3>
                  <p className="text-amber-700 text-sm mb-3 flex items-center">
                    <ChefHat className="w-4 h-4 mr-1" />
                    {displayChocolate.chefTitle}
                  </p>
                  <p className="text-amber-800 text-sm leading-relaxed">{displayChocolate.description}</p>
                </div>

                <div className="flex items-center space-x-4 mb-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-amber-800 hover:bg-amber-50"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{displayChocolate.likes} loves</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-amber-800 hover:bg-amber-50">
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

      {/* About Section */}
      <section className="relative z-20 py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">Our Story</h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed">
              Since 1892, ChocolateHaven has been crafting the world's finest artisan chocolates. 
              Our master chocolatiers combine traditional techniques with innovative flavors to create 
              unforgettable experiences in every bite.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Award Winning</h3>
              <p className="text-amber-700">
                Recognized globally for our exceptional quality and innovative chocolate creations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Handcrafted</h3>
              <p className="text-amber-700">
                Every chocolate is meticulously handcrafted by our master chocolatiers with passion and precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Sustainable</h3>
              <p className="text-amber-700">
                Committed to ethical sourcing and sustainable practices that benefit cocoa farmers worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-20 py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto">
              Don't just take our word for it - hear from chocolate lovers around the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-amber-800 mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-amber-200">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-amber-900">{testimonial.name}</h4>
                        <p className="text-sm text-amber-700">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="relative z-20 py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">Awards & Recognition</h2>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by prestigious organizations worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="text-center border-amber-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-amber-900 mb-2">{award.year}</h3>
                    <h4 className="text-lg font-semibold text-amber-800 mb-2">{award.title}</h4>
                    <p className="text-sm text-amber-700">{award.organization}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 py-20 bg-gradient-to-r from-amber-900 to-orange-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-amber-100 mb-8">
                Visit our flagship store or contact us to learn more about our artisan chocolates.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-amber-300" />
                  <div>
                    <h3 className="font-semibold text-amber-100">Address</h3>
                    <p className="text-amber-200">123 Chocolate Avenue, Sweet City, SC 12345</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-amber-300" />
                  <div>
                    <h3 className="font-semibold text-amber-100">Phone</h3>
                    <p className="text-amber-200">+1 (555) 123-CHOC</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-amber-300" />
                  <div>
                    <h3 className="font-semibold text-amber-100">Email</h3>
                    <p className="text-amber-200">hello@chocolatehaven.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-amber-300" />
                  <div>
                    <h3 className="font-semibold text-amber-100">Hours</h3>
                    <p className="text-amber-200">Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button variant="outline" size="icon" className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-900">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-900">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-900">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-amber-300/30">
                <CardHeader>
                  <CardTitle className="text-white">Send us a Message</CardTitle>
                  <CardDescription className="text-amber-200">
                    We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="bg-white/20 border-amber-300/30 text-white placeholder:text-amber-200" />
                    <Input placeholder="Last Name" className="bg-white/20 border-amber-300/30 text-white placeholder:text-amber-200" />
                  </div>
                  <Input placeholder="Email" className="bg-white/20 border-amber-300/30 text-white placeholder:text-amber-200" />
                  <Input placeholder="Subject" className="bg-white/20 border-amber-300/30 text-white placeholder:text-amber-200" />
                  <Textarea placeholder="Your message..." className="bg-white/20 border-amber-300/30 text-white placeholder:text-amber-200 min-h-[120px]" />
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-amber-950 text-amber-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🍫</div>
                <div className="text-xl font-bold">ChocolateHaven</div>
              </div>
              <p className="text-amber-300 text-sm">
                Crafting the world's finest artisan chocolates since 1892.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">Our Chocolates</a></li>
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">Gift Sets</a></li>
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">Corporate Orders</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-amber-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-amber-300 text-sm mb-4">
                Subscribe to get updates on new flavors and special offers.
              </p>
              <div className="flex space-x-2">
                <Input placeholder="Your email" className="bg-amber-900/50 border-amber-700 text-white placeholder:text-amber-400" />
                <Button className="bg-amber-600 hover:bg-amber-700">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-400">
            <p>&copy; 2024 ChocolateHaven. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center space-x-8 p-6 bg-white/90 backdrop-blur-sm border-t border-amber-200">
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-100">
          <Utensils className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-100">
          <Wine className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-100">
          <Bookmark className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-amber-900 hover:bg-amber-100">
          <User className="h-6 w-6" />
        </Button>
        <Button size="icon" className="rounded-full bg-amber-800 hover:bg-amber-900 shadow-lg text-white">
          <Mic className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}