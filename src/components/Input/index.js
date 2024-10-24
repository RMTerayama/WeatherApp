// ./input/index.js
import { InputContainer } from './styles';

const Input = ({ value, onChange }) => {
    return (
        <InputContainer>
            <input
                type="text" // Tipo de entrada definido
                value={value} // Valor do input controlado
                onChange={onChange} // Chamando a função ao mudar o valor
                placeholder='Pesquisar Cidade'
            />
        </InputContainer>
    );
}

export default Input;
