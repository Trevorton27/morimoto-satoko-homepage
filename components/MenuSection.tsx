"use client";

import { useState } from "react";
import GoldDivider from "./GoldDivider";
import { menuCategories } from "@/lib/menu-data";

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);

  const activeCategory = menuCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="menu" className="bg-cream py-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-2xl font-light tracking-[0.1em] text-navy lg:text-3xl">
            メニュー
          </h2>
          <GoldDivider />
          <p className="mt-2 text-sm text-navy/60">
            厳選された食材で作る、季節のお料理
          </p>
        </div>

        {/* Tabs */}
        <div
          className="mb-8 flex overflow-x-auto border-b border-navy/10"
          role="tablist"
          aria-label="メニューカテゴリー"
        >
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls={`tabpanel-${cat.id}`}
              id={`tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-6 py-3 text-sm tracking-widest transition-all duration-150 ${
                activeTab === cat.id
                  ? "border-b-2 border-gold text-navy font-medium"
                  : "text-navy/50 hover:text-navy"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div
          id={`tabpanel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
        >
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {activeCategory.items.map((item, index) => (
              <div key={item.name}>
                <div className="flex items-start justify-between py-4 px-2 gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-navy text-sm">{item.name}</p>
                    <p className="mt-0.5 text-xs text-navy/50">{item.description}</p>
                  </div>
                  <p className="flex-shrink-0 text-sm font-medium text-gold">
                    {item.price}
                  </p>
                </div>
                {index < activeCategory.items.length - 1 && (
                  <div className="h-px bg-navy/8 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
