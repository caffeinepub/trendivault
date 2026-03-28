import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ExternalLink, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, clearCart, totalItems, totalPrice } = useCart();

  const handleCheckout = (item: (typeof items)[0]) => {
    if (item.price === 0 && item.externalLink) {
      window.open(item.externalLink, "_blank");
    } else if (item.cashfreeUrl) {
      window.open(item.cashfreeUrl, "_blank");
    }
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col"
        style={{
          background: "#0a0000",
          border: "1px solid rgba(255,0,0,0.2)",
          color: "white",
        }}
        data-ocid="cart.sheet"
      >
        <SheetHeader className="pb-4">
          <SheetTitle className="text-white text-xl font-heading flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-red-400" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4"
            data-ocid="cart.empty_state"
          >
            <ShoppingCart className="w-16 h-16 text-white/20" />
            <p className="text-white/50 text-center">
              Your cart is empty.
              <br />
              Add some products!
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {items.map((item, idx) => (
                <div
                  key={item.productId}
                  className="flex gap-3 p-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium line-clamp-2 mb-1">
                      {item.title}
                    </p>
                    <p className="text-yellow-300 font-bold text-sm">
                      {item.price === 0 ? "FREE" : `₹${item.price}`}
                    </p>
                    <p className="text-white/50 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCheckout(item)}
                      className="text-xs font-bold px-2 py-1 rounded flex items-center gap-1"
                      style={{
                        background:
                          item.price === 0
                            ? "linear-gradient(135deg, #22c55e, #16a34a)"
                            : "linear-gradient(135deg, #ffd700, #ffae00)",
                        color: item.price === 0 ? "white" : "#1a1a1a",
                      }}
                      data-ocid={`cart.primary_button.${idx + 1}`}
                    >
                      {item.price === 0 ? "Get Free" : "Pay Now"}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Separator
              className="my-3"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Subtotal</span>
                <span className="text-yellow-300 font-bold text-lg">
                  ₹{totalPrice}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="flex-1 border-red-800 text-red-400 hover:bg-red-950 hover:text-red-300"
                  data-ocid="cart.delete_button"
                >
                  Clear All
                </Button>
                {items.length === 1 && (
                  <Button
                    size="sm"
                    onClick={() => handleCheckout(items[0])}
                    className="flex-1 font-bold"
                    style={{
                      background:
                        items[0].price === 0
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : "linear-gradient(135deg, #ffd700, #ffae00)",
                      color: items[0].price === 0 ? "white" : "#1a1a1a",
                      border: "none",
                    }}
                    data-ocid="cart.submit_button"
                  >
                    {items[0].price === 0 ? "Get Free" : "Checkout"}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>

              {items.length > 1 && (
                <p className="text-white/40 text-xs text-center">
                  Use individual "Pay Now" buttons above to purchase each item.
                </p>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
