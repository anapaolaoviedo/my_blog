import { Link } from 'react-router';

export function CardList({ entries, filteredText }) {
  const cards = entries.map((entry) =>
    entry.title.includes(filteredText) && <Card
      key={entry.id_post}
      id_post={entry.id_post}
      title={entry.title}
      date={entry.date}
      img={entry.image}
    />
  );
  return <div className="card-list">{cards}</div>;
}

export function Card({ title, date, img, id_post }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="card">
      <Link to={"/blog/" + id_post}>
        {img && <img src={img} alt={title} />}
        <h1>{title}</h1>
        <p>{formattedDate}</p>
      </Link>
    </div>
  );
}