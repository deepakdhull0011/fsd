import './Card.css'

function Card({ title, description, image, price }) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {price && <p className="card-price">${price}</p>}
      </div>
    </div>
  )
}

export default Card
