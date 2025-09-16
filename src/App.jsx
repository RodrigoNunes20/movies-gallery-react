import { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import data from './data/movies.json'
import MovieCard from './components/MovieCard'

function Home() {
  const [q, setQ] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [minRating, setMinRating] = useState(0)
  const [items, setItems] = useState([])

  useEffect(()=>{
    // Comentário humano: em um app real, viria de API. Mantemos estático para ser 100% plug-and-play.
    setItems(data)
  }, [])

  const genres = useMemo(()=> Array.from(new Set(data.flatMap(m=>m.genres))), [])
  const filtered = useMemo(()=> items.filter(m => {
    const matchQ = m.title.toLowerCase().includes(q.toLowerCase())
    const matchG = genre === 'Todos' || m.genres.includes(genre)
    const matchR = m.rating >= minRating
    return matchQ && matchG && matchR
  }), [items, q, genre, minRating])

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold"><Link to="/">🎬 Galeria de Filmes</Link></h1>
        <input
          aria-label="Buscar filmes pelo título"
          placeholder="Buscar…"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          className="border rounded-xl p-2 w-full sm:w-80"
        />
      </header>

      <section className="flex flex-wrap gap-2">
        <select value={genre} onChange={(e)=>setGenre(e.target.value)} className="border rounded-xl p-2">
          <option>Todos</option>
          {genres.map(g=><option key={g}>{g}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <span>Nota mínima</span>
          <input type="range" min="0" max="10" step="0.5" value={minRating}
            onChange={(e)=>setMinRating(Number(e.target.value))} />
          <span className="font-mono">{minRating}</span>
        </label>
      </section>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(m => <Link to={`/movie/${m.id}`} key={m.id}><MovieCard movie={m}/></Link>)}
      </section>
    </div>
  )
}

function MoviePage(){
  const { id } = useParams()
  const movie = data.find(m=>m.id===id)
  if(!movie) return <div className="p-4">Filme não encontrado.</div>
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <Link to="/" className="underline">← Voltar</Link>
      <img src={movie.poster} alt={`Poster de ${movie.title}`} className="w-full rounded-2xl" />
      <div>
        <h1 className="text-2xl font-semibold">{movie.title}</h1>
        <p className="opacity-80">{movie.year} • {movie.genres.join(', ')} • ⭐ {movie.rating}</p>
        <p className="text-sm opacity-70 mt-2">Este é um exemplo didático sem sinopse para manter o projeto simples.</p>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/movie/:id" element={<MoviePage/>} />
    </Routes>
  )
}
