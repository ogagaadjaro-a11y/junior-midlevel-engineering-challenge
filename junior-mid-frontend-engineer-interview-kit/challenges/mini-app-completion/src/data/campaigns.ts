import type { Campaign } from "../types";

export const campaigns: Campaign[] = [
  {
    id: "campaign-1",
    name: "Q3 Search Relaunch",
    status: "active",
    budget: 100000,
    spend: 62000,
    impressions: 450000,
    clicks: 12800
  },
  {
    id: "campaign-2",
    name: "Retargeting Winback",
    status: "active",
    budget: 10000,
    spend: 8500,
    impressions: 90000,
    clicks: 4100
  },
  {
    id: "campaign-3",
    name: "Holiday Awareness",
    status: "paused",
    budget: 50000,
    spend: 12000,
    impressions: 180000,
    clicks: 2300
  },
  {
    id: "campaign-4",
    name: "Spring Promo",
    status: "completed",
    budget: 40000,
    spend: 39750,
    impressions: 320000,
    clicks: 7600
  }
];
