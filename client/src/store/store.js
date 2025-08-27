import { create } from 'zustand';

// Example: simple store
export const useStore = create((set) => ({
  // state
  cart: [],
  wishlist: [],
  user: null,
  products: [],

  // actions
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (productId) => set((state) => ({ cart: state.cart.filter(item => item.id !== productId) })),
  
  addToWishlist: (product) => set((state) => ({ wishlist: [...state.wishlist, product] })),
  removeFromWishlist: (productId) => set((state) => ({ wishlist: state.wishlist.filter(item => item.id !== productId) })),
  
  setUser: (userData) => set({ user: userData }),
  setProducts: (products) => set({ products }),
}));