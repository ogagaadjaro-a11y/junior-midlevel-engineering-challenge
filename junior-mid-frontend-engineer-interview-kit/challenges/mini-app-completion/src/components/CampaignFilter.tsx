import type { CampaignStatus } from "../types";

type CampaignFilterProps = {
  selectedStatus: CampaignStatus | "all";
  onStatusChange: (status: CampaignStatus | "all") => void;
};

export function CampaignFilter({ selectedStatus }: CampaignFilterProps) {
  return (
    <label>
      Status
      <select
        aria-label="Campaign status"
        value={selectedStatus}
        onChange={() => {
          // TODO: notify the parent when the selected status changes.
        }}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="completed">Completed</option>
      </select>
    </label>
  );
}
