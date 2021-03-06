import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);

    // const allButton = screen.getByRole('button', { name: /All/i });
    // userEvent.click(allButton);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const pokemonTitle = screen.getByText('Pikachu Details');
    const summaryTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const summarySection = screen.getByText(/This intelligent Pokémon/i);

    expect(pokemonTitle).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summarySection).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    const mapsTitle = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    const mapsImg = screen.getAllByAltText('Pikachu location');
    const mapsLocation = screen.getByText('Kanto Viridian Forest');

    expect(mapsTitle).toBeInTheDocument();
    expect(mapsImg[0]).toBeInTheDocument();
    expect(mapsImg[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsLocation).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });

    expect(checkFavorite).toBeInTheDocument();
  });
});
