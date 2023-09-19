import './index.css'

const Item = props => {
  const {item} = props
  return (
    <li className="item">
      <img src={item.image_url} alt={item.name} className="item-image" />
      <p>{item.name}</p>
    </li>
  )
}

export default Item
