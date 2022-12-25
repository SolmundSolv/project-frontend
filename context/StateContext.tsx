import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../src/types/responses";
type User = {
  user: {
    id: string;
    name: string;
    email: string;
    role: { name: string };
  };
};

interface AppContextProps {
  cartItems: Product[];
  totalPrice: number;
  onAdd: (item: Product) => void;
  onRemove: (item: Product) => void;
  user: User | null;
}
const Context = createContext<AppContextProps | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StateContext = ({ children }: any) => {
  const cart: Product[] = [];
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3001/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);
  let foundProduct: Product | undefined;
  const onAdd = (item: Product) => {
    if (cartItems.find((product: Product) => product?.id === item?.id)) {
      return;
    }
    if (cartItems || item) setCartItems((cartItems) => [...cartItems, item]);
    setTotalPrice((currPrice) => {
      return parseInt(item?.price.toString() ?? "0") + currPrice;
    });
  };
  const onRemove = (item: Product) => {
    foundProduct = cartItems.find(
      (product: Product) => product?.id === item?.id
    );
    if (!foundProduct) {
      return;
    }
    const newCartItems = cartItems.filter(
      (product: Product) => product?.id !== foundProduct?.id
    );
    setCartItems(newCartItems);
    setTotalPrice((currPrice) => {
      return currPrice - parseInt(item?.price.toString() ?? "0");
    });
  };
  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        onAdd,
        onRemove,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;
export const useStateContext = () => useContext(Context);
