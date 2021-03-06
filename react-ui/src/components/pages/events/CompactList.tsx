import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SetStateAction, useEffect, useState } from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/rtkHooks";
import { useEventsQuery } from "../../../redux/services/eventApi";
import EventCard from "./EventCard";
import List from "./List";
import { useHistory } from "react-router-dom";
import { parseQuery } from "../../../functions/urlParser";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../../redux/slices/filterSlice";
import dayjs from "dayjs";

const CompactList = ({ dataAttributes }: any) => {

  const history = useHistory()
  const queryString = require('query-string')
  const dispatch = useAppDispatch()

  const { filters } = useAppSelector((state) => state);
  const { setSearch, setEventTypes, setFeatures, setStartTime, setEndTime, setAudience } = bindActionCreators(filterSlice.actions, dispatch)
  const [view, setView] = useState(true);
  const [color, setColor] = useState("primary.dark")
  const handleColor = (e: any, value: SetStateAction<string>) => setColor(value);

  const [firstLoadDone, setFirstLoadDone] = useState(false)

  useEffect(() => {
    // If data-attributes are used, set redux state from them
    if (dataAttributes.type === "compact") {
      setSearch(dataAttributes.search)
      setEventTypes(dataAttributes.keywords || [])
      setFeatures(dataAttributes.features || [])
      setAudience([dataAttributes.audiences] || [])
    }
    else {
      if (!firstLoadDone) {
        const query = (queryString.parse(window.location.hash.replaceAll("?", "")))

        if (Object.keys(query).includes("text")) {
          setSearch(query.text)
        }
        if (Object.keys(query).includes("keywords")) {
          let keywordArray = query.keywords.split(',')
          setEventTypes(keywordArray)
        }
        if (Object.keys(query).includes("features")) {
          let featureArray = query.features.split(",")
          setFeatures(featureArray)
        }

        if (Object.keys(query).includes("start_time")) {
          setStartTime(query.start_time)
        }

        if (Object.keys(query).includes("end_time")) {
          setEndTime(query.end_time)
        }

        if (Object.keys(query).includes("audiences")) {
          let audienceArray = query.audiences.split(',')
          // @ts-ignore
          setAudience(audienceArray)
        }
        setFirstLoadDone(true)
      }
    }
  }, [window.location.hash])

  useEffect(() => {
    if (!firstLoadDone) return
    history.push(parseQuery(filters))
  }, [filters])


  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useEventsQuery({
    page: page,
    searchTerm: filters.search || "",
    keyword: filters.eventTypes,
    features: Array.isArray(filters.eventFeatures) ? filters.eventFeatures.join("&") : "",
    bbox: filters.bbox.north ? Object.values(filters.bbox).join(",") : "",
    start_time: filters.startTime ? dayjs(filters.startTime).format("YYYY-MM-DD") : "",
    end_time: filters.endTime ? dayjs(filters.endTime).format("YYYY-MM-DD") : "",
    audiences: filters.audiences
  });

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.eventTypes]);

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Grid
          sx={{ flexGrow: 1, alignItems: "strech", justifyContent: "center"}}
          container
          
        >
          {!isLoading &&
            !isFetching &&
            !error &&
            data.data?.slice(0,4).map((event: any) => {
              return (
                <div style={{backgroundColor: '#f0f0f0'}}>
                  <div>
                    {view ? (
                      <Grid key={event.id} item>
                        <EventCard {...event} />
                      </Grid>
                    ) : (
                      <Grid key={event.id} item>
                        <List {...event} />
                      </Grid>
                    )}
                  </div>
                  <Box p={1}></Box>
                </div>
              );
            })}
          {error && <h2>Something went wrong</h2>}
        </Grid>
      </Box>
    </div>
  );
};

export default CompactList;
