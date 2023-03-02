import React, { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, Product } from "../src/types/responses";
type User = {
  user: {
    id: string;
    name: string;
    email: string;
    role: { name: string };
    phone: string;
    adress: {
      street: string;
      city: string;
      zip: string;
      country: string;
      building: string;
    };
    isEmployee: boolean;
  };
};

interface AppContextProps {
  cartItems: Product[];
  totalPrice: number;
  days: number;
  onAdd: (item: Product) => void;
  onRemove: (item: Product) => void;
  incrementDays: () => void;
  decrementDays: () => void;
  setDays: (days: number) => void;
  isLogin: () => boolean;
  user: User | null;
}
const Context = createContext<AppContextProps | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StateContext = ({ children }: any) => {
  const cart: Product[] = [];
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [days, setDays] = useState(1);

  React.useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/cart/${user?.user?.id}`, {}).then((res) => {
        res.json().then((data) => {
          localStorage.setItem("cartId", data.id);
          if (!data.CartItem) {
            return;
          }
          setCartItems(data.CartItem.map((item: CartItem) => item.product));
          data.CartItem.map((item: CartItem) => {
            setTotalPrice(
              (prevState) => prevState + parseInt(item.product.price)
            );
          });
        });
      });
    }
  }, [user]);
  React.useEffect(() => {
    setTotalPrice(cartItems.reduce((sum, item) => sum + item.price, 0));
  }, [cartItems]);

  //functions for incrementing and decrementing the days
  const incrementDays = () => {
    setDays(days + 1);
  };
  const decrementDays = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };
  const setDaysTo = (days: number) => {
    setDays(days);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3001/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            localStorage.removeItem("token");
            setUser(null);
          } else {
            return res.json();
          }
        })
        .then((data) => setUser(data));
    }
  }, []);
  let foundProduct: Product | undefined;
  const onAdd = (item: Product) => {
    console.log(localStorage.getItem("cartId"));
    if (localStorage.getItem("cartId") === null) {
      fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("cartId", data.id);
        });
    }
    if (cartItems.find((product: Product) => product?.id === item?.id)) {
      return;
    }
    if (cartItems || item) {
      fetch(`http://localhost:3001/cart/${localStorage.getItem("cartId")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCartItems((cartItems) => [...cartItems, data.product]);
        });
    }
  };
  const onRemove = (item: Product) => {
    foundProduct = cartItems.find(
      (product: Product) => product?.id === item?.id
    );
    if (!foundProduct) {
      return;
    }
    fetch(
      `http://localhost:3001/cart/${localStorage.getItem("cartId")}/${item.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newCartItems = cartItems.filter(
      (product: Product) => product?.id !== foundProduct?.id
    );
    setCartItems(newCartItems);
  };

  const isLogin = () => {
    if (user?.user) {
      return true;
    }
    return false;
  };
  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        onAdd,
        onRemove,
        user,
        incrementDays,
        decrementDays,
        days,
        setDays: setDaysTo,
        isLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;
export const useStateContext = () => useContext(Context);
