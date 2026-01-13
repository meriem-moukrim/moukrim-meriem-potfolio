import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email } from '@config';
import { Side } from '@components';

const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  a {
    margin: 20px auto;
    padding: 10px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: var(--fz-lg);
    letter-spacing: 0.1em;
    writing-mode: vertical-rl;
    position: relative;
    cursor: pointer;

    &:hover,
    &:focus {
      transform: translateY(-3px);

      .tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .tooltip {
    position: absolute;
    top: 50%;
    left: -120px;
    transform: translateY(-50%);
    background-color: var(--green);
    color: var(--white);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    padding: 5px 12px;
    border-radius: var(--border-radius);
    border: 1px solid var(--green);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    pointer-events: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: -4px;
      transform: translateY(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background-color: var(--green);
    }
  }
`;

const Email = ({ isHome }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmail = e => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Side isHome={isHome} orientation="right">
      <StyledLinkWrapper>
        <a href={`mailto:${email}`} onClick={copyEmail}>
          {email}
          <span className="tooltip">{isCopied ? 'Copié !' : 'Copier l\'email'}</span>
        </a>
      </StyledLinkWrapper>
    </Side>
  );
};

Email.propTypes = {
  isHome: PropTypes.bool,
};

export default Email;
