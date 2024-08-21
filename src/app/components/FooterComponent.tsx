import React from "react";
import { Footer } from "bdp-ui";
import { Wrapper } from ".";

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
                entityLink: "https://twitter.com/bitcoindevs",
                iconProps: {
                  className: "hover:text-orange-400",
                },
              },
              {
                entity: "nostr",
                entityLink: "https://discord.gg/bitcoindevs",
                iconProps: {
                  className: "hover:text-orange-400",
                },
              },
            ]}
          />
          <Footer.Public dshboardLink='https://visits.bitcoindevs.xyz/share/0Beh7BUzocqrtgA5/bitcoin-search' />
          <Footer.About entityLink='https://bitcoindevs.xyz' entityName='Bitcoin Dev Project' />
          <Footer.Feedback feedbackLink='https://cryptpad.fr/form/#/2/form/view/3P2CsohsHOkcH7C+WdtX0-tvqjBHqXnAmz5D9yx0e04/' />
        </Footer>
      </Wrapper>
    </div>
  );
};

export default FooterComponent;
