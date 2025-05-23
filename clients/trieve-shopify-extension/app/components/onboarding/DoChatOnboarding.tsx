import { Button, Text } from "@shopify/polaris";
import { CheckIcon } from "@shopify/polaris-icons";
import { useQuery } from "@tanstack/react-query";
import { useTrieve } from "app/context/trieveContext";
import { allChatsQuery } from "app/queries/analytics/chat";
import { OnboardingBody } from "app/utils/onboarding";
import { useShopName } from "app/utils/useShopName";
import { useEffect } from "react";

export const DoChatOnboarding: OnboardingBody = ({ broadcastCompletion }) => {
  const { trieve } = useTrieve();

  const { data: chats } = useQuery(allChatsQuery(trieve, {}, 1));
  const shopname = useShopName();
  const shopUrl = shopname ? `https://${shopname}` : null;

  useEffect(() => {
    if (chats && chats.topics.length > 0) {
      if (broadcastCompletion) {
        broadcastCompletion();
      }
    }
  }, [chats]);

  const complete =
    chats?.topics.length !== undefined && chats?.topics.length > 0;

  const viewStore = () => {
    if (shopUrl) {
      window.open(shopUrl, "_blank");
    }
  };

  return (
    <div className="grid w-full h-[180px] pb-4 px-4 py-2">
      <div className="flex justify-between items-center gap-1">
        {complete === false && (
          <Text as="p">
            Chat with your products using the Trieve chat widget.
          </Text>
        )}
        {complete && (
          <div className="w-full flex flex-col justify-center items-center">
            <CheckIcon
              fill="#2A845A"
              color="#2A845A"
              style={{ height: "50px" }}
            />
            <Text as="p">
              {chats.topics.length}{" "}
              {chats.topics.length === 1 ? "conversation" : "conversations"}{" "}
              completed
            </Text>
          </div>
        )}

        {shopUrl && !complete && (
          <Button onClick={viewStore}>View Store</Button>
        )}
      </div>
    </div>
  );
};
