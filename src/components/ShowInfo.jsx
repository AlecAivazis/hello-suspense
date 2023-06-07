export default function ({ show }) {
  return (
    <aside
      className="billboard text-white w-full"
      style={{
        backgroundImage: `url(${show.billboard.source})`,
        height: 400,
      }}
    >
      <div className="h-full text-white pl-12 flex flex-col justify-center items-start">
        <h1 className="text-2xl mb-4 text">{show.name} </h1>
        <h2 className="text-l max-w-md text mb-4 text-start">
          {show.description}
        </h2>
      </div>
    </aside>
  );
}
