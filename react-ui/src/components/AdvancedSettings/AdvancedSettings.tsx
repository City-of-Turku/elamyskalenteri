import AdditionalCategories from "./AdditionalCategories/AdditionalCategories"
import TextFields from "./TextFields/TextFields";
import Style from "./Style/Style";
import ListView from "./ListView/ListView";
import SearchCriteria from "./SearchCriteria/SearchCriteria";
import styles from "./AdvancedSettings.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdvancedSettings = () => {

    return (
        <div className={styles.title}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-id"
                >
                    <p>Näytä laajennetut hakuehdot</p>
                </AccordionSummary>
                <AccordionDetails>
                <AdditionalCategories />
                <TextFields />
                <Style />
                <ListView />
                <SearchCriteria />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default AdvancedSettings