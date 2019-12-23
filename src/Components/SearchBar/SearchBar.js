import React, { useState, useEffect, Fragment } from 'react'
import {
  Card,
  Input,
  Select,
  Divider,
  Button,
  DatePicker,
  Row,
  Col,
  Slider
} from 'antd'
import 'antd/dist/antd.css';
import './SearchBar.scss'

import { Collapse } from 'react-collapse'

const { Option } = Select
const { RangePicker } = DatePicker

export default function SearchBar(props) {
  const mock = {
    orgs: [
      {
        name: 'test1'
      },
      {
        name: 'ble'
      },
      {
        name: 'asdf'
      }
    ],
    cats: [
      {
        name: 'cat1'
      },
      {
        name: 'cat2'
      },
      {
        name: 'cat3'
      }
    ],
    countries: [
      {
        id: 1,
        name: 'Iceland'
      },
      {
        id: 2,
        name: 'USA'
      },
      {
        id: 3,
        name: 'Denmark'
      }
    ],
    cities: [
      {
        id: 1,
        countryId: 1,
        name: 'hfj'
      },
      {
        id: 2,
        countryId: 1,
        name: 'kóp'
      },
      {
        id: 3,
        countryId: 2,
        name: 'boston'
      },
      {
        id: 4,
        countryId: 2,
        name:'new york'
      },
      {
        id: 5,
        countryId: 3,
        name: 'Aruhus'
      }
    ]
    // countries: [
    //   {
    //     id: 1,
    //     name: 'iceland',
    //     cities: [
    //       {
    //         id: 1,
    //         countryId: 1,
    //         name: 'reyk'
    //       },
    //       {
    //         id: 2,
    //         countryId: 1,
    //         name: 'hfj'
    //       }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     name: 'USA',
    //     cities: [
    //       {
    //         id: 3,
    //         countryId: 2,
    //         name: 'New york'
    //       },
    //       {
    //         id: 4,
    //         countryId: 2,
    //         name: 'Boston'
    //       }
    //     ]
    //   },
    //    {
    //      id: 3,
    //      name: 'Denmark',
    //      cities: [
    //        {
    //          id: 5,
    //          countryId: 3,
    //          name: 'Arhus'
    //        }
    //      ]         
    //    }
    // ]
  }


  const [seeMore, setSeeMore] = useState(false)

  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedCities, setSelectedCities] = useState([])
  const [availableCities, setAvailableCities] = useState([])
  const [selectedOrganizations, setSelectedOrganizations] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedSpeakers, setSelectedSpeakers] = useState([])
  const [selectedPrice, setSelectedPrice] = useState([])
  const [selectedCeCredits, setSelectedCeCredits] = useState([])




  useEffect(() => {
    // const myCities = []
    // mock.countries.map(country => {
    //   country.cities.map(city => {
    //     myCities.push(city)
    //   })
    // })
    setAvailableCities(mock.cities)
  }, [])

  function handleSeeMore() {
    setSeeMore(prev => !prev)
  }

  function handleCountryChange(value) {//ATH value is a list of counties
    //Clear cities that are not in specified country
    if (selectedCities.length > 0 && value.length !== 0) {
      const newCities = selectedCities.filter(city => {
        const cityId = parseInt(city.key)
        const myCity = mock.cities.find(c => c.id === cityId)
        console.log(myCity)
        

        let b = value.some(country => {
          const countryId = parseInt(country.key)
          return countryId === myCity.countryId
        })
        return b 
        // let b = false
        // value.map(country => {
        //   const countryId = parseInt(country.key)
        //   const myCountry = mock.countries.find(c => c.id === countryId)
        //   myCountry.cities.map(c => {
        //     if (c.id === cityId) {
        //       b = true
        //     }
        //   })
        // })
        // return b
      })

      console.log(newCities)
      setSelectedCities(newCities)
    }

    setSelectedCountries(value)
    if (value.length > 0) { 
      let myCities = []
      value.map(val => {
        const id = parseInt(val.key, 10)
        const citiesInCountry = mock.cities.filter(c => c.countryId === id)
        myCities = myCities.concat(citiesInCountry)
      })
      setAvailableCities(myCities)
    } else {
      setAvailableCities(mock.cities)
    }
  }


  function handleCityChange(value) {
    setSelectedCities(value)
  }

  function handleDateChange(date, dateString) {
    console.log(date, dateString)
  }

  function handleOrganizationsChange(value) {
    setSelectedOrganizations(value)
  }

  function handleTagsChange(value) {
    setSelectedTags(value)
  }

  function handleSpeakersChange(value) {
    setSelectedSpeakers(value)
  }

  function handlePriceChange(price) {
    setSelectedPrice(price)
  }

  function handleCeCreditsChange(credits) {
    setSelectedCeCredits(credits)
  }

  function priceDisplayFormatter(value) {
    return `${value} $`
  }

  return (
    <div className='searchBar'>
      <Card className='searchBar__card' hoverable >
        <div className='searchBar__card__input'>
          <Input.Search
            size='large'
            enterButton={<Button icon='search'>Search</Button>}
          />
        </div>
        <div className='searchBar__card__mainFilters'>
          <Row gutter={16}>
            <Col span={5}>
              <div className='searchBar__card__mainFilters__filter'>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Category'
                  showSearch
                >
                  {mock.orgs.map(org => (
                    <Option value={org.name}>{org.name}</Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col span={5}>
              <div className='searchBar__card__mainFilters__filter'>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Country'
                  mode='tags'
                  value={selectedCountries}
                  onChange={handleCountryChange}
                  labelInValue
                >
                  {mock.countries.map(country => (
                    <Option value={`${country.id}`}>{country.name}</Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col span={5}>
              <div className='searchBar__card__mainFilters__filter'>
                <Select
                  style={{ width: '100%' }}
                  placeholder='City'
                  mode='tags'
                  labelInValue
                  value={selectedCities}
                  onChange={handleCityChange}
                >
                  {availableCities.map(city => (
                    <Option value={`${city.id}`}>{city.name}</Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col span={9}>
              <div className='searchBar__card__mainFilters__filter'>
                <RangePicker
                  style={{ width: '100%' }}
                  onChange={handleDateChange} />
              </div>
            </Col>
          </Row>
        </div>
        <Divider style={{ marginTop: 20, marginBottom: 0 }}>
          <Button type='link' onClick={handleSeeMore} >{!seeMore ? ('See more') : ('See less')}</Button>
        </Divider>
          <Collapse isOpened={seeMore}>
        <div style={{paddingTop: 20}}>
            <Row gutter={16} style={{ marginTop: 0 }}>
              <Col span={8}>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Organization'
                  mode='tags'
                  labelInValue
                  value={selectedOrganizations}
                  onChange={handleOrganizationsChange}
                >
                  {mock.orgs.map(org => (
                    <Option value={`${org.id}`}>{org.name}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={8} >
                <Select
                  style={{ width: '100%' }}
                  placeholder='Tags'
                  mode='tags'
                  labelInValue
                  value={selectedTags}
                  onChange={handleTagsChange}
                />
              </Col>
              <Col span={8}>
                <Select
                  style={{ width: '100%' }}
                  placeholder='Speakers'
                  mode='tags'
                  labelInValue
                  value={selectedSpeakers}
                  onChange={handleSpeakersChange}
                />
              </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: 20 }}>
              <Col span={12}>
                <h4 style={{ marginBottom: 0 }}>Price:</h4>
                <Slider
                  range
                  defaultValue={[0, 400]}
                  max={3000}
                  tipFormatter={priceDisplayFormatter}
                  onChange={handlePriceChange}
                />
              </Col>
              <Col span={12}>
                <h4 style={{ marginBottom: 0 }}>CE Credits:</h4>
                <Slider
                  range
                  defaultValue={[0, 3]}
                  max={10}
                  onChange={handleCeCreditsChange}
                />
              </Col>
            </Row>
        </div>
          </Collapse>

      </Card>

    </div>

  )
}

