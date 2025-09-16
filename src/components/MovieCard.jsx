export default function MovieCard({ movie }) {
  return (
    <article className="rounded-2xl shadow-sm bg-white overflow-hidden">
      <img src={movie.poster} alt={`Poster de ${movie.title}`} className="w-full h-64 object-cover" loading="lazy" />
      <div className="p-4">
        <h3 className="font-semibold">{movie.title}</h3>
        <p className="text-sm opacity-70">{movie.year} • {movie.genres.join(', ')}</p>
        <p className="text-sm mt-1">⭐ {movie.rating}</p>
      </div>
    </article>
  )
}
