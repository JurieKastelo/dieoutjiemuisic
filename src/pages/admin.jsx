import React, { useState } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";

const handleUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function Admin() {
    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h4">Admin</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <TextField id="outlined-basic" label="Song Title" variant="outlined" />
                    <input type="file" onChange={handleUpload} />
                    <Button variant="contained" onClick={handleUpload}>Upload Song</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Admin;