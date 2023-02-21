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
  ProductHistory: {
    id: string;
    Product: {
      id: string;
      serialNumer: string;
      Model: {
        id: string;
        name: string;
        img: string;
        price: number;
        category: { name: string };
      };
    };
  }[];
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
  price: number;
  description: string;
  img: string;
  category: { id: string; name: string; description: string };
  ModelDetails: { id: string; name: string; value: string }[];
  availableQuantity: number;
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
  Position: {
    id: string;
    name: string;
  };
  positionId: string;
  Salary: {
    id: string;
    createdAt: string;
    basic: number;
    bonus: number;
    taxes: number;
    payDate: string;
    employeeId: string;
    currencyId: string;
    salaryStatusId: string;
    Currency: {
      id: string;
      createdAt: string;
      name: string;
      status: string;
    };
    SalaryStatus: {
      id: string;
      createdAt: string;
      name: string;
      status: string;
    };
  }[];
  KanbanTask: KanbanTask[];
};

export type Kanban = {
  id: string;
  name: string;
  createdAt: string;
  tasks: {
    id: string;
    name: string;
    createdAt: string;
    KanbanTaskLabel: { name: string }[];
    KanbanTaskAttachment: { name: string }[];
  }[];
};

export interface KanbanTaskLabel {
  id: string;
  createdAt: Date;
  name: string;
  taskId: string;
}

export interface KanbanTaskAttachment {
  id: string;
  createdAt: Date;
  name: string;
  taskId: string;
}

export interface KanbanTaskChecklistItemLabel {
  id: string;
  createdAt: Date;
  name: string;
  taskId: string;
}

export interface KanbanTaskChecklistItemAttachment {
  id: string;
  createdAt: Date;
  name: string;
  taskId: string;
}

export interface KanbanTaskChecklistItem {
  id: string;
  createdAt: Date;
  name: string;
  checked: boolean;
  taskId: string;
  KanbanTaskChecklistItemLabel: KanbanTaskChecklistItemLabel[];
  KanbanTaskChecklistItemAttachment: KanbanTaskChecklistItemAttachment[];
}

export interface KanbanTaskChecklist {
  id: string;
  createdAt: Date;
  name: string;
  taskId: string;
  KanbanTaskChecklistItem: KanbanTaskChecklistItem[];
}

export interface KanbanTask {
  id: string;
  createdAt: Date;
  name: string;
  columnId: string;
  KanbanTaskLabel: KanbanTaskLabel[];
  KanbanTaskAttachment: KanbanTaskAttachment[];
  KanbanTaskChecklist: KanbanTaskChecklist[];
  KanbanTaskComment: any[];
  Employee: Employee[];
}

export type Equipment = {
  id: string;
  createdAt: string;
  updatedAt: string;
  serialNumer: string;
  boughtAt: string;
  warrantyExpiration: string;
  warranty: string;
  productStatusId: string;
  modelId: string;
  ProductStatus: {
    id: string;
    name: string;
  };
  Model: Product;

  sumOfMaintanceCost: number;
  numberOfOrders: number;
  lastMaintance: string;
  lastOrder: string;
  statuses: { id: string; name: string }[];
};

export type Maintence = {
  id: string;
  createdAt: string;
  description: string;
  price: number;
  start: string;
  estimatedTime: string;
  Product: Equipment;
  productId: string;
  maintenanceStatus: { name: string };
  MaintenanceDetails: MaintenceDetail[];
  endDate?: string;
};

export type MaintenceDetail = {
  id: string;
  createdAt: string;

  price: number;
  description: string;
};

export type CartItem = {
  id: string;
  cartId: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    img: string;
  };
};

export type Comment = {
  id: string;
  KanbanTaskCommentLabel: {
    id: string;
    name: string;
  }[];
  KanbanTaskCommentAttachment: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  Employee: Employee;
};
