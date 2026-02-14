/**
 * Section Skills : Liste des compétences techniques.
 * Affiche les langages et outils maîtrisés sous forme de listes catégorisées.
 */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';
import { ScrollReveal } from '@components';

// Import images from assets
import reactImg from '../assets/react.png';
import javascriptImg from '../assets/javascript.png';
import bootstrapImg from '../assets/bootstrap.png';
import html5Img from '../assets/html5.png';
import css3Img from '../assets/css3.png';
import phpImg from '../assets/php.png';
import laravelImg from '../assets/Laravel.png';
import pythonImg from '../assets/python.png';
import sqlImg from '../assets/sql.png';
import mysqlImg from '../assets/mysql.png';
import vscodeImg from '../assets/vscode.png';
import jiraImg from '../assets/jira.png';
import firebaseImg from '../assets/Firebase.png';
import figmaImg from '../assets/figma.png';
import pycharmImg from '../assets/PyCharm.png';
import mongodbImg from '../assets/MongoDB.png';
import vercelImg from '../assets/Vercel.png';

const StyledSkillsSection = styled.section`
  max-width: 1200px;
  scroll-margin-top: 120px;
  @media (max-width: 768px) {
    scroll-margin-top: 70px;
  }

  .inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 80px;
    align-items: center;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      grid-gap: 50px;
    }
  }
`;

const StyledContent = styled.div`
  h3 {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 600;
    color: var(--lightest-slate);
    margin-bottom: 20px;
  }

  p {
    color: var(--light-slate);
    font-size: var(--fz-xxl);
    line-height: 1.6;
    margin-bottom: 30px;
  }
`;

const StyledSkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 200px 0;

  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
    color: var(--light-slate);
    font-size: var(--fz-xl);
    line-height: 1.6;

    .check-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      margin-right: 15px;
      margin-top: 2px;
      color: var(--green);
    }

    strong {
      color: var(--lightest-slate);
      font-weight: 600;
    }
  }
`;

const StyledTechDiagram = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px;
  margin: -240px auto 0;

  @media (max-width: 768px) {
    max-width: 400px;
    height: 400px;
    margin: -180px auto 0;
  }

  @media (max-width: 480px) {
    max-width: 300px;
    height: 300px;
    margin: -200px auto 0;
  }

  .center-globe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, var(--green), #4ecdc4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    color: var(--navy);
    box-shadow: 0 0 30px rgba(100, 255, 218, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(100, 255, 218, 0.3);
    z-index: 10;

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
      font-size: 18px;
    }

    @media (max-width: 480px) {
      width: 50px;
      height: 50px;
      font-size: 16px;
    }
  }

  .tech-item {
    position: absolute;
    background-color: var(--light-navy);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--lightest-navy);
    transition: var(--transition);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    padding: 6px;
    overflow: hidden;
    z-index: 5;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 6px;
    }

    &:hover {
      transform: scale(1.15);
      border-color: var(--green);
      box-shadow: 0 0 25px rgba(100, 255, 218, 0.4);
      z-index: 6;
    }
  }

  .connection-line {
    position: absolute;
    background: var(--lightest-navy);
    height: 1px;
    opacity: 0.3;
    transform-origin: left center;
    z-index: 1;
  }

  /* Inner circle - petit cercle */
  .inner-circle {
    .tech-item {
      width: 40px;
      height: 40px;
      padding: 5px;

      @media (max-width: 768px) {
        width: 35px;
        height: 35px;
        padding: 4px;
      }

      @media (max-width: 480px) {
        width: 30px;
        height: 30px;
        padding: 3px;
      }
    }
  }

  /* Outer circle - grand cercle */
  .outer-circle {
    .tech-item {
      width: 55px;
      height: 55px;
      padding: 8px;

      @media (max-width: 768px) {
        width: 45px;
        height: 45px;
        padding: 6px;
      }

      @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        padding: 5px;
      }
    }
  }
`;

const CheckIcon = () => (
  <svg
    className="check-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Skills = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dimensions, setDimensions] = React.useState({
    innerRadius: 100,
    outerRadius: 220,
    centerX: 300,
    centerY: 300,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setDimensions({
          innerRadius: 55,
          outerRadius: 120,
          centerX: 150,
          centerY: 150,
        });
      } else if (width <= 768) {
        setDimensions({
          innerRadius: 70,
          outerRadius: 150,
          centerX: 200,
          centerY: 200,
        });
      } else {
        setDimensions({
          innerRadius: 80,
          outerRadius: 180,
          centerX: 250,
          centerY: 250,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { innerRadius, outerRadius, centerX, centerY } = dimensions;

  // Classification based on the reference image (Core inner, Tools/Backend outer)
  const skillsData = [
    // Inner Ring (Core Frontend/Web Technologies)
    { name: 'HTML5', image: html5Img, color: '#E34F26', type: 'inner' },
    { name: 'CSS3', image: css3Img, color: '#1572B6', type: 'inner' },
    { name: 'JavaScript', image: javascriptImg, color: '#F7DF1E', type: 'inner' },
    { name: 'React.js', image: reactImg, color: '#61DAFB', type: 'inner' },
    { name: 'Bootstrap', image: bootstrapImg, color: '#7952B3', type: 'inner' },

    // Outer Ring (Backend, Tools, Databases)
    { name: 'PHP', image: phpImg, color: '#777BB4', type: 'outer' },
    { name: 'Laravel', image: laravelImg, color: '#FF2D20', type: 'outer' },
    { name: 'Python', image: pythonImg, color: '#3776AB', type: 'outer' },
    { name: 'SQL', image: sqlImg, color: '#336791', type: 'outer' },
    { name: 'MySQL', image: mysqlImg, color: '#4479A1', type: 'outer' },
    { name: 'Firebase', image: firebaseImg, color: '#FFCA28', type: 'outer' },
    { name: 'VS Code', image: vscodeImg, color: '#007ACC', type: 'outer' },
    { name: 'Jira', image: jiraImg, color: '#0052CC', type: 'outer' },
    { name: 'PyCharm', image: pycharmImg, color: '#000000', type: 'outer' },
    { name: 'Figma', image: figmaImg, color: '#F24E1E', type: 'outer' },
    { name: 'MongoDB', image: mongodbImg, color: '#47A248', type: 'outer' },
    { name: 'Vercel', image: vercelImg, color: '#000000', type: 'outer' },
  ];

  const innerTechs = skillsData.filter(skill => skill.type === 'inner');
  const outerTechs = skillsData.filter(skill => skill.type === 'outer');

  const getCirclePosition = (index, total, radius, centerX, centerY) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, angle };
  };

  const content = (
    <StyledSkillsSection id="skills">
      <h2 className="numbered-heading">Compétences</h2>

      <div className="inner">
        <StyledContent>
          <p>Technologies et outils que je maîtrise à différents niveaux :</p>

          <StyledSkillsList>
            <li>
              <CheckIcon />
              <div>
                <strong>Frontend</strong> : React/JavaScript, HTML5, CSS3, Bootstrap, Gatsby.js, Responsive Design .
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <strong>Backend </strong> : PHP/Laravel, Python, REST APIs .
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <strong>BDD</strong> :SQL, MySQL, MongoDB, Firebase.
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <strong>Outils</strong> : VS Code, Vercel, Git, Github, Jira, PyCharm et Figma.
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <strong>Méthodologies de travail</strong> : Agile / Scrum.
              </div>
            </li>

          </StyledSkillsList>
        </StyledContent>

        <StyledTechDiagram>
          <div className="inner-circle">
            {innerTechs.map((tech, index) => {
              const { x, y } = getCirclePosition(
                index,
                innerTechs.length,
                innerRadius,
                centerX,
                centerY,
              );
              const itemSize = centerX <= 150 ? 30 : centerX <= 200 ? 35 : 40;
              return (
                <React.Fragment key={`inner-${index}`}>
                  <div
                    className="connection-line"
                    style={{
                      left: `${centerX}px`,
                      top: `${centerY}px`,
                      width: `${innerRadius - 25}px`,
                      transform: `rotate(${(index * 360) / innerTechs.length - 90}deg)`,
                    }}
                  />
                  <div
                    className="tech-item"
                    style={{
                      left: `${x - itemSize / 2}px`,
                      top: `${y - itemSize / 2}px`,
                    }}
                    title={tech.name}>
                    <img src={tech.image} alt={tech.name} />
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="outer-circle">
            {outerTechs.map((tech, index) => {
              const { x, y } = getCirclePosition(
                index,
                outerTechs.length,
                outerRadius,
                centerX,
                centerY,
              );
              const itemSize = centerX <= 150 ? 40 : centerX <= 200 ? 45 : 55;
              return (
                <React.Fragment key={`outer-${index}`}>
                  <div
                    className="connection-line"
                    style={{
                      left: `${centerX}px`,
                      top: `${centerY}px`,
                      width: `${outerRadius - 30}px`,
                      transform: `rotate(${(index * 360) / outerTechs.length - 90}deg)`,
                    }}
                  />
                  <div
                    className="tech-item"
                    style={{
                      left: `${x - itemSize / 2}px`,
                      top: `${y - itemSize / 2}px`,
                    }}
                    title={tech.name}>
                    <img src={tech.image} alt={tech.name} />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </StyledTechDiagram>
      </div>
    </StyledSkillsSection>
  );

  return prefersReducedMotion ? content : <ScrollReveal>{content}</ScrollReveal>;
};

export default Skills;
