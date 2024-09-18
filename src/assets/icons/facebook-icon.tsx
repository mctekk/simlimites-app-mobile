import * as React from 'react';
import { SvgFromXml } from 'react-native-svg';

const FacebookIcon = (props: any) => {
  const { size = 32 } = props;

  return (
    <SvgFromXml
      xml={`
        <svg width=${size} height=${size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5 10.5608C20.5 5.03794 16.0229 0.560791 10.5 0.560791C4.97715 0.560791 0.5 5.03794 0.5 10.5608C0.5 15.5521 4.15685 19.6891 8.9375 20.4393V13.4514H6.39844V10.5608H8.9375V8.35767C8.9375 5.85141 10.4304 4.46705 12.7146 4.46705C13.8087 4.46705 14.9531 4.66235 14.9531 4.66235V7.12329H13.6922C12.4499 7.12329 12.0625 7.89414 12.0625 8.68496V10.5608H14.8359L14.3926 13.4514H12.0625V20.4393C16.8431 19.6891 20.5 15.5521 20.5 10.5608Z" fill="#1877F2"/>
        </svg>
      `}
    />
  );
};

export default FacebookIcon;
