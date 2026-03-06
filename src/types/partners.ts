export type ChangeStatus = {
  status: "approved";
};

export type PartnerRecord = Record<string, unknown>;

export type PartnerRow = {
  id: string;
  name: string;
  phone: string;
  city: string;
  requestedAt: string;
  status: string;
};

export type PartnersResponse = {
  counts?: {
    all?: number;
    approved?: number;
    reviewing?: number;
  };
  data?: {
    current_page?: number;
    data?: PartnerRecord[];
    last_page?: number;
    per_page?: number;
    total?: number;
    from?: number;
    to?: number;
  };
  message?: string;
  status?: boolean;
};
