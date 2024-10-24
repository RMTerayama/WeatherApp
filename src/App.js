import React, { useState } from 'react';
import axios from 'axios'; // Para realizar requisições HTTP
import { Content, Result, Search, VideoBackground, ResultInfo } from './styles';
import Button from './components/Button';
import Input from './components/Input';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importar componentes do Navbar

// Importando os vídeos diretamente
import solVideo from './components/img/sol.mp4';
import nubladoVideo from './components/img/nublado.mp4';
import chuvaVideo from './components/img/chuva.mp4';
import defaultVideo from './components/img/default.mp4';

function App() {
  const [city, setCity] = useState(''); // Estado para armazenar a cidade
  const [weatherData, setWeatherData] = useState(null); // Estado para armazenar os dados do clima
  const [error, setError] = useState(''); // Estado para gerenciar erros
  const [videoSource, setVideoSource] = useState(defaultVideo); // Estado para armazenar o vídeo de fundo
  const [loading, setLoading] = useState(false); // Estado para gerenciar o carregamento

  // Objeto com vídeos de fundo para diferentes tipos de clima
  const weatherVideos = {
    Clear: solVideo,     // Vídeo para clima limpo
    Clouds: nubladoVideo, // Vídeo para nublado
    Rain: chuvaVideo,    // Vídeo para chuvoso
    Default: defaultVideo, // Vídeo padrão
  };

  // Função para buscar dados do clima
  const fetchWeather = async () => {
    const apiKey = '22bc778cc92dc64dd956a97578bf0abf'; // Chave da API
    setLoading(true); // Inicia o carregamento
    try {
      console.log('Cidade pesquisada:', city); // Verificando a cidade
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data); // Definir os dados do clima
      setError('');

      // Verificar o tipo de clima retornado pela API
      const weatherCondition = response.data.weather[0].main; // Ex: Clear, Clouds, Rain
      console.log('Condição climática retornada:', weatherCondition); // Depuração

      // Atualizar o vídeo de fundo com base no clima retornado
      const newVideoSource = weatherVideos[weatherCondition] || weatherVideos['Default'];
      console.log('Novo vídeo a ser exibido:', newVideoSource); // Depuração
      setVideoSource(newVideoSource);

    } catch (err) {
      setWeatherData(null);
      setVideoSource(weatherVideos['Default']); // Reverter para o vídeo padrão em caso de erro
      console.error('Erro:', err); // Para ver mais detalhes do erro
      setError('Cidade não encontrada.');
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="App">
      {/* Navbar do Bootstrap */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">WeatherApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Content>
        {/* Vídeo de fundo */}
        <VideoBackground autoPlay muted loop playsInline key={videoSource}>
          <source src={videoSource} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeos.
        </VideoBackground>

        {loading && <div>Carregando...</div>} {/* Exibir carregador */}

        <Search>
          <Input 
            value={city}
            onChange={(e) => setCity(e.target.value)} // Atualizar o estado da cidade
            placeholder="Digite uma cidade"
          />
          <Button label="Pesquisar" onClick={fetchWeather} /> {/* Chamar a função ao clicar */}
        </Search>

        {error && (
          <p style={{ color: 'red', marginTop: '1vw', background: '#b5b5b5', padding: '1vw', borderRadius: '10px', fontWeight: 'bold' }}>
            {error}
          </p>
        )} {/* Exibir mensagem de erro */}
        
        {weatherData && (
          <Result>
            <div style={ {marginRight: '5vw'}}>
               <h2>{weatherData.name}</h2>
               <p>Temperatura: {weatherData.main.temp}°C</p>
            </div>
            <div>
              <ResultInfo>Sensação térmica: {weatherData.main.feels_like}°C</ResultInfo>
              <ResultInfo>Condição: {weatherData.weather[0].description}</ResultInfo>
              <ResultInfo>Umidade: {weatherData.main.humidity}%</ResultInfo>
              <ResultInfo>Pressão: {weatherData.main.pressure} hPa</ResultInfo>
              <ResultInfo>Velocidade do vento: {weatherData.wind.speed} m/s</ResultInfo>
              <ResultInfo>Visibilidade: {weatherData.visibility / 1000} km</ResultInfo>
              <ResultInfo>Nuvens: {weatherData.clouds.all}%</ResultInfo>
              <ResultInfo>Nascer do sol: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</ResultInfo>
              <ResultInfo>Pôr do sol: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</ResultInfo>
            </div>
          </Result>
        )}
      </Content>
    </div>
  );
}

export default App;
