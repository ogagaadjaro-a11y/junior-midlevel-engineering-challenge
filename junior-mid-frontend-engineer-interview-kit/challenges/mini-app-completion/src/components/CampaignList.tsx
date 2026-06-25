import { useState } from "react";
import { CampaignCard } from "./CampaignCard";
import { CampaignFilter } from "./CampaignFilter";
import type { Campaign, CampaignStatus } from "../types";

type CampaignListProps = {
  campaigns: Campaign[];
};

export function CampaignList({ campaigns }: CampaignListProps) {
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus | "all">("all");

  // TODO: filter campaigns by selectedStatus and show an empty state when needed.
  const visibleCampaigns = campaigns;

  return (
    <section className="campaign-list" aria-label="Campaign performance">
      <CampaignFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      <div className="campaign-grid">
        {visibleCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
