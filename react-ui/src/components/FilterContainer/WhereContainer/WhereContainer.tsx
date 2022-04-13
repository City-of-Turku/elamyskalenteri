import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterChip from "../FilterChip/FilterChip";
import LocationContainer from "../LocationContainer/LocationContainer";
import Accordion from "../../Accordion/Accordion";
import {useTranslation} from "react-i18next";

const WhereContainer = () => {

  const { t } = useTranslation()

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

  return (
    <div style={{ borderBottom: "1px solid lightgray"}}>
      <Accordion
        title={`${t("where")}?`}
        icon={LocationOnIcon}
      >
        <p style={{ margin: "0 4px 4px 4px"}}>
          <b>
            PAIKKAKUNTA
          </b>
        </p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 0 8px 0", gap: "8px"}}>
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
  )
}

export default WhereContainer