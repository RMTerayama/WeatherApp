import styled from 'styled-components';

export const Content = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  
`;

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garante que o vídeo cubra toda a área */
  z-index: -1; /* Coloca o vídeo atrás do conteúdo */
`;

export const Search = styled.div`
  z-index: 1; /* Coloca o conteúdo acima do vídeo */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  width: 75vw;

  /* Responsividade para dispositivos móveis */
  @media (max-width: 768px) {
    width: 135vw; /* Ajusta o width para dispositivos móveis */
  }
`;

export const Result = styled.div`
  z-index: 1; /* Coloca o conteúdo acima do vídeo */
  color: white;
  background: #000000ad;  padding: 25px;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 12px;
  display:flex;
  align-items: center;
`;
export const ResultInfo =styled.div`
    margin-top: 0;
    margin-bottom: 0.3rem;
    border-bottom: 1px solid #adadad;
`


