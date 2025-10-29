import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, ShoppingCart, MessageCircle, Package, TrendingUp, Users, DollarSign, Eye, Heart, Share2, X, ChevronRight, Star, Zap, Award, Check, Sparkles } from 'lucide-react';

const FridaCatalog = () => {
  // Product data with inventory
  const products = [
    {
      id: 1,
      name: "NoseFrida Aspirador Nasal",
      category: "nasal",
      image: "https://i.ibb.co/sJDFRvGz/FB-Nose-Fridasolo-Thumbnail-badgeupdate3-992x-progressive-4.webp",
      description: "El aspirador nasal #1 recomendado por pediatras. Diseño higiénico y efectivo para aliviar la congestión nasal del bebé.",
      features: ["Recomendado por pediatras", "Higiénico", "Sin BPA"],
      badge: "Bestseller",
      price: 450,
      stock: 24,
      sold: 156,
      rating: 4.9
    },
    {
      id: 2,
      name: "Kit Ultimate Baby Essentials",
      category: "kits",
      image: "https://i.ibb.co/Q3rzP4cB/Ultimate-Baby-Kit-B0-BLCTTMRB-Frame-1-992x-progressive-3.webp",
      description: "Kit completo con todos los esenciales para el cuidado del bebé. Incluye 10+ productos premium.",
      features: ["Kit completo", "10+ productos", "Regalo perfecto"],
      badge: "Premium",
      price: 2850,
      stock: 8,
      sold: 42,
      rating: 5.0
    },
    {
      id: 3,
      name: "Electric NoseFrida 2.0",
      category: "nasal",
      image: "https://i.ibb.co/GvNYyZ69/Electric-Nose-Frida-2-0-A-Frame-1-992x-progressive-3.webp",
      description: "Versión eléctrica del famoso aspirador nasal. 3 niveles de succión para máxima efectividad.",
      features: ["Eléctrico", "3 niveles", "Silencioso"],
      price: 1250,
      stock: 15,
      sold: 89,
      rating: 4.8
    },
    {
      id: 4,
      name: "3 en 1 Humidificador + Purificador",
      category: "sleep",
      image: "https://i.ibb.co/Y7K93ZXh/3-in-1-Sound-Machine-Air-Purifier-Nightlight-B08-Q2-R8-KQ7-Frame-1-992x-progressive.webp",
      description: "Máquina de sonido, purificador de aire y luz nocturna en un solo dispositivo.",
      features: ["3 en 1", "Sonidos relajantes", "Purifica el aire"],
      badge: "Innovación",
      price: 1890,
      stock: 12,
      sold: 67,
      rating: 4.7
    },
    {
      id: 5,
      name: "Cortaúñas Eléctrico",
      category: "grooming",
      image: "https://i.ibb.co/8LY11rTc/Electric-Nail-Trimmer-1-992x-progressive-2.webp",
      description: "Cortaúñas eléctrico ultra seguro con luz LED. Ideal para recién nacidos.",
      features: ["Luz LED", "Ultra seguro", "Silencioso"],
      price: 680,
      stock: 31,
      sold: 103,
      rating: 4.6
    },
    {
      id: 6,
      name: "Kit Baby Basics",
      category: "kits",
      image: "https://i.ibb.co/X0VQWJM/Baby-Basics-Kit-B07-BYLG8-R8-Frame-1-1-992x-progressive-1.webp",
      description: "Kit esencial con productos básicos de higiene y cuidado del bebé.",
      features: ["Esenciales", "Alta calidad", "Compacto"],
      price: 1450,
      stock: 18,
      sold: 94,
      rating: 4.7
    },
    {
      id: 7,
      name: "Humidificador BreatheFrida XL",
      category: "sleep",
      image: "https://i.ibb.co/HWrw0s1/FB-Humi-XL-Hero-CAN-992x-progressive-3.webp",
      description: "Humidificador de gran capacidad con tecnología de vapor frío.",
      features: ["XL capacidad", "Vapor frío", "12h duración"],
      price: 1350,
      stock: 9,
      sold: 51,
      rating: 4.8
    },
    {
      id: 8,
      name: "Push & Pop Alimentador",
      category: "grooming",
      image: "https://i.ibb.co/FbZs4M3F/Push-Pop-Feeder-Vibrant-Teal-1ct-Hero-992x-progressive-1.webp",
      description: "Alimentador de frutas innovador para introducir sólidos de forma segura.",
      features: ["Seguro", "Fácil limpieza", "Sin BPA"],
      price: 320,
      stock: 45,
      sold: 178,
      rating: 4.5
    },
    {
      id: 9,
      name: "Spray Nasal con Solución Salina",
      category: "nasal",
      image: "https://i.ibb.co/hx3QjX3P/FB-Nose-Frida-Saline-Rinse-Digital-Shelf-Ecomm-1-992x-progressive-1.webp",
      description: "Spray nasal suave con solución salina natural para aliviar la congestión.",
      features: ["Natural", "Suave", "0+ meses"],
      price: 280,
      stock: 52,
      sold: 234,
      rating: 4.6
    },
    {
      id: 10,
      name: "Vapor Rub Eucalipto",
      category: "health",
      image: "https://i.ibb.co/x8134tXc/202307-FBVapor-Rub-Eucalyptus-Digital-Shelfv1copy-992x-progressive.webp",
      description: "Bálsamo calmante con eucalipto para aliviar la congestión y mejorar el sueño.",
      features: ["Eucalipto natural", "Calmante", "3+ meses"],
      price: 380,
      stock: 38,
      sold: 145,
      rating: 4.7
    }
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  // Categories
  const categories = [
    { id: 'all', name: 'Todos', icon: '📦', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'nasal', name: 'Cuidado Nasal', icon: '👃', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'bath', name: 'Baño', icon: '🛁', color: 'bg-gradient-to-r from-teal-500 to-green-500' },
    { id: 'grooming', name: 'Aseo', icon: '✨', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { id: 'health', name: 'Salud', icon: '💊', color: 'bg-gradient-to-r from-red-500 to-pink-500' },
    { id: 'sleep', name: 'Sueño', icon: '🌙', color: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
    { id: 'kits', name: 'Kits', icon: '🎁', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
  ];

  // Stats calculation
  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    totalSold: products.reduce((sum, p) => sum + p.sold, 0),
    revenue: products.reduce((sum, p) => sum + (p.sold * p.price), 0),
    lowStock: products.filter(p => p.stock < 10).length,
    topSeller: products.reduce((max, p) => p.sold > max.sold ? p : max, products[0])
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    switch(sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.sold - a.sold);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'stock':
        filtered.sort((a, b) => a.stock - b.stock);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortBy]);

  // WhatsApp integration
  const sendWhatsApp = (message) => {
    const phone = "50494840343";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Add to cart
  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-pink-50 z-50 overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard ColorPlay
            </h2>
            <p className="text-gray-600 mt-1">Análisis en tiempo real - Frida Baby Collection</p>
          </div>
          <button onClick={() => setShowDashboard(false)} 
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-12 h-12 text-purple-500" />
              <span className="text-2xl font-bold">{stats.totalProducts}</span>
            </div>
            <p className="text-gray-600">Productos Totales</p>
            <div className="mt-2 text-sm text-green-600">+12% este mes</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-12 h-12 text-blue-500" />
              <span className="text-2xl font-bold">{stats.totalSold}</span>
            </div>
            <p className="text-gray-600">Unidades Vendidas</p>
            <div className="mt-2 text-sm text-green-600">+24% este mes</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-12 h-12 text-green-500" />
              <span className="text-2xl font-bold">L{(stats.revenue / 1000).toFixed(1)}K</span>
            </div>
            <p className="text-gray-600">Ingresos Totales</p>
            <div className="mt-2 text-sm text-green-600">+18% este mes</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-200">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-12 h-12 text-red-500" />
              <span className="text-2xl font-bold text-red-600">{stats.lowStock}</span>
            </div>
            <p className="text-gray-600">Inventario Bajo</p>
            <div className="mt-2 text-sm text-red-600">Requiere atención</div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Top 5 Productos Más Vendidos
          </h3>
          <div className="space-y-4">
            {products.sort((a, b) => b.sold - a.sold).slice(0, 5).map((product, idx) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sold} vendidos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">L{(product.sold * product.price).toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={() => sendWhatsApp("Solicito reporte completo de inventario Frida Baby")}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <MessageCircle className="w-8 h-8 mb-2" />
            <p className="font-bold">Exportar a WhatsApp</p>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <Package className="w-8 h-8 mb-2" />
            <p className="font-bold">Ordenar Inventario</p>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <TrendingUp className="w-8 h-8 mb-2" />
            <p className="font-bold">Análisis Avanzado</p>
          </button>
        </div>
      </div>
    </div>
  );

  // Product Modal
  const ProductModal = () => {
    if (!selectedProduct) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="relative">
            <img src={selectedProduct.image} alt={selectedProduct.name} 
              className="w-full h-96 object-cover rounded-t-3xl" />
            <button onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg">
              <X className="w-6 h-6" />
            </button>
            {selectedProduct.badge && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedProduct.sold} vendidos</span>
                  <span>•</span>
                  <span className={selectedProduct.stock < 10 ? 'text-red-600 font-bold' : 'text-green-600'}>
                    {selectedProduct.stock} en stock
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-600">L{selectedProduct.price}</p>
                <p className="text-sm text-gray-500">Precio exclusivo ColorPlay</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{selectedProduct.description}</p>

            <div className="mb-6">
              <h3 className="font-bold mb-3 text-lg">Características Premium:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map(feature => (
                  <span key={feature} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => {
                addToCart(selectedProduct);
                setShowModal(false);
              }} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button onClick={() => {
                sendWhatsApp(`Hola ColorPlay! Me interesa ordenar: ${selectedProduct.name}`);
              }} className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Ordenar WhatsApp
              </button>
              <button onClick={() => toggleFavorite(selectedProduct.id)}
                className="bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                Favorito
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FRIDA BABY
                </h1>
                <p className="text-sm text-gray-600">Colección Premium • ColorPlay Honduras</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setShowDashboard(true)}
                className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl hover:shadow-lg transition-all">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </button>
              <button onClick={() => setShowCart(true)}
                className="relative p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl hover:shadow-lg transition-all">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button onClick={() => sendWhatsApp("Hola ColorPlay! Me interesa el catálogo Frida Baby")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="hidden md:inline">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 text-sm">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {stats.totalProducts} Productos
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Envío Express 24h
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Distribuidor Exclusivo
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos Frida Baby..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="popular">Más Vendidos</option>
              <option value="rating">Mejor Valorados</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="stock">Stock Bajo Primero</option>
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedCategory === cat.id 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <div key={product.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              onClick={() => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
              style={{ animationDelay: `${idx * 50}ms` }}>
              
              <div className="relative">
                <img src={product.image} alt={product.name} 
                  className="w-full h-56 object-cover" />
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </span>
                )}
                {product.stock < 10 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    ¡Últimas {product.stock}!
                  </span>
                )}
                <button onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-lg">
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{product.sold} vendidos</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 2).map(feature => (
                    <span key={feature} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">L{product.price}</span>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    sendWhatsApp(`Orden rápida: ${product.name}`);
                  }} className="bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-xl hover:shadow-lg transition-all">
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* Floating WhatsApp Button */}
      <button onClick={() => sendWhatsApp("Hola ColorPlay! Necesito ayuda con el catálogo Frida Baby")}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-30">
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Modals */}
      {showModal && <ProductModal />}
      {showDashboard && <Dashboard />}
    </div>
  );
};

export default FridaCatalog;