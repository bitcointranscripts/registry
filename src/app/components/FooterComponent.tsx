"use client";

import React from "react";
import { Wrapper } from ".";
import { Footer } from "@bitcoin-dev-project/bdp-ui";

const FooterComponent = () => {
  return (
    <div>
      <div className='border-b-[0.5px] border-b-gray-custom-400 max-md:mx-6'></div>
      <Wrapper className='py-10 max-md:pt-8 max-md:pb-[67px] max-lg:px-2 w-full'>
        <Footer>
          <Footer.Socials
            platforms={[
              {
                entity: "github",
                entityLink: "https://github.com/bitcointranscripts/registry",
                iconProps: {
                  className: "hover:text-orange-400",
                },
              },
              {
                entity: "discord",
                entityLink: "https://discord.gg/EAy9XMufbY",
                iconProps: {
                  className: "hover:text-orange-400",
                },
              },
              {
                entity: "twitter",
                entityLink: "https://x.com/Bitcoin_Devs",
                iconProps: {
                  className: "hover:text-orange-400",
                },
              },
              {
                entity: "nostr",
                entityLink: "https://njump.me/npub10p33xu03t8q7d9nxtks63dq4gmt4v4d3ppd5lcdp4rg9hxsd0f8q7mn2l2",
                iconProps: {
                  className: "hover:text-orange-400",
                },
              },
            ]}
          />
          <Footer.Public dashboardLink='https://visits.bitcoindevs.xyz/share/7hL0ysupLrZQsKRw/btc-transcripts' />
          <Footer.About entityLink='https://bitcoindevs.xyz' entityName='Bitcoin Dev Project' />
          <Footer.Feedback feedbackLink='https://cryptpad.fr/form/#/2/form/view/3P2CsohsHOkcH7C+WdtX0-tvqjBHqXnAmz5D9yx0e04/' />
        </Footer>
      </Wrapper>
    </div>
  );
};

export default FooterComponent;
