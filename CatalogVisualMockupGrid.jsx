export default function CatalogVisualMockupGrid() {
  const products = [
    { name: "NailFrida", price: 299, img: "/images/catalog/nailfrida.jpg" },
    { name: "BreatheFrida Vapor Bath Bomb", price: 295, img: "/images/catalog/breathefrida.jpg" },
    { name: "Sleep Vapor Bath Bombs", price: 295, img: "/images/catalog/sleepvapor.jpg" },
    { name: "Baby Basics Kit", price: 1195, img: "/images/catalog/babybasics.jpg" },
    { name: "Gas + Colic Heating Pad", price: 750, img: "/images/catalog/gascolic.jpg" },
    { name: "Baby Grooming Kit", price: 1095, img: "/images/catalog/babygrooming.jpg" },
    { name: "Windi the Gaspasser", price: 395, img: "/images/catalog/windi.jpg" },
    { name: "Push Pop Feeder", price: 295, img: "/images/catalog/pushpop.jpg" },
    { name: "SmileFrida Finger Toothbrush", price: 195, img: "/images/catalog/smilefrida.jpg" },
    { name: "NailFrida S-Curved Nail Files", price: 395, img: "/images/catalog/nailfridafile.jpg" },
    { name: "Not-Too-Cold-To-Hold Teether", price: 295, img: "/images/catalog/teether.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 p-6">
      <header className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">
          Catalog — Grid View Mockup
        </h1>
        <p className="mt-4 text-lg text-zinc-600 max-w-3xl mx-auto">
          A clean grid layout showcasing products with images, names, and prices.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-lg transition"
          >
            <div className="aspect-square bg-zinc-50 overflow-hidden">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform"
              />
            </div>
            <div className="p-3 flex flex-col gap-1">
              <h3 className="text-sm font-medium text-zinc-800 line-clamp-2">
                {product.name}
              </h3>
              <div className="text-base font-bold text-sky-600">
                L.{product.price}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

