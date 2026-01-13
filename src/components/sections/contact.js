/**
 * Section Contact : Formulaire ou lien de contact.
 * Invite les utilisateurs à entrer en contact par e-mail ou via les réseaux sociaux.
 */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import Constellation from '../constellation';

const StyledConstellationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.7; /* Increased opacity for better visibility */
  pointer-events: none;
`;
const StyledContactSection = styled.section`
  max-width: 1000px;
  scroll-margin-top: 120px;
  @media (max-width: 768px) {
    scroll-margin-top: 70px;
  }
  margin: 0 auto;
  position: relative;
  overflow: hidden; /* To keep the animation within bounds */

  @media (max-width: 768px) {
    margin: 0 auto;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    margin-bottom: 30px;
  }
`;

const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const StyledTextWrapper = styled.div`
  flex: 1;
  text-align: left;

  .description {
    margin-bottom: 30px;
    color: var(--slate);
  }
`;

const StyledContactForm = styled.form`
  flex: 1.2;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;

    &.full-width {
      grid-column: 1 / -1;
    }

    label {
      color: #e07a5f;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      font-weight: 600;
      margin-bottom: 8px;
    }

    input,
    textarea {
      background-color: var(--light-navy);
      border: 1px solid #888888; /* Even darker border */
      border-radius: var(--border-radius);
      padding: 12px 15px;
      color: #000000;
      font-family: var(--font-sans);
      font-size: var(--fz-md);
      transition: var(--transition);

      &:focus {
        outline: none;
        border-color: var(--green);
        background-color: var(--navy);
      }

      &::placeholder {
        color: var(--white);
        opacity: 0.5;

        .light-mode & {
          color: #000000;
          opacity: 0.7;
        }
      }
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }
  }

  .submit-button {
    ${({ theme }) => theme.mixins.bigButton};
    grid-column: 1 / -1;
    margin-top: 20px;
    width: max-content;
    justify-self: center;
    cursor: pointer;
    background: linear-gradient(135deg, var(--green) 0%, #8b3e2f 100%);
    color: var(--white) !important;
    border: none;
    padding: 0.9rem 1.8rem;
    font-size: var(--fz-md);
    font-weight: 600;
    letter-spacing: 1px;
    box-shadow: 0 10px 20px -10px rgba(177, 93, 68, 0.4);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

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

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [status, setStatus] = React.useState('');

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    setStatus('Envoi en cours...');

    try {
      const response = await fetch(`https://formspree.io/f/xbddrgpq`, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('Merci ! Votre message a été envoyé avec succès.');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('Oups ! Une erreur est survenue lors de l\'envoi.');
      }
    } catch (error) {
      setStatus('Oups ! Une erreur est survenue lors de l\'envoi.');
    }
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <StyledConstellationContainer>
        <Constellation />
      </StyledConstellationContainer>

      <StyledFlexWrapper>
        <StyledTextWrapper>
          <h2 className="numbered-heading overline">Et ensuite ?</h2>

          <h2 className="title">Me contacter</h2>

          <p className="description">
            Je suis actuellement à la recherche de nouvelles opportunités. Si vous avez une question
            ou si vous souhaitez simplement discuter d'un projet, n'hésitez pas !
          </p>

          {status && (
            <p
              style={{
                color:
                  status.includes('succès') || status.includes('cours')
                    ? 'var(--green)'
                    : '#d00000',
                backgroundColor: 'var(--green-tint)',
                border: `1px solid ${
                  status.includes('succès') || status.includes('cours') ? 'var(--green)' : '#d00000'
                }`,
                padding: '12px 20px',
                borderRadius: 'var(--border-radius)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fz-xs)',
                fontWeight: '500',
                marginTop: '30px',
                textAlign: 'center',
                display: 'inline-block',
                animation: 'fadeIn 0.3s ease-forward',
              }}>
              {status}
            </p>
          )}
        </StyledTextWrapper>

        <StyledContactForm onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">Prénom</label>
            <input
              type="text"
              id="first-name"
              name="firstname"
              placeholder="Votre prénom"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Nom</label>
            <input type="text" id="last-name" name="lastname" placeholder="Votre nom" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" placeholder="votre@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <input type="tel" id="phone" name="phone" placeholder="06 00 00 00 00" />
          </div>
          <div className="form-group full-width">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Votre message ici..."
              required></textarea>
          </div>
          <button type="submit" className="submit-button">
            Envoyer le message
          </button>
        </StyledContactForm>
      </StyledFlexWrapper>
    </StyledContactSection>
  );
};

export default Contact;
