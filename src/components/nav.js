import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay, smoothScroll } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconHex, IconSun, IconMoon, Icon, IconLamp } from '@components/icons';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const StyledThemeToggle = styled.button`
  ${({ theme }) => theme.mixins.flexCenter};
  background: transparent;
  border: none;
  padding: 10px;
  color: var(--green);
  cursor: pointer;
  transition: var(--transition);
  margin-left: 10px;

  &:hover {
    svg {
      animation: ${float} 2s ease-in-out infinite;
    }
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: ${props => (props.themeMode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(5, 5, 5, 0.95)')};
  backdrop-filter: blur(8px);
  filter: none !important;
  transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding-top: 30px; 

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
    height: 70px;
  }

  ${props =>
    !props.scrolledToTop &&
    css`
      top: 15px;
      width: 90%;
      max-width: 1200px;
      height: var(--nav-scroll-height);
      border-radius: 50px;
      background-color: ${props.themeMode === 'light'
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(5, 5, 5, 0.7)'};
      backdrop-filter: blur(15px);
      border: 1px solid var(--green-tint);
      box-shadow: 0 10px 40px -10px var(--navy-shadow);
      padding: 0 40px;

      @media (max-width: 768px) {
        top: 10px;
        width: 95%;
        padding: 0 20px;
        height: 60px;
      }
    `};
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green);
      width: 42px;
      height: 42px;
      position: relative;
      z-index: 1;

      .hex-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition);
        }
      }

      .logo-container {
        position: relative;
        z-index: 1;
        svg {
          fill: none;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
          polygon {
            fill: var(--navy);
          }
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        transform: translate(-4px, -4px);
        .hex-container {
          transform: translate(4px, 3px);
        }
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-sm);

      a {
        padding: 10px;
        position: relative; // Needed for the absolute positioning of the pseudo-element

        &:focus {
           color: var(--green);
        }

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xs);
          text-align: right;
        }

        // Underline animation
        &:after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 5px;
          left: 0;
          background-color: var(--green);
          transition: width 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
        }

        &:hover {
           color: var(--green);

           &:after {
             width: 100%;
           }
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

const Nav = ({ isHome, toggleTheme, themeMode }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a
          href="/"
          aria-label="home"
          onClick={e => {
            e.preventDefault();
            smoothScroll('body');
          }}>
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </Link>
      )}
    </div>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop} themeMode={themeMode}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}

            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link
                        to={url}
                        onClick={e => {
                          if (isHome && url.startsWith('/#')) {
                            e.preventDefault();
                            smoothScroll(url.substring(1));
                          }
                        }}>
                        {name}
                      </Link>
                    </li>
                  ))}
              </ol>
              <StyledThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
                <IconLamp />
              </StyledThemeToggle>
            </StyledLinks>

            <Menu toggleTheme={toggleTheme} themeMode={themeMode} isHome={isHome} />
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <>{Logo}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <Link
                            to={url}
                            onClick={e => {
                              if (isHome && url.startsWith('/#')) {
                                e.preventDefault();
                                smoothScroll(url.substring(1));
                              }
                            }}>
                            {name}
                          </Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${isHome ? (navLinks ? navLinks.length : 0) * 100 : 0}ms` }}>
                      <StyledThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
                        <IconLamp />
                      </StyledThemeToggle>
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu toggleTheme={toggleTheme} themeMode={themeMode} isHome={isHome} />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
  toggleTheme: PropTypes.func.isRequired,
  themeMode: PropTypes.string,
};

export default Nav;
