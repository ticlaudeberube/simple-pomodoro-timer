
import PomodoroTimer from './components/pomodoro-timer';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <head>
        <title>Simple Pomodoro Timer</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <PomodoroTimer />
    </div>
  );
}