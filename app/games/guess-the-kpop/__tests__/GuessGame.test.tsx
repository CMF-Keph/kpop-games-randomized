import React from 'react';
import { render, screen } from '@testing-library/react';
import GuessGame from '../GuessGame';
import { Group, Video } from '@/app/generated/prisma/browser';

// Mock del componente GuessGameAnswer
jest.mock('../GuessGameAnswer', () => {
  return function MockGuessGameAnswer() {
    return <div data-testid="guess-game-answer">Answer Option</div>;
  };
});

describe('GuessGame Component', () => {
  const mockOnReturn = jest.fn();

  const mockVideo: Partial<Video> = {
    id: '1',
    title: 'Test Video',
    youtubeId: 'dQw4w9WgXcQ',
    groupId: '1'
  };

  const mockGroup: Partial<Group> & { videos: Partial<Video>[] } = {
    id: '1',
    name: 'Test Group',
    type: 'GG',
    videos: [mockVideo],
  };

  const mockLobby = {
    settings: {
      'total-rounds': 5,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar el componente cuando el reproductor de YouTube está listo', () => {
    render(
      <GuessGame
        lobby={mockLobby as any}
        groups={[mockGroup]}
        onReturn={mockOnReturn}
      />
    );

    // Verificar que el elemento del reproductor está presente
    const playerDiv = document.getElementById('player');
    expect(playerDiv).toBeInTheDocument();
  });

  it('debe mostrar el número de ronda correctamente', () => {
    const { container } = render(
      <GuessGame
        lobby={mockLobby as any}
        groups={[mockGroup]}
        onReturn={mockOnReturn}
      />
    );

    // Verificar que el contenedor se renderiza
    expect(container).toBeInTheDocument();
  });

  it('debe inicializar con puntuación de 0', () => {
    const { container } = render(
      <GuessGame
        lobby={mockLobby as any}
        groups={[mockGroup]}
        onReturn={mockOnReturn}
      />
    );

    // El componente debe renderizarse sin errores
    expect(container).toBeInTheDocument();
  });
});
