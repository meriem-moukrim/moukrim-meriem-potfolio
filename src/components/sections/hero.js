/**
 * Section Hero : Introduction visuelle du portfolio.
 * Présente le nom, le titre et une brève description avec un bouton de téléchargement du CV.
 */
import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { socialMedia } from '@config';
import { Icon } from '@components/icons';
import IconGmail from '../icons/gmail';

const wave = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
`;

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 768px) {
    height: auto;
    padding: 60px 0;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }

    .wave-emoji {
      display: inline-block;
      animation: ${wave} 2s infinite;
      transform-origin: 70% 70%;
    }
  }

  h2 {
    font-size: clamp(40px, 8vw, 80px);

    @media (max-width: 480px) {
      font-size: 38px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate); // Fallback
    line-height: 0.9;
    font-size: clamp(30px, 6vw, 70px);

    @media (max-width: 480px) {
      font-size: 28px;
    }

    // Gradient Animation
    background: linear-gradient(90deg, var(--slate) 0%, var(--green) 50%, var(--slate) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shine} 3s linear infinite;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
    text-align: justify;
    font-size: var(--fz-xl);

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    a {
      display: inline-block;
      position: relative;
      color: var(--green);

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: var(--green);
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }

      &:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    background: linear-gradient(135deg, var(--green) 0%, #8b3e2f 100%);
    color: var(--white) !important;
    border: none;
    padding: 0.9rem 1.8rem;
    font-size: var(--fz-md);
    font-weight: 600;
    letter-spacing: 1px;
    box-shadow: 0 10px 20px -10px rgba(177, 93, 68, 0.4);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    overflow: hidden;

    &:hover,
    &:focus {
      background: linear-gradient(135deg, #8b3e2f 0%, var(--green) 100%);
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 20px 30px -15px rgba(177, 93, 68, 0.6);
      color: var(--white) !important;
      outline: none;
    }

    &:active {
      transform: translateY(-2px) scale(1);
    }
  }
`;

const StyledMobileSocial = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    margin-top: 30px;

    a {
      margin-right: 25px;
      color: var(--light-slate);
      display: flex;
      position: relative;

      svg,
      img {
        width: 22px !important;
        height: 22px !important;
      }

      &:hover,
      &:focus {
        color: var(--green);
        transform: translateY(-3px);
      }

      /* Only show tooltip on hover to avoid sticking on return */
      &:hover::after {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }

      /* Tooltip Styling */
      &::after {
        content: attr(aria-label);
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);

        background-color: var(--light-navy);
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

        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.5);
        z-index: 10;
        margin-top: 10px;
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
      &[aria-label='Email']::after {
        background-color: #ea4335;
      } /* Gmail Red */
      &[aria-label='Copie email ✔']::after {
        background-color: #25d366;
      } /* Success Green */
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const copyEmail = e => {
    e.preventDefault();
    navigator.clipboard.writeText('moukrim.meriem.dev2026@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const one = (
    <h1>
      <span className="wave-emoji">👋</span> Salut
    </h1>
  );
  const two = <h2 className="big-heading">Moukrim Meriem.</h2>;
  const three = <h3 className="big-heading">développeuse Full Stack.</h3>;
  const four = (
    <>
      <p>
        Passionné(e) par le développement web Full Stack, je suis actuellement en formation à
        l’OFPPT&nbsp;
        <a href="https://www.myway.ac.ma/ar" target="_blank" rel="noreferrer">
          CFPMS
        </a>
        , où je renforce mes compétences en front-end et back-end à travers des projets concrets et
        de l’auto-apprentissage.
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="/CV_Meriem.pdf" target="_blank" rel="noreferrer">
      Voici mon CV !
    </a>
  );

  const six = (
    <StyledMobileSocial>
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <a key={i} href={url} aria-label={name} target="_blank" rel="noreferrer">
            <Icon name={name} />
          </a>
        ))}
      {/* Gmail Icon for Mobile */}
      <a
        href="mailto:moukrim.meriem.dev2026@gmail.com"
        aria-label={emailCopied ? 'Copie email ✔' : 'Email'}
        onClick={copyEmail}>
        <IconGmail />
      </a>
    </StyledMobileSocial>
  );

  const items = [one, two, three, four, five, six];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
