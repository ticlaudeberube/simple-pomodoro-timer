import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import PomodoroTimer from './pomodoro-timer';
import Controls from './controls';

describe('PomodoroTimer', () => {
  beforeEach(() => {
      render(<PomodoroTimer/>);
  });
  test('renders timer display', () => {

    const timerDisplay = screen.getByTestId('timer-display');
    expect(timerDisplay).toBeInTheDocument();
  });

  test('renders controls', () => {
    const controls = screen.getByTestId('controls');
    expect(controls).toBeInTheDocument();
  });

   test('renders controls', () => {
    const startPauseButton = screen.getByText(/Start/i);
    const resetButton = screen.getByText(/Reset/i);
    expect(startPauseButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test('renders length settings', () => {
    const sessionLengthSetting = screen.getByText(/session length/i);
    const breakLengthSetting = screen.getByText(/break length/i);
    expect(sessionLengthSetting).toBeInTheDocument();
    expect(breakLengthSetting).toBeInTheDocument();
  });

  test('increases session length when clicked on increase button', () => {
    const increaseSessionButton = screen.getByTestId('increase-session');
    fireEvent.click(increaseSessionButton);
    const sessionLengthValue = screen.getByTestId('session-value');
    expect(sessionLengthValue).toHaveTextContent('25');
  });

  test('decreases session length when clicked on decrease button', () => {
    const decreaseSessionButton = screen.getByTestId('decrease-session');
    fireEvent.click(decreaseSessionButton);
   const sessionLengthValue = screen.getByTestId('session-value');
    expect(sessionLengthValue).toHaveTextContent('24');
  });

  // Add more tests as needed
});