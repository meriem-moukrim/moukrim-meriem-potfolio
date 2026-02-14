/**
 * Section About : Présentation personnelle.
 * Contient ma biographie, ma photo et une description de mon parcours.
 */
import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';
import { ScrollReveal } from '@components';

const StyledAboutSection = styled.section`
  max-width: 900px;
  scroll-margin-top: 150px;
  @media (max-width: 768px) {
    scroll-margin-top: 70px;
  }
  padding-top: 0px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: transparent;

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: normal;
      filter: none;
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: transparent;
      mix-blend-mode: normal;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const content = (
    <StyledAboutSection id="about">
      <h2 className="numbered-heading">À propos de moi</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Bonjour, je m’appelle Moukrim Meriem, stagiaire en développement web Full Stack à
              l’OFPPT.
            </p>

            <p>
              J’ai découvert le développement web à travers ma formation, où j’ai commencé à créer
              des interfaces simples et des applications web en utilisant JavaScript/React et
              PHP/Laravel. J’aime comprendre comment les choses fonctionnent et transformer des
              idées en solutions numériques concrète
            </p>

            <p>
              Aujourd’hui, je continue à développer mes compétences en front-end et back-end à
              travers des projets académiques, des exercices pratiques et l’auto-apprentissage. Je
              m’intéresse particulièrement à la création d’applications claires, fonctionnelles et
              faciles à utiliser.
            </p>

            <p>
              Mon objectif est de décrocher un stage qui me permettra d’appliquer mes connaissances,
              d’apprendre auprès de professionnels et d’évoluer dans un environnement stimulant.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );

  return prefersReducedMotion ? content : <ScrollReveal>{content}</ScrollReveal>;
};

export default About;
