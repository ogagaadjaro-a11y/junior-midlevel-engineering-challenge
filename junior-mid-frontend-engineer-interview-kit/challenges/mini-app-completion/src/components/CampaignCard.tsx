import type { Campaign } from "../types";

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <article className="campaign-card" aria-label={campaign.name}>
      <h3>{campaign.name}</h3>
      <p>Status: {campaign.status}</p>
      {/* TODO: show budget, spend, impressions, clicks, spend percentage, and warning state. */}
    </article>
  );
}
