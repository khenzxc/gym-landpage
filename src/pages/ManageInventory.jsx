import { useEffect, useState } from "react";
import { Minus, Menu, Package, Plus, Trash2 } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import { apiFetch } from "../services/api";

export default function ManageInventory({ setView }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Equipment",
    quantity: 1,
    reorderLevel: 1,
    sellingPrice: 0,
  });

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await apiFetch("/inventory");
      if (!response.ok) throw new Error("Inventory fetch failed");
      setItems(await response.json());
      const salesResponse = await apiFetch("/inventory/sales");
      if (salesResponse.ok) setSales(await salesResponse.json());
    } catch (error) {
      console.error("INVENTORY_FETCH_ERROR:", error);
      alert("SYSTEM_ERROR: Failed to load inventory from the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    try {
      setSaving(true);
      const response = await apiFetch("/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          quantity: Number(form.quantity),
          reorderLevel: Number(form.reorderLevel),
          sellingPrice: Number(form.sellingPrice),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Inventory item creation failed");
      setItems((current) =>
        [...current, data.item].sort((a, b) => a.name.localeCompare(b.name)),
      );
      setForm({
        name: "",
        category: "Equipment",
        quantity: 1,
        reorderLevel: 1,
        sellingPrice: 0,
      });
    } catch (error) {
      console.error("INVENTORY_CREATE_ERROR:", error);
      alert(`Failed to add inventory item: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const updateQuantity = async (item, change) => {
    const quantity = Math.max(0, Number(item.quantity) + change);
    try {
      const response = await apiFetch(`/inventory/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          quantity,
          reorderLevel: item.reorderLevel,
          sellingPrice: item.sellingPrice,
        }),
      });
      if (!response.ok) throw new Error("Quantity update failed");
      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity, lowStock: quantity <= entry.reorderLevel }
            : entry,
        ),
      );
    } catch (error) {
      console.error("INVENTORY_QUANTITY_ERROR:", error);
      alert("Failed to update inventory quantity.");
    }
  };

  const recordSale = async (item) => {
    try {
      const response = await apiFetch("/inventory/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, quantity: 1 }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Product sale failed");
      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity - 1 }
            : entry,
        ),
      );
      setSales((current) => [data.sale, ...current].slice(0, 50));
    } catch (error) {
      alert(
        error.message === "INSUFFICIENT_STOCK"
          ? "This item is out of stock."
          : "Could not record product sale.",
      );
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete ${item.name} from inventory?`)) return;
    try {
      const response = await apiFetch(`/inventory/${item.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Inventory deletion failed");
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    } catch (error) {
      console.error("INVENTORY_DELETE_ERROR:", error);
      alert("Failed to delete inventory item.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      category: item.category || "Equipment",
      quantity: Number(item.quantity || 0),
      reorderLevel: Number(item.reorderLevel || 0),
      sellingPrice: Number(item.sellingPrice || 0),
    });
  };

  return (
    <div className="admin-page flex min-h-screen bg-black text-white">
      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="min-h-screen w-full flex-1 md:pl-72">
        <div className="w-full space-y-8 px-4 pb-8 sm:px-6 md:px-8 lg:px-10">
          <header className="admin-page-header sticky top-0 z-40 border-b border-zinc-900 bg-black/90 pb-6 pt-6 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="admin-menu-button md:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Inventory
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl lg:text-4xl">
                  Manage inventory
                </h2>
              </div>
            </div>
          </header>
          <section className="grid gap-6 xl:grid-cols-[minmax(260px,360px)_1fr]">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 border border-zinc-900 bg-zinc-950 p-5 md:p-6"
            >
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-zinc-300">
                  {editingId ? "Edit stock item" : "Add stock item"}
                </h3>
                <p className="mt-1 font-mono text-xs text-zinc-600">
                  Track equipment and consumables.
                </p>
              </div>
              <input
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Item name"
                className="w-full border border-zinc-900 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400"
                required
              />
              <select
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                className="w-full border border-zinc-900 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400"
              >
                <option>Equipment</option>
                <option>Supplies</option>
                <option>Merchandise</option>
              </select>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="space-y-1 text-[10px] text-zinc-500">
                  Stock
                  <input
                    type="number"
                    min="0"
                    value={form.quantity}
                    onChange={(event) =>
                      setForm({ ...form, quantity: event.target.value })
                    }
                    aria-label="Quantity"
                    className="w-full border border-zinc-900 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400"
                  />
                </label>
                <label className="space-y-1 text-[10px] text-zinc-500">
                  Reorder at
                  <input
                    type="number"
                    min="0"
                    value={form.reorderLevel}
                    onChange={(event) =>
                      setForm({ ...form, reorderLevel: event.target.value })
                    }
                    aria-label="Reorder level"
                    className="w-full border border-zinc-900 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400"
                  />
                </label>
                <label className="space-y-1 text-[10px] text-zinc-500">
                  Selling price
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.sellingPrice}
                    onChange={(event) =>
                      setForm({ ...form, sellingPrice: event.target.value })
                    }
                    aria-label="Selling price"
                    className="w-full border border-zinc-900 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 bg-yellow-400 px-4 py-3 font-mono text-xs font-black uppercase tracking-widest text-black hover:bg-yellow-500 disabled:cursor-wait disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />{" "}
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update item"
                      : "Add item"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm({
                        name: "",
                        category: "Equipment",
                        quantity: 1,
                        reorderLevel: 1,
                        sellingPrice: 0,
                      });
                    }}
                    className="border border-zinc-800 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-zinc-300 hover:border-zinc-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
            <section className="border border-zinc-900 bg-zinc-950 p-5 md:p-6">
              <div className="mb-5 flex items-center gap-2 border-b border-zinc-900 pb-4">
                <Package className="h-4 w-4 text-yellow-400" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-zinc-300">
                  Stock items
                </h3>
              </div>
              <div className="space-y-2">
                {loading ? (
                  <p className="py-12 text-center font-mono text-xs text-zinc-600">
                    Loading stock...
                  </p>
                ) : items.length === 0 ? (
                  <p className="py-12 text-center font-mono text-xs text-zinc-600">
                    No stock items yet.
                  </p>
                ) : (
                  items.map((item) => {
                    const lowStock =
                      Number(item.quantity) <= Number(item.reorderLevel);
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col gap-3 border border-zinc-900 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <div>
                            <p className="font-semibold text-white">
                              {item.name}
                            </p>
                            <p className="font-mono text-[10px] uppercase text-zinc-600">
                              {item.category} · ₱
                              {Number(item.sellingPrice || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 font-mono text-xs">
                          <button
                            onClick={() => recordSale(item)}
                            disabled={Number(item.quantity) === 0}
                            className="border border-zinc-700 px-3 py-2 text-zinc-300 hover:border-white hover:text-white disabled:opacity-30"
                          >
                            Sell 1
                          </button>
                          <div className="flex items-center gap-2 border border-zinc-900">
                            <button
                              onClick={() => updateQuantity(item, -1)}
                              disabled={Number(item.quantity) === 0}
                              aria-label={`Remove one ${item.name}`}
                              className="p-2 text-zinc-500 hover:text-white disabled:opacity-30"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span
                              className={`min-w-20 text-center ${lowStock ? "text-orange-400" : "text-emerald-400"}`}
                            >
                              {item.quantity} in stock
                            </span>
                            <button
                              onClick={() => updateQuantity(item, 1)}
                              aria-label={`Add one ${item.name}`}
                              className="p-2 text-zinc-500 hover:text-white"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleEdit(item)}
                            aria-label={`Edit ${item.name}`}
                            className="text-zinc-600 hover:text-yellow-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            aria-label={`Remove ${item.name}`}
                            className="text-zinc-600 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </section>
          <section className="border border-zinc-900 bg-zinc-950 p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-zinc-900 pb-4">
              <h3 className="font-mono text-sm font-bold uppercase">
                Product sales
              </h3>
              <span className="text-xs text-zinc-500">
                {sales.length} records
              </span>
            </div>
            {sales.length ? (
              <div className="max-h-72 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                {sales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between border border-zinc-900 bg-black/40 p-3 font-mono text-xs"
                  >
                    <span>
                      {sale.name} × {sale.quantity}
                    </span>
                    <span className="text-emerald-400">
                      ₱{Number(sale.total || 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center font-mono text-xs text-zinc-600">
                No product sales yet.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
