import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Item from '../Item'
import FailureView from '../FailureView'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class Home extends Component {
  state = {
    isLoading: true,
    list: [],
    failureView: false,
    active: categoriesList[0].id,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const {active} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${active}`
    const response = await fetch(url)
    // console.log(response)
    const data = await response.json()
    // console.log(data.projects)
    if (response.ok) {
      this.setState({list: data.projects, isLoading: false})
    } else {
      this.setState({isLoading: false, failureView: true})
    }
  }

  categoryChanged = event => {
    // console.log(event.target.value)
    this.setState({active: event.target.value, isLoading: true}, this.getItems)
  }

  reload = () => {
    this.getItems()
  }

  render() {
    const {isLoading, list, failureView} = this.state
    return (
      <>
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </nav>
        <div className="main-container">
          <select className="select-bar" onChange={this.categoryChanged}>
            {categoriesList.map(each => (
              <option id={each.id} value={each.id} key={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
          <ul className="list-container">
            {isLoading ? (
              <div data-testid="loader" className="loader">
                <Loader
                  type="ThreeDots"
                  color="#0b69ff"
                  height={80}
                  width={80}
                />
              </div>
            ) : (
              <>
                {failureView ? (
                  <FailureView reload={this.reload} />
                ) : (
                  <>
                    {list.map(each => (
                      <Item item={each} key={each.id} />
                    ))}
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </>
    )
  }
}
export default Home
