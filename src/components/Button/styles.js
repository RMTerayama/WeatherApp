import styled from 'styled-components';

export const ButtonContainer = styled.button`
        border: 1px solid white;
        background-color: #424B5B;
        color:white;
        font-size: 15px;
        font-weight: 700;
        width:7%;
        height: 8vh;
        cursor:pointer;
        border-radius: 0 10px 10px 0 ;
        &:hover{
        opacity: 0.6;}

        /* Responsividade para dispositivos móveis */
        @media (max-width: 768px) {
            width: 20%; /* Ajusta o width para dispositivos móveis */
        }


        
    `


