import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CampaignList } from "../src/components/CampaignList";
import { campaigns } from "../src/data/campaigns";
import type { Campaign } from "../src/types";

describe("CampaignList", () => {
  it("renders campaign names", () => {
    render(<CampaignList campaigns={campaigns} />);

    expect(screen.getByText("Q3 Search Relaunch")).toBeInTheDocument();
    expect(screen.getByText("Retargeting Winback")).toBeInTheDocument();
    expect(screen.getByText("Holiday Awareness")).toBeInTheDocument();
  });

  it("filters campaigns by active status", async () => {
    const user = userEvent.setup();
    render(<CampaignList campaigns={campaigns} />);

    await user.selectOptions(screen.getByLabelText("Campaign status"), "active");

    expect(screen.getByText("Q3 Search Relaunch")).toBeInTheDocument();
    expect(screen.getByText("Retargeting Winback")).toBeInTheDocument();
    expect(screen.queryByText("Holiday Awareness")).not.toBeInTheDocument();
    expect(screen.queryByText("Spring Promo")).not.toBeInTheDocument();
  });

  it("shows an empty state when no campaigns match", async () => {
    const user = userEvent.setup();
    const activeOnlyCampaigns: Campaign[] = campaigns.filter(
      (campaign) => campaign.status === "active"
    );

    render(<CampaignList campaigns={activeOnlyCampaigns} />);

    await user.selectOptions(screen.getByLabelText("Campaign status"), "paused");

    expect(screen.getByText(/no campaigns match/i)).toBeInTheDocument();
  });

  it("calculates spend percentage", () => {
    render(<CampaignList campaigns={campaigns} />);

    expect(screen.getByText("85% spent")).toBeInTheDocument();
  });

  it("shows a warning when spend exceeds 80 percent of budget", () => {
    render(<CampaignList campaigns={campaigns} />);

    expect(screen.getByText("Over 80% budget")).toBeInTheDocument();
  });
});
