import React from 'react';
import PropTypes from 'prop-types';
import {
    IconAppStore,
    IconBookmark,
    IconCodepen,
    IconExternal,
    IconFolder,
    IconFork,
    IconGitHub,
    IconInstagram,
    IconLinkedin,
    IconLoader,
    IconLogo,
    IconPlayStore,
    IconStar,
    IconTwitter,
    IconWhatsApp,
    IconLamp,
    IconFullScreen,
} from '@components/icons';
import GitHubIcon from '../../images/social/github.png';
import LinkedinIcon from '../../images/social/linkedin.png';
import WhatsAppIcon from '../../images/social/whatsapp.png';

const Icon = ({ name }) => {
    switch (name) {
        case 'AppStore':
            return <IconAppStore />;
        case 'Bookmark':
            return <IconBookmark />;
        case 'Codepen':
            return <IconCodepen />;
        case 'External':
            return <IconExternal />;
        case 'Folder':
            return <IconFolder />;
        case 'FullScreen':
            return <IconFullScreen />;
        case 'Fork':
            return <IconFork />;
        case 'GitHub':
            return <img src={GitHubIcon} alt="GitHub" />;
        case 'Instagram':
            return <IconInstagram />;
        case 'Linkedin':
            return <img src={LinkedinIcon} alt="Linkedin" />;
        case 'Loader':
            return <IconLoader />;
        case 'Logo':
            return <IconLogo />;
        case 'PlayStore':
            return <IconPlayStore />;
        case 'Star':
            return <IconStar />;
        case 'Twitter':
            return <IconTwitter />;
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
