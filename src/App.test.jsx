import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

test('renderiza título da galeria', () => {
  render(<BrowserRouter><App/></BrowserRouter>)
  expect(screen.getByText('🎬 Galeria de Filmes')).toBeInTheDocument()
})
