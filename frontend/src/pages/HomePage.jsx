import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Package,
  Tags,
  Layers,
  ImageOff,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      console.log("[HomePage] Fetching data from:", API_BASE_URL);
      try {
        const [resProducts, resCategories] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);

        if (resProducts.ok) {
          const prodData = await resProducts.json();
          console.log("[HomePage] Loaded products:", prodData.length);
          setProducts(prodData);
        } else {
          console.error("[HomePage] Failed to fetch products. Status:", resProducts.status);
        }

        if (resCategories.ok) {
          const catData = await resCategories.json();
          console.log("[HomePage] Loaded categories:", catData.length);
          setCategories(catData);
        } else {
          console.error("[HomePage] Failed to fetch categories. Status:", resCategories.status);
        }
      } catch (error) {
        console.error("[HomePage] Error loading homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // จัดกลุ่มสินค้าตามหมวดหมู่ (Group products by category)
  const categorizedGroups = categories
    .map((cat) => ({
      category: cat,
      products: products.filter((p) => p.categoryId === cat.id),
    }))
    .filter((group) => group.products.length > 0);

  // สินค้าที่ไม่มีหมวดหมู่ (Uncategorized)
  const uncategorizedProducts = products.filter((p) => !p.categoryId);

  return (
    <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
      {/* 1. Hero Section (Luxury Monochrome Soft UI) */}
      <section className="relative overflow-hidden bg-white border border-neutral-200/80 rounded-3xl p-8 sm:p-14 lg:p-16 shadow-xs">
        <div className="max-w-3xl space-y-6">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold uppercase tracking-wider border border-neutral-200/60">
            <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
            <span>Monochrome Essentials • 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
            Understated Luxury. <br />
            <span className="text-neutral-400">Timeless Modernity.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-500 max-w-2xl font-normal leading-relaxed">
            สัมผัสประสบการณ์จัดการสินค้าที่ผสานความเรียบหรูสไตล์ Soft UI ขาว-ดำ
            จัดหมวดหมู่อย่างเป็นระบบ คลีน สบายตา พร้อมระบบ CRUD ที่ตอบสนองอย่างรวดเร็ว
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#showcase"
              className="btn bg-black hover:bg-neutral-800 text-white rounded-full px-7 font-medium text-sm border-none shadow-xs hover:shadow-md transition-all gap-2"
            >
              <span>Explore Showcase</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/products"
              className="btn btn-ghost bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full px-6 font-medium text-sm border border-neutral-200 transition-all gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Manage Catalog</span>
            </Link>
          </div>

          {/* Stats Ribbon */}
          <div className="pt-8 border-t border-neutral-150 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                {products.length}
              </p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mt-0.5">
                Total Products
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                {categories.length}
              </p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mt-0.5">
                Categories
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                100%
              </p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mt-0.5">
                Monochrome
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick Navigation */}
      {categories.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tags className="w-4 h-4 text-neutral-500" />
              <h2 className="text-sm uppercase tracking-widest font-semibold text-neutral-500">
                Quick Category Jump
              </h2>
            </div>
            <Link
              to="/categories"
              className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
            >
              <span>Manage All Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="#showcase"
              className="px-4 py-2 rounded-full text-xs font-medium bg-black text-white shadow-xs transition-all"
            >
              All Showcase ({products.length})
            </a>
            {categories.map((cat) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <a
                  key={cat.id}
                  href={`#category-${cat.id}`}
                  className="px-4 py-2 rounded-full text-xs font-medium bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:text-black transition-all"
                >
                  {cat.name} ({count})
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Product Showcase Grouped by Categories */}
      <section id="showcase" className="space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">
              Curated Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Products by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="btn btn-sm bg-neutral-900 hover:bg-black text-white rounded-full px-5 border-none text-xs font-medium gap-1.5 self-start sm:self-auto"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Manage All Items</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-neutral-900"></span>
          </div>
        ) : products.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-white border border-dashed border-neutral-300 rounded-3xl p-8 space-y-4">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto text-neutral-400">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              No products available yet
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              เริ่มต้นสร้างรายการสินค้าแรกของคุณ เพื่อให้ระบบนำมาจัดหมวดหมู่และแสดงในหน้านี้
            </p>
            <Link
              to="/add"
              className="btn bg-black hover:bg-neutral-800 text-white rounded-full px-6 font-medium text-sm border-none gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Product</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {/* วนลูปแสดงสินค้าตามแต่ละหมวดหมู่ (Categorized Groups) */}
            {categorizedGroups.map(({ category, products: catProducts }) => (
              <div
                key={category.id}
                id={`category-${category.id}`}
                className="space-y-6 scroll-mt-24"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-l-4 border-black pl-4">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900">
                      {category.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      {catProducts.length} items in this category
                    </p>
                  </div>
                  <Link
                    to="/products"
                    className="text-xs font-semibold text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    <span>View in Table</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Product Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}

            {/* สินค้าที่ยังไม่มีหมวดหมู่ (Uncategorized Group) */}
            {uncategorizedProducts.length > 0 && (
              <div className="space-y-6 border-l-4 border-neutral-300 pl-4">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-700">
                    General & Others
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium">
                    {uncategorizedProducts.length} items without category
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {uncategorizedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. Luxury Value Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="p-8 bg-white border border-neutral-200/80 rounded-3xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-neutral-900">
            Monochrome Purity
          </h4>
          <p className="text-sm text-neutral-500 leading-relaxed">
            ดีไซน์ขาวดำสไตล์ Luxury Soft UI มอบความเรียบหรู ไร้เสียงรบกวนทางสายตา โฟกัสเฉพาะข้อมูลสินค้าที่คุณใส่ใจ
          </p>
        </div>

        <div className="p-8 bg-white border border-neutral-200/80 rounded-3xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-neutral-900">
            Category Architecture
          </h4>
          <p className="text-sm text-neutral-500 leading-relaxed">
            ระบบจัดหมวดหมู่แบบ Relational เชื่อมโยงสินค้าเข้ากับกลุ่มอย่างเป็นระเบียบ พร้อมระบบนับจำนวนอัตโนมัติ
          </p>
        </div>

        <div className="p-8 bg-white border border-neutral-200/80 rounded-3xl shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-neutral-900">
            Production-Ready
          </h4>
          <p className="text-sm text-neutral-500 leading-relaxed">
            ขับเคลื่อนด้วย PostgreSQL, Express 5 และ React 19 พร้อมคอนฟิก Docker, Vercel SPA และ Render ครบในที่เดียว
          </p>
        </div>
      </section>

      {/* 5. Minimalist CTA Card */}
      <section className="bg-black text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-xl">
        <div className="max-w-xl mx-auto space-y-3">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to expand your catalog?
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-normal">
            เพิ่มสินค้าใหม่ หรือปรับโครงสร้างหมวดหมู่ได้อย่างรวดเร็วในไม่กี่คลิก
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/add"
            className="btn bg-white hover:bg-neutral-200 text-black rounded-full px-7 font-semibold text-sm border-none shadow-md gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            to="/categories"
            className="btn btn-ghost hover:bg-neutral-900 text-white border border-neutral-700 rounded-full px-6 font-semibold text-sm gap-2"
          >
            <Tags className="w-4 h-4" />
            <span>Manage Categories</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Sub-component: Luxury Soft UI Product Card
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:border-neutral-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Product Image */}
        <div className="h-52 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-neutral-400">
              <ImageOff className="w-10 h-10 stroke-[1.5]" />
              <span className="text-[11px] font-medium mt-1">No Image</span>
            </div>
          )}

          {/* Minimal Price Badge */}
          <div className="absolute top-3 right-3 badge bg-black text-white font-bold text-xs py-2.5 px-3 rounded-full shadow-sm border-none">
            ฿{Number(product.price).toLocaleString()}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5 space-y-2">
          {product.category && (
            <span className="badge badge-sm badge-outline border-neutral-300 text-neutral-600 font-normal text-[11px]">
              {product.category.name}
            </span>
          )}
          <h4 className="text-base font-bold text-neutral-900 truncate group-hover:text-black">
            {product.name}
          </h4>
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed h-8">
            {product.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* Action footer */}
      <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between mt-3 pt-3">
        <span className="text-[11px] text-neutral-400 font-mono">
          ID: #{product.id}
        </span>
        <Link
          to={`/edit/${product.id}`}
          className="text-xs font-semibold text-neutral-900 hover:text-black flex items-center gap-1 hover:underline"
        >
          <span>Edit Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
