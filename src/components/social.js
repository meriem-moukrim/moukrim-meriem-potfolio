import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Side } from '@components';
import { Icon } from '@components/icons';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  li {
    &:last-of-type {
      margin-bottom: 20px;
    }

    a {
      padding: 10px;
      position: relative;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      /* Only show tooltip on hover */
      &:hover::after {
        opacity: 1;
        visibility: visible;
        transform: translateY(-50%) translateX(15px);
      }

      /* Tooltip Styling */
      &::after {
        content: attr(aria-label);
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%) translateX(-20px);

        background-color: var(--light-navy); /* Default fallback */
        color: #fff;
        font-weight: 600;

        padding: 6px 12px;
        border-radius: 4px;
        font-size: 13px;
        font-family: var(--font-mono);
        letter-spacing: 0.5px;
        white-space: nowrap;

        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        /* Elastic/Spring Animation */
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.5);
        z-index: 10;
      }

      /* Dynamic Background Colors based on Platform */
      &[aria-label='GitHub']::after {
        background-color: #333;
      }
      &[aria-label='Linkedin']::after {
        background-color: #0077b5;
      }
      &[aria-label='Instagram']::after {
        background-color: #e1306c;
      }
      &[aria-label='Twitter']::after {
        background-color: #1da1f2;
      }
      &[aria-label='WhatsApp']::after {
        background-color: #25d366;
      }

      svg,
      img {
        width: 20px;
        height: 20px;
        transition: var(--transition);
      }
    }
  }
`;

const Social = ({ isHome }) => (
  <Side isHome={isHome} orientation="left">
    <StyledSocialList>
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i}>
            <a href={url} aria-label={name} target="_blank" rel="noreferrer">
              <Icon name={name} />
            </a>
          </li>
        ))}
    </StyledSocialList>
  </Side>
);

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;
