import Card from './Card'
import './Home.css'

function Home() {
  const cards = [
    {
      id: 1,
      title: 'Product 1',
      description: 'This is a great product with amazing features',
      image: 'https://via.placeholder.com/200',
      price: 29.99,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'High quality item for your needs',
      image: 'https://via.placeholder.com/200',
      price: 39.99,
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Excellent choice for your collection',
      image: 'https://via.placeholder.com/200',
      price: 49.99,
    },
  ]

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to MyApp</h1>
        <p>Discover amazing products and services</p>
      </div>
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            price={card.price}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
