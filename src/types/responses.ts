export type Order = {
  id: string;
  number: number;
  price: number;
  rentStart: string;
  rentEnd: string;
  rentDays: number;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    adress: {
      city: string;
      street: string;
      building: string;
      zip: string;
    };
    User: {
      email: string;
    };
  };
  status: { name: string };
  products: {
    id: string;
    serialNumer: string;
    Model: {
      id: string;
      name: string;
      img: string;
      price: number;
      category: { name: string };
    };
  }[];
};
export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  img: string;
  category: { id: string; name: string; description: string };
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  status: string;
  role: { name: string };
  avatar: string;
  password: string;
  token: string;
  lastLogin: string;
  Position: string;
  positionId: string;
  Salary: string;
  salaryId: string;
  bonus: string;
};
