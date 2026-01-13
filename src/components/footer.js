/**
 * Composant Footer : Pied de page du site.
 * Affiche le copyright et les liens vers le code source, avec l'animation constellation en arrière-plan.
 */
import React from 'react';

import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

import Constellation from './constellation';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  text-align: center;
`;

const StyledConstellationContainer = styled.div`
  position: relative;
  width: 100%;
  ${({ theme }) => theme.mixins.flexCenter};
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 10px auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; /* Allows mouse interactions to pass through to the canvas */
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;
  width: 100%;

  a {
    padding: 10px;
    pointer-events: auto; /* Re-enable clicks for the link */
    background: rgba(10, 25, 47, 0.4); /* Subtle background for readability */
    backdrop-filter: blur(2px);
    border-radius: var(--border-radius);
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledConstellationContainer>
      <Constellation />

      <StyledCredit tabindex="-1">
        <a href="https://github.com/meriem-moukrim/moukrim-meriem-potfolio">
          <div>© 2026 Moukrim Meriem. Tous droits réservés.</div>
        </a>
      </StyledCredit>
    </StyledConstellationContainer>

    <StyledSocialLinks>
      <ul>
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <a href={url} aria-label={name}>
                <Icon name={name} />
              </a>
            </li>
          ))}
      </ul>
    </StyledSocialLinks>
  </StyledFooter>
);

export default Footer;
