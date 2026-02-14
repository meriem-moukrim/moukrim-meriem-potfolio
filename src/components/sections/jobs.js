/**
 * Section Jobs : Expériences et Certifications.
 * Utilise un système d'onglets pour présenter le parcours académique, professionnel et les certificats obtenus.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { KEY_CODES } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { ScrollReveal } from '@components';

const StyledMobileNav = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin: 10px 0 25px;
    height: 38px; // Fixed height to prevent layout shifts
  }
`;

const NavButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1.5px solid #e07a5f;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #e07a5f;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0;

  &:hover,
  &:focus {
    background: rgba(224, 122, 95, 0.1);
    outline: none;
  }

  &[disabled] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const FullscreenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 50px;

  @media (max-width: 768px) {
    padding: 20px;
  }

  .modal-image-wrapper {
    position: relative;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    background-color: var(--navy);
    padding: 10px;
    border-radius: var(--border-radius);
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close-button {
    position: absolute;
    top: -40px;
    right: -40px;
    background: transparent;
    border: none;
    color: var(--white);
    font-size: 35px;
    cursor: pointer;
    line-height: 1;
    transition: var(--transition);

    &:hover {
      color: var(--green);
      transform: scale(1.1);
    }

    @media (max-width: 1080px) {
      top: -45px;
      right: 0;
    }
  }
`;

const StyledJobsSection = styled.section`
  max-width: 1200px;
  scroll-margin-top: 120px;
  @media (max-width: 768px) {
    scroll-margin-top: 70px;
  }

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;
  max-width: 200px; // Limit width of the tab list

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: 100%;
    margin-bottom: 30px;
    padding: 0;
    max-width: none;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; // Firefox
    &::-webkit-scrollbar {
      display: none; // Safari/Chrome
    }
  }

  li {
    @media (max-width: 600px) {
      flex: 0 0 auto; // Prevent list items from shrinking
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--tab-height);
  padding: 10px 20px;
  border-left: 2px solid ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--light-navy)')};
  background-color: ${({ isActive }) => (isActive ? 'var(--light-navy)' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-md);
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  text-align: left;
  white-space: normal;
  transition: var(--transition);

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    width: auto;
    flex: 0 0 auto;
    padding: 12px 20px;
    border-left: 0;
    border-bottom: 2px solid ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--light-navy)')};
    text-align: center;
    white-space: nowrap;
  }

  &:hover,
  &:focus {
    @media (hover: hover) {
      background-color: var(--green-tint);
    }
    outline: 0;
  }

  @media (max-width: 600px) {
    &:hover,
    &:focus {
      background-color: ${({ isActive }) => (isActive ? 'var(--light-navy)' : 'transparent')};
    }
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 0;
  height: 0;
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
    font-size: var(--fz-xxl);

    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    li {
      opacity: 0;
      transform: translateY(10px);
      animation: fadeIn 0.5s forwards;
      padding-left: 20px;

      @media (max-width: 480px) {
        padding-left: 25px;
      }

      &:before {
        content: '▶';
        position: absolute;
        left: 0;
        color: #e07a5f;
        font-size: var(--fz-sm);
        line-height: 12px;

        @media (max-width: 480px) {
          top: 5px;
        }
      }

      &:nth-child(1) {
        animation-delay: 0.1s;
      }
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.3s;
      }
      &:nth-child(4) {
        animation-delay: 0.4s;
      }
      &:nth-child(5) {
        animation-delay: 0.5s;
      }
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    @media (min-width: 768px) {
      font-size: var(--fz-heading);
    }
    font-weight: 500;
    line-height: 1.3;

    // Color for Title
    color: var(--green);

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;

    @media (max-width: 600px) {
      display: block; // Change to block to prevent flex jumps
      margin-bottom: 10px;
    }

    .title-text {
      flex: 0 1 auto;
      @media (max-width: 600px) {
        display: block;
        margin-bottom: 10px;
      }
    }

    .view-cert-button {
      ${({ theme }) => theme.mixins.smallButton};
      font-size: var(--fz-xs);
      padding: 0.5rem 1rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 1;

      @media (max-width: 600px) {
        display: inline-block;
        margin-top: 5px;
      }

      // Shine effect element
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(171, 157, 105, 0.5), transparent);
        transition: all 0.6s;
        z-index: -1;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(175, 168, 141, 0.3); // Green glow
        background-color: #d7c4991a;

        &::before {
          left: 100%;
        }
      }

      &:active {
        transform: translateY(-1px);
        box-shadow: 0 2px 10px rgba(100, 255, 218, 0.2);
      }
    }

    .company {
      color: var(--lightest-slate);
      display: block; // Force new line
      width: 100%;
      font-size: var(--fz-xl);
      margin-top: 5px;
    }
  }

  .range-wrapper {
    .inline-link {
      display: inline-block;
      position: relative;
      color: #e07a5f;
      text-decoration: none;

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 1px;
        bottom: 0;
        left: 0;
        background-color: #e07a5f;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }

      &:hover:after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  }

  .range-wrapper {
    margin-bottom: 25px;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    color: var(--slate);
    display: flex;
    align-items: center;
    gap: 15px;

    .range {
      font-style: italic;
    }

    .view-cert-link {
      color: var(--green);
      cursor: pointer;
      font-size: var(--fz-sm);
      position: relative;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &:before {
        content: '↳';
        margin-right: 5px;
      }
    }
  }
`;

const StyledTabContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const StyledTextContent = styled.div`
  flex: 1;

  p,
  ul,
  ol,
  div {
    text-align: justify;
  }
`;

const StyledCertificateWrapper = styled.div`
  position: relative;
  width: 300px;
  flex-shrink: 0;
  border: 1px solid var(--light-navy);
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);

  // Default state on desktop: hidden
  @media (min-width: 900px) {
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);

      // Force overlay to be visible when the wrapper is shown via hover state
      .overlay {
        opacity: 1;
      }
    }
  }

  // Mobile: always visible, overlay works on touch/hover if supported
  @media (max-width: 900px) {
    width: 100%;
    margin-top: 20px;
    opacity: 1;
    visibility: visible;
  }

  // Hide huge image on small screens, rely on the button
  @media (max-width: 768px) {
    display: none;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);

    .overlay {
      opacity: 1;
    }
  }
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2); // Light overlay
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: var(--transition);

  .view-circle {
    width: 80px;
    height: 80px;
    background-color: #e07a5f;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StyledButtonWrapper = styled.div`
  position: relative;
  display: inline-block;

  .cert-image-preview {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 240px;
    z-index: 20;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    pointer-events: none;
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    border-radius: var(--border-radius);
    cursor: pointer;
    overflow: hidden;

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: var(--transition);
    }

    .view-circle-small {
      width: 50px;
      height: 50px;
      background-color: #e07a5f;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
  }

  &:hover {
    .view-cert-button {
      opacity: 0;
      visibility: hidden;
    }
    .cert-image-preview {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
              certificate {
                childImageSharp {
                  gatsbyImageData(width: 1200, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // No longer using sr.reveal here

  // Reset hover state when tab changes
  useEffect(() => {
    setIsHovering(false);

    // Scroll active tab into view on mobile (move to first position)
    if (tabs.current[activeTabId] && window.innerWidth <= 600) {
      const container = tabs.current[activeTabId].parentNode;
      const scrollLeft = tabs.current[activeTabId].offsetLeft;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [activeTabId]);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  useEffect(() => focusTab(), [tabFocus]);

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }
      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handlePrevTab = () => {
    setActiveTabId(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextTab = () => {
    setActiveTabId(prev => (prev < jobsData.length - 1 ? prev + 1 : prev));
  };

  const content = (
    <StyledJobsSection id="jobs">
      <h2 className="numbered-heading">Expériences & Certificats</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={e => onKeyDown(e)}>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { title } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{title}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          <StyledMobileNav>
            <NavButton onClick={handlePrevTab} aria-label="Précédent" disabled={activeTabId === 0}>
              <svg viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </NavButton>
            <NavButton
              onClick={handleNextTab}
              aria-label="Suivant"
              disabled={activeTabId === jobsData.length - 1}>
              <svg viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </NavButton>
          </StyledMobileNav>
          {jobsData &&
            jobsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, company, range, certificate } = frontmatter;
              const image = getImage(certificate);

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fadeup">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <StyledTabContent>
                      <StyledTextContent>
                        <h3>
                          <span className="title-text">{title}</span>
                          {image && (
                            <StyledButtonWrapper>
                              <button
                                type="button"
                                className="view-cert-button"
                                onClick={e => {
                                  e.preventDefault();
                                  setModalImage(image);
                                }}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}>
                                Voir certificat
                              </button>
                              <div
                                className="cert-image-preview"
                                onClick={e => {
                                  e.preventDefault();
                                  setModalImage(image);
                                }}
                                onKeyDown={e => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setModalImage(image);
                                  }
                                }}
                                role="button"
                                tabIndex={0}>
                                <GatsbyImage image={image} alt="Certificate Preview" />
                                <div className="image-overlay">
                                  <div className="view-circle-small">View</div>
                                </div>
                              </div>
                            </StyledButtonWrapper>
                          )}
                          <span className="company">{company}</span>
                        </h3>

                        <div className="range-wrapper">
                          <span className="range">{range}</span>
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: html }} />
                      </StyledTextContent>

                      {image && (
                        <StyledCertificateWrapper
                          className={isHovering ? 'visible' : ''}
                          onClick={() => setModalImage(image)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setModalImage(image);
                            }
                          }}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          role="button"
                          tabIndex={0}>
                          <GatsbyImage
                            image={image}
                            alt={`${title} Certificate`}
                            objectFit="cover"
                            style={{ height: '100%' }}
                          />
                          <StyledOverlay className="overlay">
                            <div className="view-circle">View</div>
                          </StyledOverlay>
                        </StyledCertificateWrapper>
                      )}
                    </StyledTabContent>
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>

      {modalImage && (
        <FullscreenModal onClick={() => setModalImage(null)}>
          <div
            className="modal-image-wrapper"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
            role="button"
            tabIndex={0}>
            <button className="close-button" onClick={() => setModalImage(null)} aria-label="Close">
              &times;
            </button>
            <GatsbyImage image={modalImage} alt="Certificate" objectFit="contain" />
          </div>
        </FullscreenModal>
      )}
    </StyledJobsSection>
  );

  return prefersReducedMotion ? content : <ScrollReveal>{content}</ScrollReveal>;
};

export default Jobs;
