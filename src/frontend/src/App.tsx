import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { LogIn, LogOut, ShoppingCart, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { CartDrawer } from "./components/CartDrawer";
import { LoginModal } from "./components/LoginModal";
import { CartProvider, useCart } from "./contexts/CartContext";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

const PRODUCTS = [
  {
    id: 1,
    shortTitle: "15+ Premium iPhone Lightroom presets for Android!",
    title: "15+ Premium iPhone Lightroom Presets",
    description:
      "Turn your Android photos into iPhone-quality edits 📸✨ 15+ Lightroom presets in 1 click! No iPhone needed. Perfect for reels, content & Insta! 🔥",
    price: 99,
    mrp: 1499,
    discount: 93,
    bought: "500+",
    thumbnail:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/5e3da6845da7aad159d322b75365a879.png",
    detailImage:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/c19b3227c76cfdd7c4450af2474be5f8.jpg",
    cashfreeUrl: "https://payments.cashfree.com/forms/steserpenohpI",
  },
  {
    id: 2,
    shortTitle: "15000+ Lightroom presets with Lightroom Modded APK",
    title: "Lightroom Premium v10.9.6 Modded + 15000+ Presets Bundle",
    description:
      "Lightroom Premium v10.9.6 Modded 💻 with 15000+ Presets 🚀 Bundle. Unlock the ultimate photo editing experience with the Lightroom Premium v10.9.6 Modded bundle, packed with over 15000+ presets for Adobe Lightroom 💻",
    price: 199,
    mrp: 499,
    discount: 56,
    bought: "100+",
    thumbnail:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/1f5950b7b1fe5696159e612bed5ac776.png",
    detailImage:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/4ef6e869281d26d40c7d9a92e3da20f8.jpg",
    cashfreeUrl: "https://payments.cashfree.com/forms/Lightroom",
  },
  {
    id: 3,
    shortTitle: "Best Editing VFX Pack (2570+ Assets) for creators",
    title: "2570+ PNG Asset Pack (TRENDIX)",
    description:
      "Get 2570+ high-quality PNG assets for just ₹19! This all-in-one pack drops 675 fonts, 100 abstracts, 102 backgrounds, 100 brushes, 193 emojis, 7 explosions, 94 Fortnite assets, 220 FX, 110 glow effects, 200 insane thumbnail assets, 426+ editing character PNGs, 258 renders & 85 video game characters – everything you need to design fire thumbnails & graphics!",
    price: 19,
    mrp: 999,
    discount: 98,
    bought: "200+",
    thumbnail:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/64e8e69108a8eb400e55b2df74507897.png",
    detailImage:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/64e8e69108a8eb400e55b2df74507897.png",
    cashfreeUrl:
      "https://topmate.io/trendivault/1987348/pay?utm_source=public_profile&utm_campaign=trendivault",
  },
  {
    id: 4,
    shortTitle: "50 GB Mega Editing Bundle! For all types of editors",
    title: "50 GB Mega Editing Bundle",
    description:
      "Boost your creativity with the 50GB MEGA EDITING PACK! Get access to a massive bundle of editing tools and assets for Adobe Photoshop (Ps), After Effects (Ae), VN, CapCut, and more! Elevate your content game with pro-grade resources. Perfect for creators, editors, and designers!",
    price: 99,
    mrp: 999,
    discount: 90,
    bought: "150+",
    thumbnail:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/319a77a3db715e7a0f83ea2a241b8d3e.png",
    detailImage:
      "/assets/uploads/20251203_131347-019d33da-3813-734f-b5d6-87865a06d61f-2.png",
    cashfreeUrl: "https://payments.cashfree.com/forms?code=kcapb50g",
  },
  {
    id: 5,
    shortTitle: "675 GB Ultimate Graphic Designing Bundle. 10,00,000+ Assets",
    title: "TRENDIX Ultimate Graphic Designing Bundle (675 GB)",
    description:
      "Unlock the power of graphic design with the TRENDIX Ultimate Graphic Designing Bundle! 💻✨ Packed with 675 GB of top-notch tools and assets. Includes icons from popular apps like Adobe Photoshop (Ps), Premiere Pro (Pr), After Effects (Ae), Lightroom (Lr), and more! 📚💡 Elevate your design game with TRENDIX! 🔥",
    price: 199,
    mrp: 1499,
    discount: 93,
    bought: "150+",
    thumbnail:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/40e14d05ebf790f441889744f9d7fe0c.png",
    detailImage:
      "/assets/uploads/20251206_092401-019d33d9-ea99-70d8-8b10-247b069f22c0-1.png",
    cashfreeUrl: "https://payments.cashfree.com/forms?code=B675G",
  },
  {
    id: 6,
    shortTitle:
      "Learn How to generate ₹1000 to ₹100000/month via this guide (Now Free)",
    title: "Free Earning Guide – ₹1000 to ₹1,00,000/month",
    description:
      "Learn how to generate consistent income of ₹1000 to ₹1,00,000 per month with this comprehensive guide. Packed with proven strategies and methods.",
    price: 0,
    mrp: 99,
    discount: 100,
    bought: "300+",
    thumbnail:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/ed6a8bd7b85b691045e02368b5942804.png",
    detailImage:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/ed6a8bd7b85b691045e02368b5942804.png",
    cashfreeUrl: "",
    externalLink:
      "https://drive.google.com/file/d/1-h8Ela-5XEEGb_1LY5QtConTFWKdFc-C/view?usp=drivesdk",
  },
  {
    id: 7,
    shortTitle:
      "Digital Product Selling New Method 2026 – Earn in $USD, Get paid in ₹INR",
    title: "Digital Product Selling New Method 2026",
    description:
      "Earn in $USD, Get paid in ₹INR, Scale to ₹20LPA. Discover the new method for selling digital products in 2026 and scale your income to massive heights.",
    price: 99,
    mrp: 299,
    discount: 67,
    bought: "50+",
    thumbnail:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/b3ce2357413f9d683bdcf6a5ac9fbcd3.png",
    detailImage:
      "https://trendivault.my.canva.site/trendivault2/_assets/media/b3ce2357413f9d683bdcf6a5ac9fbcd3.png",
    cashfreeUrl: "",
    externalLink: "https://trendivault.my.canva.site/trendivault3",
  },
] as const;

type Product = (typeof PRODUCTS)[number];

function Navbar({
  onLoginClick,
  onCartClick,
}: {
  onLoginClick: () => void;
  onCartClick: () => void;
}) {
  const { totalItems } = useCart();
  const { identity, clear, isInitializing } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();

  const principal = isLoggedIn
    ? `${identity.getPrincipal().toString().slice(0, 8)}...`
    : null;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,0,0,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-white font-heading font-bold text-xl sm:text-2xl tracking-tight">
            Trendivault
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.instagram.com/_trendivault_?igsh=MW0ydXFhc2ljMTJvbQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            data-ocid="nav.link"
          >
            <img
              src="https://trendivault.my.canva.site/trendivault2/_assets/media/7c33557be31e4387987383ef8dd39d7c.png"
              alt="Instagram"
              className="w-7 h-7 object-contain"
            />
          </a>

          {isInitializing ? null : isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-white/70 text-sm">
                <User className="w-4 h-4" />
                <span className="font-mono text-xs">{principal}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="text-white/70 hover:text-white hover:bg-white/10 h-8 px-2"
                data-ocid="nav.button"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-1 text-xs">Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={onLoginClick}
              className="h-8 text-xs font-bold"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.5)",
                color: "white",
              }}
              data-ocid="nav.primary_button"
            >
              <LogIn className="w-3.5 h-3.5 mr-1" />
              Login
            </Button>
          )}

          <button
            type="button"
            onClick={onCartClick}
            className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors"
            data-ocid="nav.toggle"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {totalItems > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                style={{ background: "#ff0000" }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function ProductListingCard({
  product,
  onAddToCart,
}: { product: Product; onAddToCart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card-white overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      <div className="relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full badge-discount">
          {product.discount}% off
        </span>
      </div>

      <div className="p-3 flex flex-col flex-1 gap-2">
        <p
          className="text-sm font-semibold leading-snug"
          style={{ color: "#1a1a1a" }}
        >
          {product.shortTitle}
        </p>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-bold text-lg price-dark">
            {product.price === 0 ? "FREE" : `₹${product.price}`}
          </span>
          <span className="text-sm line-through price-mrp">₹{product.mrp}</span>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          className="btn-addtocart w-full text-sm"
          data-ocid={`product.primary_button.${product.id}`}
        >
          {product.price === 0 ? "Get Free" : "Add to cart"}
        </button>
      </div>
    </motion.div>
  );
}

function ProductDetailCard({
  product,
  onAddToCart,
}: { product: Product; onAddToCart: () => void }) {
  const hasCashfree = !!product.cashfreeUrl;
  const hasExternal = "externalLink" in product && !!product.externalLink;

  const handleBuyNow = () => {
    if (hasCashfree) {
      window.open(product.cashfreeUrl, "_blank");
    } else if (hasExternal) {
      window.open(
        (product as { externalLink?: string }).externalLink,
        "_blank",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-white w-full overflow-hidden shadow-card"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 lg:w-1/3 flex-shrink-0">
          <img
            src={product.detailImage}
            alt={product.title}
            className="w-full h-64 md:h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#cc0000" }}
            >
              TrendiVault
            </p>
            <h3
              className="text-lg md:text-xl font-heading font-bold mt-1"
              style={{ color: "#1a1a1a" }}
            >
              {product.title}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-desc">
            {product.description}
          </p>

          <p className="text-xs font-semibold" style={{ color: "#545454" }}>
            🔥 {product.bought} bought in past month
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold price-yellow">
              {product.price === 0 ? "FREE" : `₹${product.price}`}
            </span>
            <span className="text-base line-through price-mrp">
              ₹{product.mrp}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full badge-discount">
              {product.discount}% off
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xs font-bold">
              🔒 100% Secure Payment
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-1">
            <button
              type="button"
              onClick={onAddToCart}
              className="btn-addtocart flex-1 min-w-[120px]"
              data-ocid={`detail.primary_button.${product.id}`}
            >
              {product.price === 0 ? "Get Free" : "Add to cart"}
            </button>

            {(hasCashfree || hasExternal) && (
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn-buynow flex-1 min-w-[120px]"
                data-ocid={`detail.secondary_button.${product.id}`}
              >
                Buy Now ↗
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const DETAIL_PRODUCT_IDS = [1, 2, 3, 4, 5];

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      cashfreeUrl: product.cashfreeUrl,
      externalLink:
        "externalLink" in product
          ? (product as { externalLink?: string }).externalLink
          : undefined,
    });
    toast.success(`"${product.title}" added to cart!`, {
      style: {
        background: "#1a0000",
        color: "white",
        border: "1px solid rgba(255,0,0,0.3)",
      },
    });
  };

  const detailProducts = PRODUCTS.filter((p) =>
    DETAIL_PRODUCT_IDS.includes(p.id),
  );

  return (
    <div className="min-h-screen font-body">
      <Navbar
        onLoginClick={() => setLoginOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />

      <main>
        <section className="py-10 px-4 text-center" data-ocid="hero.section">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-block mb-4 px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              💎 Verified Digital Store – Premium Deals Inside!
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-3">
              ☟ All Trending Digital Products ☟
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto">
              ✨ All Digital Products Available Here! 🚀
            </p>
          </motion.div>
        </section>

        <section
          className="max-w-7xl mx-auto px-4 pb-12"
          data-ocid="products.section"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((product, idx) => (
              <div key={product.id} data-ocid={`products.item.${idx + 1}`}>
                <ProductListingCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </div>
        </section>

        <section
          className="max-w-5xl mx-auto px-4 pb-16 space-y-6"
          data-ocid="details.section"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-heading font-bold text-white text-center mb-8"
          >
            🌟 Featured Products
          </motion.h2>
          {detailProducts.map((product, idx) => (
            <div key={product.id} data-ocid={`detail.item.${idx + 1}`}>
              <ProductDetailCard
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            </div>
          ))}
        </section>
      </main>

      <footer
        className="py-6 px-4 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-white/50 text-sm">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white underline transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
