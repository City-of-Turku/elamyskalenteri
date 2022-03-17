import { Checkbox, Chip, FormControlLabel, FormGroup, Icon } from "@mui/material"
import { useEffect, useState } from "react";
import styles from "./FilterContainer.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/rtkHooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import filterSlice from "../../redux/slices/filterSlice";
import Accordion from "../Accordion/Accordion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Calendar from "../Calendar/Calendar"
import { getCoords } from "../../functions/boundingBox";
import LocationContainer from "./LocationContainer/LocationContainer";

interface Category {
  fi: string,
  yso: string
}

const FilterContainer = () => {

  // These should be ideally fetched from an API...
  const categories = [
    {fi: "Musiikki", yso: "yso:p1808"},
    {fi: "Urheilu", yso: "yso:p965"},
    {fi: "Näyttelyt", yso: "yso:p5121"},
    {fi: "Festivaalit", yso: "yso:p1304"},
    {fi: "Teatteri", yso: "yso:p2625"},
    {fi: "Tanssi", yso: "yso:p1278"},
    {fi: "Keskustelutilaisuudet", yso: "tsl:p40"},
    {fi: "Konsertit", yso: "tsl:p43"},
    {fi: "Historia", yso: "tsl:p43"}
  ]

  const places = [
    {fi: "Kaikki"},
    {fi: "Turku"},
    {fi: "Raisio"},
    {fi: "Naantali"},
    {fi: "Kaarina"},
    {fi: "Lieto"},
    {fi: "Aura"},
    {fi: "Rusko"}
  ]

  const dispatch = useAppDispatch()
  const { filters } = useAppSelector(state => state)
  const { setName, setEventTypes, setFeatures, setBbox } = bindActionCreators(filterSlice.actions, dispatch)

  const [searchTerm, setSearchTerm] = useState("")
  //const [features, setFeatures] = useState<string[]>([])

  useEffect(() => {
    // Updates redux store after user has stopped typing (limits API calls..)
    const sendSearchTerm = () => {
      // Update search terms only when query is longer than 2 chars
      if (searchTerm.length > 2) {
        setName(searchTerm)
        return
      }
      // If the query is smaller than 3 chars, just make it blank.
      if (searchTerm.length <= 2) {
        setName("")
      }
    }
    // Controls timeout, after which user's query will be sent to the server
    const timer = setTimeout(() => {
      sendSearchTerm()
    }, 1000)

    // cleans the timeout after component unmounts
    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  // Adds even type to the redux store
  const addFilter = (f: Category) => {
    dispatch(setEventTypes(filters.eventTypes.concat(f.yso)))
  }

  // Filters event type from the redux store
  const removeFilter = (f: Category) => {
    dispatch(setEventTypes(filters.eventTypes.filter(e => e !== f.yso)))
  }

  const handleFeatureChange = (e: any) => {
    if (e.target.checked) {
      dispatch(setFeatures(filters.eventFeatures.concat(e.target.value)))
      return;
    }
    dispatch(setFeatures(filters.eventFeatures.filter(feature => feature !== e.target.value)))
  }


  return (
    <div className={styles.container}>
      <h2 style={{ fontWeight: 300, marginBottom: "16px"}}>Löydä parhaimmat jutut</h2>
      <div style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
        <div style={{ border: "1px solid lightgrey", borderRadius: "16px", padding: "24px 16px"}}>
          <TitleRow/>
          <Calendar/>
        </div>
          <div>
            <div className={styles.searchContainer}>
              <div style={{ borderBottom: "1px solid lightgray"}}>
                <Accordion title={"Mitä?"} icon={LocalActivityIcon}>
                  <p style={{ margin: "0 4px 4px 4px"}}><b>KATEGORIA</b></p>
                  <div className={styles.chipContainer}>
                    {categories.map(category => (
                      <FilterChip
                        label={category.fi}
                        active={filters.eventTypes.includes(category.yso)}
                        handleClick={() => addFilter(category)}
                        handleDelete={() => removeFilter(category)}
                      />
                    ))}
                  </div>
                  <div style={{ margin: "32px 0 0 0"}}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
                      <p style={{ width: "100px"}}>Kenelle:</p>
                      <FormGroup row >
                        <FormControlLabel
                          control={<Checkbox/>}
                          label={"lapsiperheet"}
                          labelPlacement={"end"}
                          style={{ width: "140px"}}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label={"nuoret"}
                          labelPlacement={"end"}
                          style={{ width: "140px"}}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label={"seniorit"}
                          labelPlacement={"end"}
                          style={{ width: "140px"}}
                        />
                      </FormGroup>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
                      <p style={{ width: "100px"}}>Ominaisuus:</p>
                      <FormGroup row>
                        <FormControlLabel
                          control={<Checkbox/>}
                          label={"ilmainen"}
                          labelPlacement={"end"}
                          style={{ width: "140px"}}
                          value={"is_free=true"}
                          onChange={(e: any) => handleFeatureChange(e)}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label={"virtuaalinen"}
                          labelPlacement={"end"}
                          style={{ width: "140px"}}
                          value={"internet_based=true"}
                          onChange={(e: any) => handleFeatureChange(e)}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label={"esteetön"}
                          labelPlacement={"end"}
                          style={{ width: "140px"}}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label={"ulkoilma"}
                          labelPlacement={"end"}
                          style={{ width: "140px"}}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </Accordion>
              </div>
              <div style={{ borderBottom: "1px solid lightgray"}}>
                <Accordion
                  title={"Missä?"}
                  icon={LocationOnIcon}
                >
                  <p style={{ margin: "0 4px 4px 4px"}}>
                    <b>
                      PAIKKAKUNTA
                    </b>
                  </p>
                  <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {places.map(place => (
                      <FilterChip
                        label={place.fi}
                        active={false}
                      />
                    ))}
                  </div>
                  <LocationContainer />
                </Accordion>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.search}
                  type="text"
                  placeholder={"Hae (nimi, paikka, aihe)"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Icon
                  component={SearchIcon}
                  style={{fontSize: 32}}
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  )

}

export default FilterContainer

const TitleRow = () => {
  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <h3 style={{ margin: "0 0 0 24px"}}>Milloin?</h3>
      <Icon
        component={EventAvailableIcon}
        style={{ fontSize: 32}}
      />
    </div>
  )
}

const FilterChip = ({label, active, handleClick, handleDelete}: any) => {

  // Displays outlined chip for inactive filter and a deletable for active filter
  // Had to be done like this because onClick and onDelete control the visuals of the chip

  return (
    <>
    {active
      ?
      <Chip
        label={label}
        variant={active ? "filled" : "outlined"}
        sx={{ margin: "4px 4px", backgroundColor: "#C2CEDB" }}
        onDelete={() => handleDelete()}

      />
      :
      <Chip
        label={label}
        variant={active ? "filled" : "outlined"}
        sx={{ margin: "4px 4px"}}
        onClick={() => handleClick()}
      />
    }
    </>
  )
}