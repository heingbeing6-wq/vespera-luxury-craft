import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  Star,
  Leaf,
  Sprout,
  Recycle,
  FlaskConical,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Lock,
  Sun,
  Moon,
  ArrowRight,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Heart,
  Instagram,
  Check,
  ChevronRight,
  Sparkles,
  Droplets,
  Sun as SunIcon,
  BarChart3,
  Mail,
  Send,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import soapLavender from "@/assets/soap-lavender.jpg";
import soapAmber from "@/assets/soap-amber.jpg";
import soapCitrus from "@/assets/soap-citrus.jpg";
import soapRose from "@/assets/soap-rose.jpg";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  notes: string;
  skinTypes: string[];
  fullDescription: string;
  ingredients: string[];
};

const PRODUCTS: Product[] = [
  {
    id: "fleur-de-lavande",
    name: "Fleur de Lavande",
    price: 28,
    description: "French lavender, shea butter, and organic olive oil for deep relaxation.",
    image: soapLavender,
    badge: "Best Seller",
    notes: "Lavender · Shea · Olive",
    skinTypes: ["dry", "sensitive", "normal"],
    fullDescription:
      "A serene composition of French lavender essential oil, creamy shea butter, and cold-pressed organic olive oil. Designed to calm the senses while deeply nourishing even the most delicate skin. Each bar produces a rich, velvety lather that leaves skin supple and lightly scented.",
    ingredients: [
      "Saponified Olea Europaea (Olive) Oil*",
      "Butyrospermum Parkii (Shea) Butter*",
      "Lavandula Angustifolia (Lavender) Oil*",
      "Lavender Buds",
      "Tocopherol (Vitamin E)",
    ],
  },
  {
    id: "amber-botanica",
    name: "Amber Botanica",
    price: 30,
    description: "Rich amber, warm sandalwood, and earthy cedarwood notes.",
    image: soapAmber,
    notes: "Amber · Sandalwood · Cedar",
    skinTypes: ["normal", "oily", "combination"],
    fullDescription:
      "An enveloping, warm blend of aged amber, Australian sandalwood, and Atlas cedarwood. Balanced with activated charcoal for gentle purification and castor oil for a decadent, long-lasting lather. The signature bar for quiet evenings.",
    ingredients: [
      "Saponified Cocos Nucifera (Coconut) Oil*",
      "Ricinus Communis (Castor) Seed Oil*",
      "Santalum Album (Sandalwood) Oil",
      "Cedrus Atlantica (Cedarwood) Oil",
      "Amber Resin, Activated Charcoal",
    ],
  },
  {
    id: "citrus-bergamot",
    name: "Citrus Bergamot",
    price: 26,
    description: "Sicilian bergamot, sweet orange zest, and refreshing eucalyptus.",
    image: soapCitrus,
    notes: "Bergamot · Orange · Eucalyptus",
    skinTypes: ["oily", "combination", "normal"],
    fullDescription:
      "A bright awakening for the morning ritual. Cold-pressed Sicilian bergamot meets sun-ripened orange zest and a whisper of blue eucalyptus. White kaolin clay gently clarifies without stripping the skin's natural barrier.",
    ingredients: [
      "Saponified Citrus Sinensis (Sweet Orange) Oil*",
      "Citrus Bergamia (Bergamot) Fruit Oil*",
      "Eucalyptus Globulus Leaf Oil*",
      "Kaolin Clay",
      "Orange Peel, Tocopherol (Vitamin E)",
    ],
  },
  {
    id: "midnight-rose",
    name: "Midnight Rose",
    price: 32,
    description: "Damask rose petals, French pink clay, and nourishing vanilla bean.",
    image: soapRose,
    badge: "Limited Edition",
    notes: "Rose · Pink Clay · Vanilla",
    skinTypes: ["dry", "normal", "sensitive", "combination"],
    fullDescription:
      "An opulent botanical blend featuring hand-picked Damask rose petals, mineral-rich French pink clay, and the soft warmth of Tahitian vanilla bean. Infused with real rose otto oil for true floral depth.",
    ingredients: [
      "Saponified Rosa Canina (Rosehip) Seed Oil*",
      "Rosa Damascena (Rose Otto) Absolute",
      "Illite (Pink French) Clay",
      "Vanilla Planifolia Bean Extract",
      "Damask Rose Petals",
    ],
  },
];

const WHATSAPP_NUMBER = "15551234567";

type CartItem = Product & { qty: number };

type JournalPost = {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string[];
  accent: string;
};

const JOURNAL: JournalPost[] = [
  {
    id: "clean-living",
    title: "Clean Living, Slowly",
    category: "Ritual",
    date: "March 12, 2026",
    excerpt:
      "A quieter approach to daily skincare — fewer products, better ingredients, more intention.",
    accent: "from-[#4a3a2a] to-[#0f0d0b]",
    body: [
      "Clean living is less a checklist than a rhythm. It begins with the objects you reach for at dawn and dusk — the bar you lather, the towel you dry with, the light you leave on.",
      "We believe in fewer, better things. A single cold-processed bar can replace a shelf of plastic bottles, and the ritual of using it becomes a small daily anchor.",
      "Start with one swap. Notice how it changes the next. The morning lather. The evening rinse. The quiet moment in between where nothing is demanded of you.",
    ],
  },
  {
    id: "botanical-benefits",
    title: "The Case for Botanicals",
    category: "Ingredients",
    date: "February 24, 2026",
    excerpt:
      "Why wild-harvested herbs and cold-pressed oils outperform any synthetic active on the market.",
    accent: "from-[#3a4a2a] to-[#0f0d0b]",
    body: [
      "Plants make molecules for the same reasons we do — protection, repair, communication. When we lift them gently and preserve their integrity, they carry that intelligence into our skin.",
      "Lavender calms. Bergamot brightens. Rose repairs. These are not marketing lines; they are centuries of practice, now measured in labs.",
      "The trick is preserving what nature made. Cold-process saponification protects the delicate compounds that heat would destroy — the antioxidants, the flavonoids, the fragile essential oils that make a bar feel alive.",
    ],
  },
  {
    id: "slow-craft",
    title: "The Art of Slow-Crafted Soap",
    category: "Craft",
    date: "January 08, 2026",
    excerpt: "Six weeks in the curing room. What patience does to a simple bar of soap.",
    accent: "from-[#4a2a2a] to-[#0f0d0b]",
    body: [
      "Industrial soap can be extruded and packaged in under an hour. Ours takes forty-two days.",
      "During curing, water evaporates and the crystalline structure of the bar tightens. The lather becomes silkier, the bar lasts longer, and the botanicals deepen in scent.",
      "There is no shortcut. Time is the ingredient no factory can add. When you hold a cured Vespera bar, you hold six weeks of stillness.",
    ],
  },
];

type IgPost = {
  id: string;
  prompt: string;
  product?: Product;
  caption: string;
  likes: string;
};

const IG_GRID: IgPost[] = [
  {
    id: "ig1",
    prompt: "luxury%20handcrafted%20soap%20on%20marble%20bathroom%20counter%20with%20fresh%20lavender%20sprigs%20soft%20natural%20light%20minimal%20aesthetic",
    caption: "Morning stillness with Fleur de Lavande.",
    likes: "2.4k",
    product: PRODUCTS[0],
  },
  {
    id: "ig2",
    prompt: "warm%20amber%20botanical%20soap%20on%20dark%20wood%20tray%20with%20dried%20botanicals%20candlelight%20cozy%20luxury%20bathroom",
    caption: "Quiet evenings call for Amber Botanica.",
    likes: "3.1k",
    product: PRODUCTS[1],
  },
  {
    id: "ig3",
    prompt: "citrus%20bergamot%20soap%20bar%20with%20fresh%20orange%20slices%20and%20bergamot%20fruit%20bright%20sunlight%20white%20linen%20aesthetic",
    caption: "Bright mornings, brighter skin.",
    likes: "1.8k",
    product: PRODUCTS[2],
  },
  {
    id: "ig4",
    prompt: "rose%20soap%20bar%20on%20pink%20marble%20with%20dried%20rose%20petals%20and%20silk%20ribbon%20soft%20golden%20hour%20light%20luxury",
    caption: "Midnight Rose — a love letter to the skin.",
    likes: "4.2k",
    product: PRODUCTS[3],
  },
  {
    id: "ig5",
    prompt: "artisan%20soapmaker%20hands%20stirring%20botanical%20oils%20in%20copper%20pot%20warm%20workshop%20light%20slow%20craft%20aesthetic",
    caption: "Forty-two days of patience, in the making.",
    likes: "2.7k",
  },
  {
    id: "ig6",
    prompt: "minimal%20luxury%20bathroom%20shelf%20with%20stacked%20soap%20bars%20fluffy%20white%20towels%20dried%20eucalyptus%20warm%20neutral%20tones",
    caption: "A bathroom that breathes.",
    likes: "3.6k",
  },
];

type SkinOption = {
  id: string;
  label: string;
  description: string;
  icon: typeof Droplets;
};

const SKIN_OPTIONS: SkinOption[] = [
  {
    id: "dry",
    label: "Dry Skin",
    description: "Tight, flaky, thirsty for deep hydration.",
    icon: Droplets,
  },
  {
    id: "oily",
    label: "Oily Skin",
    description: "Shiny T-zone, needs gentle balance.",
    icon: SunIcon,
  },
  {
    id: "combination",
    label: "Combination",
    description: "Oily in some areas, drier in others.",
    icon: Sparkles,
  },
  {
    id: "sensitive",
    label: "Sensitive Skin",
    description: "Reactive, needs calming botanicals.",
    icon: Leaf,
  },
  {
    id: "normal",
    label: "Normal / Balanced",
    description: "Lucky you — looking for gentle daily care.",
    icon: SparklesIcon,
  },
];

function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [journalPost, setJournalPost] = useState<JournalPost | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vespera-theme") as "dark" | "light" | null;
      if (stored) setTheme(stored);
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("vespera-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.qty * i.price, 0), [cart]);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      if (ex) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
    toast.success(`${p.name} added to cart`);
  };
  const inc = (id: string) => setCart((p) => p.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const dec = (id: string) =>
    setCart((p) =>
      p.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])),
    );
  const remove = (id: string) => setCart((p) => p.filter((i) => i.id !== id));

  const whatsappOrder = (p: Product) => {
    const msg = `Hello VESPERA, I'd like to order:\n\n• ${p.name} — $${p.price}\n${p.description}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSearchOpen(false);
  };

  const filteredSearch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { products: [], posts: [] };
    return {
      products: PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.notes.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      ),
      posts: JOURNAL.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      ),
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme={theme} position="top-center" richColors closeButton />
      <Header
        itemCount={itemCount}
        onCartClick={() => setCartOpen(true)}
        onNav={scrollTo}
        theme={theme}
        onToggleTheme={toggleTheme}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredSearch={filteredSearch}
        onAdd={addToCart}
        onQuickView={(p) => {
          setSearchOpen(false);
          setQuickViewProduct(p);
        }}
        onReadJournal={(p) => {
          setSearchOpen(false);
          setJournalPost(p);
        }}
      />
      <main>
        <Hero onNav={scrollTo} />
        <Collection
          onAdd={addToCart}
          onWhatsapp={whatsappOrder}
          onQuickView={setQuickViewProduct}
        />
        <SoapFinder onAdd={addToCart} onNav={scrollTo} />
        <Story />
        <ComparisonTable />
        <InstagramGallery onAdd={addToCart} onQuickView={setQuickViewProduct} />
        <Reviews />
        <Journal onRead={setJournalPost} />
        <Newsletter />
        <Contact />
      </main>
      <Footer onNav={scrollTo} />

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md bg-card border-l border-border flex flex-col">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl tracking-wide">
              Your <span className="text-gold">Ritual</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <ShoppingBag className="mx-auto mb-4 opacity-40" size={40} />
                <p>Your cart is empty.</p>
                <Button
                  onClick={() => {
                    setCartOpen(false);
                    scrollTo("collection");
                  }}
                  variant="outline"
                  className="mt-6 rounded-full border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground"
                >
                  Browse Collection
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((i) => (
                  <li
                    key={i.id}
                    className="flex gap-4 border border-border/60 rounded-lg p-3 bg-background/40"
                  >
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-serif text-lg truncate">{i.name}</h4>
                        <button
                          onClick={() => remove(i.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-gold text-sm mt-0.5">${i.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center border border-border rounded-full">
                          <button
                            onClick={() => dec(i.id)}
                            className="p-1.5 hover:text-gold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm tabular-nums">{i.qty}</span>
                          <button
                            onClick={() => inc(i.id)}
                            className="p-1.5 hover:text-gold transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm tabular-nums font-medium">
                          ${(i.qty * i.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cart.length > 0 && (
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-border">
                <span className="font-serif">Total</span>
                <span className="text-gold tabular-nums font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-gold text-primary-foreground hover:opacity-90 hover:glow-amber transition-all rounded-full h-11 tracking-widest text-xs"
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                }}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Secure Checkout</DialogTitle>
            <DialogDescription>
              Total ${subtotal.toFixed(2)} · {itemCount} item(s)
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setCheckoutOpen(false);
              setSuccessOpen(true);
              setCart([]);
            }}
          >
            <Input
              required
              placeholder="Full name"
              className="bg-background border-border h-11 rounded-full"
            />
            <Input
              required
              type="email"
              placeholder="Email address"
              className="bg-background border-border h-11 rounded-full"
            />
            <Input
              required
              placeholder="Shipping address"
              className="bg-background border-border h-11 rounded-full"
            />
            <Input
              required
              placeholder="Card number"
              className="bg-background border-border h-11 rounded-full"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                required
                placeholder="MM / YY"
                className="bg-background border-border h-11 rounded-full"
              />
              <Input
                required
                placeholder="CVC"
                className="bg-background border-border h-11 rounded-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gold text-primary-foreground hover:opacity-90 hover:glow-amber rounded-full h-11 tracking-widest text-xs"
            >
              <Lock size={14} className="mr-2" /> COMPLETE ORDER
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="bg-card border-border sm:max-w-md text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gold/15 text-gold grid place-items-center mb-4">
            <CheckCircle2 size={32} strokeWidth={1.5} />
          </div>
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl text-gold text-center">
              Thank you.
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Your ritual is on its way. A confirmation has been sent to your inbox.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setSuccessOpen(false)}
            className="bg-gold text-primary-foreground hover:opacity-90 rounded-full mt-4"
          >
            Continue Browsing
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={!!journalPost} onOpenChange={(o) => !o && setJournalPost(null)}>
        <DialogContent className="bg-card border-border sm:max-w-lg">
          {journalPost && (
            <>
              <DialogHeader>
                <span className="text-[10px] tracking-[0.35em] uppercase text-gold">
                  {journalPost.category} · {journalPost.date}
                </span>
                <DialogTitle className="font-serif text-2xl sm:text-3xl leading-tight pt-2">
                  {journalPost.title}
                </DialogTitle>
                <DialogDescription className="pt-2 text-sm leading-relaxed text-muted-foreground">
                  {journalPost.excerpt}
                </DialogDescription>
              </DialogHeader>
              <div className="text-sm leading-relaxed text-foreground/90 space-y-3 max-h-72 overflow-y-auto pr-1">
                {journalPost.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Button
                onClick={() => setJournalPost(null)}
                className="mt-2 bg-gold text-primary-foreground hover:opacity-90 rounded-full h-10 text-xs tracking-[0.25em]"
              >
                CLOSE
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!quickViewProduct} onOpenChange={(o) => !o && setQuickViewProduct(null)}>
        <DialogContent className="bg-card border-border sm:max-w-3xl p-0 overflow-hidden">
          {quickViewProduct && (
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto bg-background">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                {quickViewProduct.badge && (
                  <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur text-gold border-gold/40 rounded-full px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
                    {quickViewProduct.badge}
                  </Badge>
                )}
              </div>
              <div className="p-6 sm:p-8 flex flex-col">
                <DialogHeader className="text-left">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                    {quickViewProduct.notes}
                  </p>
                  <DialogTitle className="font-serif text-3xl pt-1">
                    {quickViewProduct.name}
                  </DialogTitle>
                  <div className="pt-2 flex items-center gap-2">
                    <div className="flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">(48 reviews)</span>
                  </div>
                  <div className="pt-3 text-2xl text-gold font-serif">
                    ${quickViewProduct.price.toFixed(2)}
                  </div>
                </DialogHeader>
                <p className="pt-4 text-sm leading-relaxed text-muted-foreground">
                  {quickViewProduct.fullDescription}
                </p>
                <div className="pt-4">
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                    Ingredients
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                    {quickViewProduct.ingredients.map((ing) => (
                      <li key={ing} className="flex gap-2">
                        <span className="text-gold mt-0.5">·</span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 mt-auto space-y-2">
                  <Button
                    onClick={() => {
                      addToCart(quickViewProduct);
                    }}
                    className="w-full bg-gold text-primary-foreground hover:opacity-90 hover:glow-amber transition-all rounded-full h-11 text-[11px] tracking-[0.25em]"
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    onClick={() => whatsappOrder(quickViewProduct)}
                    className="w-full bg-[color:var(--emerald)] text-white hover:opacity-90 rounded-full h-11 text-[11px] tracking-[0.25em]"
                  >
                    <MessageCircle size={14} className="mr-2" /> ORDER VIA WHATSAPP
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Header({
  itemCount,
  onCartClick,
  onNav,
  theme,
  onToggleTheme,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  filteredSearch,
  onAdd,
  onQuickView,
  onReadJournal,
}: {
  itemCount: number;
  onCartClick: () => void;
  onNav: (id: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  searchOpen: boolean;
  setSearchOpen: (b: boolean) => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  filteredSearch: { products: Product[]; posts: JournalPost[] };
  onAdd: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onReadJournal: (p: JournalPost) => void;
}) {
  const links = [
    { label: "Home", id: "top" },
    { label: "Collection", id: "collection" },
    { label: "Soap Finder", id: "finder" },
    { label: "Compare", id: "compare" },
    { label: "Gallery", id: "gallery" },
    { label: "Our Story", id: "story" },
    { label: "Reviews", id: "reviews" },
    { label: "Journal", id: "journal" },
    { label: "Contact", id: "contact" },
  ];
  return (
    <header
      id="top"
      className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => onNav("top")}
          className="font-serif text-gold text-xl sm:text-2xl tracking-[0.35em] shrink-0 transition-opacity hover:opacity-80"
        >
          VESPERA
        </button>
        <nav className="hidden lg:flex items-center gap-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNav(l.id)}
              className="hover:text-gold transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Search size={18} />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2.5rem)] sm:w-96 bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-border/60">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      autoFocus
                      placeholder="Search soaps, journal posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-11 bg-background border-border rounded-full"
                    />
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {searchQuery.trim() === "" ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      Start typing to search our collection & journal
                    </div>
                  ) : filteredSearch.products.length === 0 &&
                    filteredSearch.posts.length === 0 ? (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      No results for &ldquo;{searchQuery}&rdquo;
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {filteredSearch.products.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-[10px] tracking-[0.3em] uppercase text-gold">
                            Products
                          </div>
                          {filteredSearch.products.map((p) => (
                            <div
                              key={p.id}
                              className="group flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
                              onClick={() => {
                                onQuickView(p);
                                setSearchQuery("");
                              }}
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-md object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-serif text-sm truncate">{p.name}</div>
                                <div className="text-[10px] tracking-widest uppercase text-muted-foreground truncate">
                                  {p.notes}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <div className="text-sm text-gold tabular-nums">${p.price}</div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAdd(p);
                                  }}
                                  className="text-[10px] tracking-widest uppercase text-gold hover:underline"
                                >
                                  + Add
                                </button>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                      {filteredSearch.posts.length > 0 && (
                        <>
                          <div className="px-3 py-2 text-[10px] tracking-[0.3em] uppercase text-gold">
                            Journal
                          </div>
                          {filteredSearch.posts.map((p) => (
                            <div
                              key={p.id}
                              className="group p-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
                              onClick={() => {
                                onReadJournal(p);
                                setSearchQuery("");
                              }}
                            >
                              <div className="font-serif text-sm">{p.title}</div>
                              <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-0.5">
                                {p.category} · {p.date}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-3 mt-1.5">
                                {p.excerpt}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground relative overflow-hidden"
          >
            <div className="relative w-[18px] h-[18px]">
              <Sun
                size={18}
                className={`absolute inset-0 transition-all duration-500 ${
                  theme === "dark"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />
              <Moon
                size={18}
                className={`absolute inset-0 transition-all duration-500 ${
                  theme === "light"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-50"
                }`}
              />
            </div>
          </button>
          <Button
            onClick={() => onNav("collection")}
            variant="ghost"
            className="hidden sm:inline-flex text-xs tracking-[0.2em] uppercase border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground rounded-full h-9 px-4 transition-all"
          >
            Shop Now
          </Button>
          <button
            onClick={onCartClick}
            aria-label="Open cart"
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ShoppingBag size={20} className="text-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-gold text-primary-foreground text-[10px] font-semibold flex items-center justify-center px-1 animate-[pop_0.3s_ease-out]">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section className="relative overflow-hidden hero-radial">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-24 pb-28 sm:pt-36 sm:pb-40 text-center relative">
        <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground animate-[fade-up_0.8s_ease-out]">
          <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
          Organic & Handcrafted Botanical Soap
        </div>
        <h1 className="mt-8 font-serif text-5xl sm:text-7xl md:text-8xl leading-[1.05] tracking-tight animate-[fade-up_0.9s_ease-out_0.1s_both]">
          A quieter <em className="text-gold not-italic font-normal">ritual</em>
          <br />
          for the skin.
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground leading-relaxed text-base sm:text-lg animate-[fade-up_1s_ease-out_0.2s_both]">
          Cold-processed in small batches, each Vespera bar is composed of pure organic
          oils, wild-harvested botanicals, and essential oils — nothing synthetic, nothing
          hurried. A slow craft for a considered life.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-[fade-up_1.1s_ease-out_0.3s_both]">
          <Button
            onClick={() => onNav("collection")}
            className="bg-gold text-primary-foreground hover:opacity-90 hover:glow-amber transition-all rounded-full h-12 px-8 text-xs tracking-[0.25em] group"
          >
            EXPLORE COLLECTION
            <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            onClick={() => onNav("finder")}
            variant="outline"
            className="border-border text-foreground bg-transparent hover:bg-secondary hover:text-gold hover:border-gold/40 rounded-full h-12 px-8 text-xs tracking-[0.25em] transition-all"
          >
            FIND YOUR SOAP
          </Button>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-md mx-auto animate-[fade-up_1.2s_ease-out_0.4s_both]">
          {[
            { n: "100%", l: "Botanical" },
            { n: "42d", l: "Slow Cured" },
            { n: "Zero", l: "Chemicals" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-2xl sm:text-3xl text-gold">{s.n}</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collection({
  onAdd,
  onWhatsapp,
  onQuickView,
}: {
  onAdd: (p: Product) => void;
  onWhatsapp: (p: Product) => void;
  onQuickView: (p: Product) => void;
}) {
  return (
    <section id="collection" className="py-24 sm:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">
            The Collection
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl max-w-2xl leading-tight">
            Botanicals, distilled into bars.
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground leading-relaxed">
            Four small-batch compositions, each cured for six weeks to a firm,
            long-lasting finish. Choose the one that calls to you.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={onAdd}
              onWhatsapp={onWhatsapp}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onAdd,
  onWhatsapp,
  onQuickView,
}: {
  product: Product;
  onAdd: (p: Product) => void;
  onWhatsapp: (p: Product) => void;
  onQuickView: (p: Product) => void;
}) {
  return (
    <article className="group flex flex-col bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-gold/50 hover:glow-amber-sm transition-all duration-500">
      <div className="relative aspect-[4/5] overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-background/80 backdrop-blur border border-gold/40 text-gold text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onQuickView(product)}
            aria-label="Quick view"
            className="w-9 h-9 grid place-items-center rounded-full bg-background/85 backdrop-blur border border-border/60 hover:bg-gold hover:text-primary-foreground hover:border-gold transition-all text-foreground"
          >
            <Eye size={15} />
          </button>
          <button
            aria-label="Add to wishlist"
            onClick={() => toast.message("Saved to wishlist", { description: product.name })}
            className="w-9 h-9 grid place-items-center rounded-full bg-background/85 backdrop-blur border border-border/60 hover:bg-gold hover:text-primary-foreground hover:border-gold transition-all text-foreground"
          >
            <Heart size={15} />
          </button>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl truncate">{product.name}</h3>
          <span className="text-gold tabular-nums font-medium">${product.price}</span>
        </div>
        <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          {product.notes}
        </p>
        <div className="flex gap-0.5 text-gold mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1.5 self-center">(48)</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {product.description}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Button
            onClick={() => onAdd(product)}
            className="w-full bg-gold text-primary-foreground hover:opacity-90 hover:glow-amber transition-all rounded-full h-10 text-[11px] tracking-[0.25em]"
          >
            ADD TO CART
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => onQuickView(product)}
              variant="outline"
              className="border-border text-foreground hover:bg-secondary hover:text-gold hover:border-gold/40 rounded-full h-9 text-[10px] tracking-[0.2em] transition-all"
            >
              QUICK VIEW
            </Button>
            <Button
              onClick={() => onWhatsapp(product)}
              className="bg-[color:var(--emerald)]/10 text-[color:var(--emerald)] hover:bg-[color:var(--emerald)] hover:text-white border border-[color:var(--emerald)]/30 rounded-full h-9 text-[10px] tracking-[0.2em] transition-all"
            >
              WHATSAPP
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

function SoapFinder({
  onAdd,
  onNav,
}: {
  onAdd: (p: Product) => void;
  onNav: (id: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const match = useMemo(() => {
    if (!selected) return [];
    return PRODUCTS.filter((p) => p.skinTypes.includes(selected))
      .map((p) => ({
        ...p,
        score: p.skinTypes.indexOf(selected),
      }))
      .sort((a, b) => a.score - b.score);
  }, [selected]);

  const matchProduct = match[0];

  return (
    <section
      id="finder"
      className="py-24 sm:py-32 border-t border-border/60 bg-card/30"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4 inline-flex items-center gap-2">
            <Sparkles size={12} />
            Interactive Finder
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl max-w-2xl leading-tight">
            Find the soap that <em className="text-gold not-italic">knows your skin.</em>
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground leading-relaxed">
            Tell us how your skin feels, and we'll recommend the botanical bar that was
            made for you. Takes 10 seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {SKIN_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isActive = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`group relative p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 ${
                  isActive
                    ? "bg-gold text-primary-foreground border-gold glow-amber"
                    : "bg-card border-border/60 hover:border-gold/40 hover:bg-secondary/30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full grid place-items-center mb-3 transition-colors ${
                    isActive ? "bg-primary-foreground/20" : "bg-gold/10 text-gold"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <h3 className="font-serif text-lg leading-tight">{opt.label}</h3>
                <p
                  className={`mt-1.5 text-xs leading-relaxed ${
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {opt.description}
                </p>
                {isActive && (
                  <CheckCircle2
                    size={18}
                    className="absolute top-3 right-3 text-primary-foreground"
                  />
                )}
              </button>
            );
          })}
        </div>

        {selected && matchProduct && (
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-card border border-gold/30 rounded-3xl p-6 sm:p-8 overflow-hidden relative glow-amber-sm">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
              <div className="relative grid sm:grid-cols-[auto,1fr] gap-6 sm:gap-8 items-center">
                <div className="relative mx-auto sm:mx-0 shrink-0">
                  <img
                    src={matchProduct.image}
                    alt={matchProduct.name}
                    className="w-36 h-44 sm:w-44 sm:h-56 object-cover rounded-2xl border border-border/60"
                  />
                  {matchProduct.badge && (
                    <Badge className="absolute -top-2 -right-2 bg-gold text-primary-foreground rounded-full text-[9px] tracking-[0.2em] uppercase">
                      {matchProduct.badge}
                    </Badge>
                  )}
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold inline-flex items-center gap-1.5">
                    <Sparkles size={10} />
                    Your Perfect Match
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl mt-2">
                    {matchProduct.name}
                  </h3>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    {matchProduct.notes}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {matchProduct.fullDescription}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="font-serif text-2xl text-gold">
                      ${matchProduct.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => onAdd(matchProduct)}
                      className="bg-gold text-primary-foreground hover:opacity-90 hover:glow-amber transition-all rounded-full h-10 px-6 text-[11px] tracking-[0.25em]"
                    >
                      ADD TO CART
                    </Button>
                    <Button
                      onClick={() => onNav("collection")}
                      variant="outline"
                      className="border-border hover:border-gold/40 hover:text-gold rounded-full h-10 px-6 text-[11px] tracking-[0.25em]"
                    >
                      SEE ALL
                    </Button>
                  </div>
                </div>
              </div>
              {match.length > 1 && (
                <div className="relative mt-8 pt-6 border-t border-border/60">
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                    Also great for your skin type:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {match.slice(1).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onAdd(p)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 hover:border-gold/40 hover:bg-secondary/30 transition-all text-xs group"
                      >
                        <img src={p.image} alt="" className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-serif">{p.name}</span>
                        <span className="text-gold tabular-nums">${p.price}</span>
                        <Plus
                          size={12}
                          className="ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Story() {
  const pillars = [
    {
      icon: FlaskConical,
      title: "Cold-Process Method",
      body: "Saponified slowly at low temperature to preserve every fragile botanical.",
    },
    {
      icon: Sprout,
      title: "Sustainable Sourcing",
      body: "Wild-harvested herbs and single-origin oils traced from farm to bar.",
    },
    {
      icon: Recycle,
      title: "Zero-Plastic Packaging",
      body: "Recycled paper wraps and compostable inks — nothing ends in landfill.",
    },
    {
      icon: Leaf,
      title: "Chemical-Free Formula",
      body: "No sulfates, no parabens, no synthetic fragrance. Ever.",
    },
  ];
  return (
    <section id="story" className="py-24 sm:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-border/60 group">
          <img
            src={storyImg}
            alt="Artisan crafting soap"
            loading="lazy"
            className="w-full h-full object-cover aspect-[5/6] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-5 left-5 right-5 text-cream opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div className="font-serif text-2xl leading-tight">Made in Provence.</div>
            <div className="text-xs text-cream/70 mt-1 tracking-widest uppercase">
              Slow-cured, 42 days
            </div>
          </div>
        </div>
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold">Our Story</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight">
            Made by hand,{" "}
            <em className="text-gold not-italic">measured by time.</em>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Vespera began with a single copper pot and a belief that what you put on your
            skin matters as much as what you feed it. We source our oils directly from
            organic farms, blend each small batch by hand, and cure every bar for six
            weeks on wooden drying racks. The result is a soap that doesn't just clean —
            it restores, calms, and honors the quiet intelligence of plants.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 p-4 rounded-xl border border-border/40 hover:border-gold/30 hover:bg-secondary/20 transition-all"
              >
                <div className="shrink-0 w-11 h-11 rounded-full border border-gold/40 text-gold grid place-items-center">
                  <p.icon size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    {
      feature: "Ingredient Sourcing",
      vespera: "Single-origin organic farms, wild-harvested botanicals",
      commercial: "Generic bulk oils, synthetic isolates",
      isGood: true,
    },
    {
      feature: "Manufacturing",
      vespera: "Cold-process saponification, low temperature",
      commercial: "Hot extrusion, stripped of glycerin",
      isGood: true,
    },
    {
      feature: "Curing Time",
      vespera: "42 days minimum, hand-racked",
      commercial: "Hours, sometimes days max",
      isGood: true,
    },
    {
      feature: "Synthetic Fragrance",
      vespera: "None — only essential oils & absolutes",
      commercial: "Yes — up to 90% of scent",
      isGood: true,
    },
    {
      feature: "Preservatives",
      vespera: "None — curing does the work",
      commercial: "Parabens, formaldehyde releasers",
      isGood: true,
    },
    {
      feature: "Sulfates / Detergents",
      vespera: "None",
      commercial: "SLES, SLS often included",
      isGood: true,
    },
    {
      feature: "Skin Feel",
      vespera: "Silky lather, nourished, balanced",
      commercial: "Stripped, tight, pH-disrupted",
      isGood: true,
    },
    {
      feature: "Packaging",
      vespera: "Recycled paper, compostable inks",
      commercial: "Single-use plastic bottles",
      isGood: true,
    },
  ];

  return (
    <section id="compare" className="py-24 sm:py-32 border-t border-border/60 bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4 inline-flex items-center gap-2">
            <BarChart3 size={12} />
            Ingredient Truth
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl max-w-3xl leading-tight">
            Not all soap is created <em className="text-gold not-italic">equally.</em>
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground leading-relaxed">
            An honest look at what sets cold-processed botanical bars apart from the
            commercial soaps you grew up with.
          </p>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-xl">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent bg-secondary/40">
                <TableHead className="w-[26%] px-5 py-5 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
                  Category
                </TableHead>
                <TableHead className="px-5 py-5 text-[10px] tracking-[0.3em] uppercase text-gold font-medium">
                  <span className="inline-flex items-center gap-2">
                    <Leaf size={12} />
                    VESPERA BOTANICAL
                  </span>
                </TableHead>
                <TableHead className="px-5 py-5 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
                  Commercial Soap
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow
                  key={r.feature}
                  className="border-border/60 hover:bg-secondary/30 transition-colors"
                >
                  <TableCell className="px-5 py-4 font-serif text-sm sm:text-base align-top">
                    {r.feature}
                  </TableCell>
                  <TableCell className="px-5 py-4 align-top">
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-gold shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="text-sm leading-relaxed text-foreground/90">
                        {r.vespera}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 align-top">
                    <div className="flex items-start gap-2">
                      <XCircle
                        size={16}
                        className="text-muted-foreground/60 shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {r.commercial}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Leaf,
              stat: "100%",
              label: "Plant-based ingredients",
            },
            {
              icon: FlaskConical,
              stat: "0",
              label: "Synthetic additives",
            },
            {
              icon: Heart,
              stat: "97%",
              label: "Would repurchase",
            },
          ].map((x) => (
            <div
              key={x.label}
              className="p-6 rounded-2xl border border-border/60 bg-card hover:border-gold/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 text-gold grid place-items-center mb-4">
                <x.icon size={18} />
              </div>
              <div className="font-serif text-4xl text-gold">{x.stat}</div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                {x.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramGallery({
  onAdd,
  onQuickView,
}: {
  onAdd: (p: Product) => void;
  onQuickView: (p: Product) => void;
}) {
  return (
    <section id="gallery" className="py-24 sm:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4 inline-flex items-center gap-2">
            <Instagram size={12} />
            @vespera.ritual
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl max-w-2xl leading-tight">
            Moments from the <em className="text-gold not-italic">Vespera life.</em>
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground leading-relaxed">
            User rituals, workshop days, quiet mornings. Tag us and you might find
            yourself here — plus, tap any post to shop what's inside.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {IG_GRID.map((post) => (
            <figure
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-card border border-border/40 cursor-pointer"
              onClick={() => post.product && onQuickView(post.product)}
            >
              <img
                src={`https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${post.prompt}&image_size=square_hd`}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-cream text-[10px] tracking-widest px-2.5 py-1 rounded-full">
                    <Heart size={11} fill="currentColor" />
                    {post.likes}
                  </span>
                  {post.product && (
                    <Badge className="bg-gold text-primary-foreground border-0 rounded-full text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
                      SHOPPABLE
                    </Badge>
                  )}
                </div>
                <div className="text-cream space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <figcaption className="font-serif text-base sm:text-lg leading-snug">
                    {post.caption}
                  </figcaption>
                  {post.product && (
                    <div className="flex items-center gap-2 pt-1">
                      <img
                        src={post.product.image}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover border border-white/20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">
                          {post.product.name}
                        </div>
                        <div className="text-[10px] opacity-80 tracking-widest uppercase">
                          ${post.product.price}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd(post.product!);
                        }}
                        className="shrink-0 h-8 px-3 rounded-full bg-gold text-primary-foreground text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity"
                      >
                        ADD
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold hover:opacity-80 transition-opacity group"
          >
            FOLLOW US ON INSTAGRAM
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      name: "Amelia R.",
      role: "Verified Buyer",
      quote:
        "The Midnight Rose is unreal — my skin feels softer than after a facial. The scent lingers like a whisper.",
    },
    {
      name: "Julien M.",
      role: "Verified Buyer",
      quote:
        "Amber Botanica is my new signature. Warm, grounding, and it lasts twice as long as any bar I've bought.",
    },
    {
      name: "Sana K.",
      role: "Verified Buyer",
      quote:
        "You can feel the care. The lather is silky, the botanicals are visible, and it never dries me out.",
    },
  ];
  return (
    <section id="reviews" className="py-24 sm:py-32 border-t border-border/60 bg-card/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold">
            Testimonials
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight">
            Softly said, sincerely felt.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="p-8 rounded-2xl bg-card border border-border/60 hover:border-gold/40 hover:glow-amber-sm transition-all duration-300"
            >
              <div className="flex gap-0.5 text-gold mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <blockquote className="font-serif text-xl leading-relaxed text-foreground">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-6 text-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/15 text-gold grid place-items-center font-serif text-base">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-foreground font-medium">{r.name}</div>
                  <div className="text-muted-foreground text-xs tracking-widest uppercase mt-0.5">
                    {r.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal({ onRead }: { onRead: (p: JournalPost) => void }) {
  return (
    <section id="journal" className="py-24 sm:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">
            Journal
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl max-w-2xl leading-tight">
            Notes from the workshop.
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground leading-relaxed">
            Slow reading on clean living, botanical skincare, and the quiet craft behind
            every bar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNAL.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-gold/50 hover:glow-amber-sm transition-all duration-500"
            >
              <div
                className={`aspect-[4/3] w-full bg-gradient-to-br ${post.accent} relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-70 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.35em] uppercase text-cream/90">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {post.date}
                </span>
                <h3 className="mt-3 font-serif text-2xl leading-tight">{post.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <button
                  onClick={() => onRead(post)}
                  className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-gold hover:opacity-80 transition-opacity self-start group/btn"
                >
                  READ MORE
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Thank you for joining the ritual.");
    }, 700);
  };

  return (
    <section id="newsletter" className="py-24 sm:py-32 border-t border-border/60 bg-card/40">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-background via-card to-background overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
          <div className="relative px-6 sm:px-12 py-14 sm:py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 border border-gold/30 text-gold grid place-items-center mb-6">
              <Mail size={24} strokeWidth={1.5} />
            </div>
            {!submitted ? (
              <>
                <span className="text-[10px] tracking-[0.35em] uppercase text-gold">
                  Join the Ritual
                </span>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl max-w-xl mx-auto leading-tight">
                  The slow-living <em className="text-gold not-italic">letter.</em>
                </h2>
                <p className="mt-5 max-w-lg mx-auto text-muted-foreground leading-relaxed">
                  One thoughtful email each month. New botanicals, field notes from
                  the workshop, quiet living ideas, and subscriber-only rituals.
                  No spam — ever.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="mt-9 max-w-md mx-auto flex flex-col sm:flex-row gap-2"
                >
                  <Input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 bg-background border-border rounded-full text-sm px-5 focus-visible:ring-gold"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="h-12 px-6 sm:px-7 bg-gold text-primary-foreground hover:opacity-90 hover:glow-amber transition-all rounded-full text-[11px] tracking-[0.25em] whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                        JOINING
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <Send size={13} />
                        JOIN
                      </span>
                    )}
                  </Button>
                </form>
                <div className="mt-5 flex flex-wrap justify-center gap-4 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={11} className="text-gold" /> No Spam
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={11} className="text-gold" /> Monthly Cadence
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={11} className="text-gold" /> 10% Off Your First Order
                  </span>
                </div>
              </>
            ) : (
              <div className="animate-[fade-up_0.6s_ease-out]">
                <div className="mx-auto w-20 h-20 rounded-full bg-gold/15 text-gold grid place-items-center mb-5 border border-gold/30">
                  <CheckCircle2 size={42} strokeWidth={1.2} />
                </div>
                <span className="text-[10px] tracking-[0.35em] uppercase text-gold">
                  You're in.
                </span>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl text-gold max-w-xl mx-auto leading-tight">
                  Welcome to the ritual.
                </h2>
                <p className="mt-5 max-w-md mx-auto text-muted-foreground leading-relaxed">
                  We've sent a welcome letter to <strong className="text-foreground">{email}</strong>{" "}
                  with your 10% ritual code inside. See you at the next full moon.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="mt-8 border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground rounded-full h-10 px-6 text-[11px] tracking-[0.25em]"
                >
                  Add Another Email
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return <ContactSection />;
}

function ContactSection() {
  const faqs = [
    {
      q: "How long does each bar last?",
      a: "When kept dry between uses on a draining soap dish, a Vespera bar typically lasts 4–6 weeks with daily use. Our 42-day curing process creates a significantly harder bar that outlasts most commercial alternatives by 2–3x.",
    },
    {
      q: "Are your soaps safe for sensitive skin?",
      a: "Yes — every bar is pH-balanced (5.3–5.6) and free from sulfates, synthetic fragrance, and common irritants. Fleur de Lavande and Midnight Rose are particularly gentle and are our top recommendations for eczema-prone or sensitive skin.",
    },
    {
      q: "Do you ship internationally?",
      a: "We ship to North America, the UK, the EU, and most of Asia-Pacific. Orders over $75 ship free. Typical delivery is 3–7 days domestically and 7–14 days internationally, depending on your location.",
    },
    {
      q: "What is your return policy?",
      a: "If a bar isn't quite right for you, reach out within 30 days and we'll replace it or refund you, no questions asked. We also offer a 'Love Your First Bar' guarantee for new customers — try one, love it or we send a different formulation free.",
    },
    {
      q: "Can I send a custom gift set?",
      a: "Absolutely. We create bespoke gift sets for weddings, birthdays, corporate gifts, and boutique hotels. Write to us at hello@vespera.co with your vision and we'll craft a custom proposal within 48 hours.",
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold">Contact</span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight">Say hello.</h2>
          <p className="mt-5 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Wholesale, press, or a private ritual gift set — write to us anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,1.2fr] gap-8 lg:gap-12">
          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-gold/30 transition-colors">
              <h3 className="font-serif text-xl mb-1">Email</h3>
              <a
                href="mailto:hello@vespera.co"
                className="text-gold hover:underline text-sm inline-flex items-center gap-2"
              >
                <Mail size={14} /> hello@vespera.co
              </a>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-gold/30 transition-colors">
              <h3 className="font-serif text-xl mb-1">WhatsApp</h3>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline text-sm inline-flex items-center gap-2"
              >
                <MessageCircle size={14} /> +1 (555) 123-4567
              </a>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/60 hover:border-gold/30 transition-colors">
              <h3 className="font-serif text-xl mb-1">Workshop</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By appointment only
                <br />
                14 Rue du Savon
                <br />
                Aix-en-Provence, FR
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl mb-2">Frequently asked.</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Can't find what you're looking for? Email us directly — we answer within
              one business day.
            </p>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="px-5 rounded-xl border border-border/60 bg-card data-[state=open]:border-gold/40 data-[state=open]:glow-amber-sm transition-all overflow-hidden"
                >
                  <AccordionTrigger className="py-4 hover:no-underline text-left font-serif text-base sm:text-lg text-foreground [&[data-state=open]]:text-gold transition-colors">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pr-4 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNav }: { onNav: (id: string) => void }) {
  const [email, setEmail] = useState("");
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-serif text-gold text-2xl tracking-[0.35em]">VESPERA</div>
          <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
            A quieter ritual for the skin. Handcrafted botanical soaps, made slowly and
            with intention.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, MessageCircle, Mail].map((Icon, i) => (
              <a
                key={i}
                href={
                  i === 0
                    ? "https://instagram.com"
                    : i === 1
                    ? `https://wa.me/${WHATSAPP_NUMBER}`
                    : "mailto:hello@vespera.co"
                }
                target={i === 0 || i === 1 ? "_blank" : undefined}
                rel={i === 0 || i === 1 ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-full border border-border/60 grid place-items-center text-muted-foreground hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {[
              { id: "collection", label: "Collection" },
              { id: "finder", label: "Soap Finder" },
              { id: "compare", label: "Compare" },
              { id: "gallery", label: "Gallery" },
              { id: "story", label: "Our Story" },
              { id: "reviews", label: "Reviews" },
              { id: "journal", label: "Journal" },
              { id: "contact", label: "Contact" },
            ].map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => onNav(l.id)}
                  className="hover:text-gold transition-colors inline-flex items-center gap-1 group"
                >
                  <ChevronRight
                    size={12}
                    className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-gold"
                  />
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase text-foreground mb-4">
            Join the Vespera Ritual
          </h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("Welcome to the ritual.");
              setEmail("");
            }}
            className="flex flex-col gap-2"
          >
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="bg-background border-border h-10 rounded-full text-sm"
            />
            <Button
              type="submit"
              className="bg-gold text-primary-foreground hover:opacity-90 rounded-full h-10 px-4 text-xs tracking-widest transition-all hover:glow-amber"
            >
              JOIN
            </Button>
          </form>
          <p className="mt-4 text-[11px] tracking-widest uppercase text-muted-foreground">
            Monthly · No spam · Unsubscribe anytime
          </p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Vespera. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-gold" /> Secure payments
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CreditCard size={14} /> Visa · MC · Amex · PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
