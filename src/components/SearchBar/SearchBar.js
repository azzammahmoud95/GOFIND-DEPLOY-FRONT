import React from 'react'
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import styles from '../../components/Header/Header.module.css'
export default function SearchBar( {placeHoder} ) {
  return (
    <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
            className={styles.searchBar}
            color="success"
            fullWidth
            size="small"
            style={{
              outlineOffset: "0px",
              outline: "none",
              borderRadius: "7px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
              backgroundColor:'white'
            }}
            placeholder={placeHoder}
          />
          <div
            style={{
              height: "100%",
              padding: "6.5px",
              backgroundColor: "#28a745",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <SearchIcon
              style={{
                backgroundColor: "#28a745",
                color: "whitesmoke",
                width: "100%",
              }}
            />
          </div>
        </div>
  )
}
