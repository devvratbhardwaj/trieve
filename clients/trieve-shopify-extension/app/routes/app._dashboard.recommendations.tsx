import { Grid, Tabs } from "@shopify/polaris";
import { SearchFilterBar } from "app/components/analytics/FilterBar";
import { defaultSearchAnalyticsFilter } from "app/queries/analytics/search";
import { useState } from "react";
import { Granularity } from "trieve-ts-sdk";
import { RecommendationsUsageChart } from "app/components/analytics/recommendations/RecommendationsUsageChart";
import { RecommendationsPerUser } from "app/components/analytics/recommendations/RecommendationsPerUser";
import { RecommendationsCTRRate } from "app/components/analytics/recommendations/RecommendationsCTRRate";
import { AllRecommendationsTable } from "app/components/analytics/recommendations/AllRecommendationsTable";
import { RecommendationConversionRate } from "app/components/analytics/recommendations/RecommendationConversionRate";
import { RecommendationUserJourneyFunnel } from "app/components/analytics/recommendations/RecommendationUserJourneyFunnel";

export default function SearchAnalyticsPage() {
  const [filters, setFilters] = useState(defaultSearchAnalyticsFilter);
  const [granularity, setGranularity] = useState<Granularity>("day");
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      <div className="-ml-2">
        <Tabs
          tabs={[
            {
              id: "recommendations-usage",
              content: "Recommendations Overview",
            },
            {
              id: "all-recommendations",
              content: "All Recommendations",
            },
          ]}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
      </div>

      {selectedTab === 0 && (
        <>
          <SearchFilterBar
            granularity={granularity}
            setGranularity={setGranularity}
            filters={filters}
            setFilters={setFilters}
          />
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div className="flex flex-col gap-4">
                <RecommendationsUsageChart
                  filters={filters}
                  granularity={granularity}
                />
                <RecommendationsPerUser
                  filters={filters}
                  granularity={granularity}
                />
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div className="flex flex-col gap-4">
                <RecommendationUserJourneyFunnel filters={filters} />
                <RecommendationsCTRRate
                  filters={filters}
                  granularity={granularity}
                />
                <RecommendationConversionRate
                  filters={filters}
                  granularity={granularity}
                />
              </div>
            </Grid.Cell>
          </Grid>
        </>
      )}
      {selectedTab === 1 && <AllRecommendationsTable />}
    </>
  );
}
