export interface IKhaltiInitiateRequest {
  return_url: string;
  website_url: string;
  amount: number; // in paisa
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info?: {
    name?: string;
    email?: string;
    phone?: string;
  };
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
