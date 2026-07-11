export interface IKhaltiInitiateRequest {
  return_url: string;
  website_url: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  product_details: [
    {
      identity: string;
      name: string;
      total_price: number;
      quantity: number;
      unit_price: number;
    },
  ];
}

export interface IKhaltiInitiateResponse {
  pidx: string;
  payment_url: string;
  status?: string;
  [key: string]: any;
  expires_in?: number;
}

export interface IKhaltiVerifyRequest {
  pidx: string;
}

export interface IKhaltiVerifyResponse {
  status: string;
  [key: string]: any;
}

export interface IPayment extends IKhaltiInitiateRequest {
  _id?: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  pidx: string;
  mobile?: string;
  
  status: "Pending" | "Completed" | "Failed";
}
