export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "appetizers",
    label: "前菜",
    items: [
      { name: "枝豆の塩茹で", description: "シンプルな塩味の枝豆", price: "¥380" },
      { name: "冷奴", description: "豆腐、生姜、鰹節添え", price: "¥420" },
      { name: "刺身盛り合わせ", description: "本日の鮮魚三種", price: "¥1,280" },
      { name: "たこわさ", description: "新鮮なたこと本わさび", price: "¥680" },
      { name: "茶碗蒸し", description: "だしの旨みが香る上品な一品", price: "¥580" },
    ],
  },
  {
    id: "mains",
    label: "メイン",
    items: [
      { name: "鯛の塩焼き", description: "徳島産天然鯛", price: "¥1,680" },
      { name: "阿波尾鶏の唐揚げ", description: "ジューシーな地鶏", price: "¥980" },
      { name: "すだちそば", description: "徳島名産すだちを使った冷そば", price: "¥880" },
      { name: "鳴門わかめの味噌汁定食", description: "ご飯・香の物付き", price: "¥1,200" },
      { name: "天ぷら盛り合わせ", description: "旬の野菜と海老の天ぷら", price: "¥1,480" },
    ],
  },
  {
    id: "desserts",
    label: "デザート",
    items: [
      { name: "抹茶アイス", description: "京都産宇治抹茶使用", price: "¥480" },
      { name: "わらび餅", description: "きな粉・黒蜜添え", price: "¥520" },
      { name: "季節のフルーツ盛り合わせ", description: "本日の旬のフルーツ", price: "¥680" },
    ],
  },
  {
    id: "drinks",
    label: "ドリンク",
    items: [
      { name: "日本酒（一合）", description: "徳島地酒各種", price: "¥680" },
      { name: "生ビール", description: "サッポロ黒ラベル", price: "¥580" },
      { name: "梅酒ソーダ割り", description: "自家製梅酒", price: "¥520" },
      { name: "すだちサワー", description: "徳島産すだち生搾り", price: "¥550" },
      { name: "煎茶（ポット）", description: "国産一番摘み", price: "¥380" },
    ],
  },
];
