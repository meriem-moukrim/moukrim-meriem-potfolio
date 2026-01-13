import React from 'react';
import PropTypes from 'prop-types';
import {
  IconExternal,
  IconFolder,
  IconLoader,
  IconLogo,
  IconLamp,
  IconFullScreen,
} from '@components/icons';
import GitHubIcon from '../../images/social/github.png';
import LinkedinIcon from '../../images/social/linkedin.png';
import WhatsAppIcon from '../../images/social/whatsapp.png';

const Icon = ({ name }) => {
  switch (name) {
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'FullScreen':
      return <IconFullScreen />;
    case 'GitHub':
      return <img src={GitHubIcon} alt="GitHub" />;
    case 'Linkedin':
      return <img src={LinkedinIcon} alt="Linkedin" />;
    case 'Loader':
      return <IconLoader />;
    case 'Logo':
      return <IconLogo />;
    case 'WhatsApp':
      return <img src={WhatsAppIcon} alt="WhatsApp" />;
    case 'Lamp':
      return <IconLamp />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
