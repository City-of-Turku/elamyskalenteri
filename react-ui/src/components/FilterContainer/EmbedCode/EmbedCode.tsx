import {useAppSelector} from "../../../hooks/rtkHooks";
import Button from "@mui/material/Button";
import {useState} from "react";
import styles from "./EmbedCode.module.css"

const EmbedCode = () => {

  const [open, setOpen] = useState(false)

  const { filters } = useAppSelector(state => state)

  const copyToClipBoard = () => {
    // Find the code block
    const code = document.getElementById("code")

    // Copy code to clipboard
    navigator.clipboard.writeText(code!.innerText)

    // Find the copy button
    const btn = document.getElementById("copyBtn")

    // Safety check..
    if (btn) {

      // Set text and set it back to original after 1.5s
      btn.innerText = "Kopioitu!"
      setTimeout(() => {
        btn.innerText = "Kopioi leikepöydälle"
      }, 1500)
    }
  }

  return (
    <div className={styles.container}>
      <Button className={styles.btn} variant={"outlined"} onClick={() => setOpen(!open)}>{"< >"}</Button>
      {open && <div className={styles.innerContainer}>
      <div id={"code"}>
        <p>{'<div'}</p>
        <div style={{ marginLeft: "16px"}}>
          <p>{'class="event-calendar-embed"'}</p>
          <p>{'data-type="compact"'}</p>
          {filters.search &&
            <p>{`data-search="${filters.search}"`}</p>
          }
          {!!filters.eventTypes.length &&
            <p>{`data-keywords="${filters.eventTypes.join()}"`}</p>
          }
          {!!filters.audiences.length &&
            <p>{`data-audiences="${filters.audiences.join()}"`}</p>}
          {filters.startTime && filters.endTime &&
            <>
              <p>{`data-start-time="${filters.startTime}"`}</p>
              <p>{`data-end-time="${filters.endTime}"`}</p>
            </>
          }
          {filters.eventFeatures && <p>{`data-features="${filters.eventFeatures}"`}</p>}
        </div>
        <p>{'></div>'}</p>
      </div>
      <Button
        variant={"contained"}
        id={"copyBtn"}
        onClick={() => copyToClipBoard()}
      >
        Kopioi leikepöydälle
      </Button>
    </div>}
    </div>
  )
}

export default EmbedCode



