import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CreatableSelect from 'react-select/creatable';

import './App.css';

function App() {
  const [name, setName] = useState([])
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState([])
  const [about, setAbout] = useState('')
  const [info, setInfo] = useState('')
  const [varInterests, setVarInterests] = useState([])
  const [varNames, setVarNames] = useState([])

  async function fetchInterests(url) {
    const list = await fetch(url)
      .then((r) => r.text())
      .then(text => {
        let str = text.split("\n")
        str = str.map((el) => { return { value: el, label: el } })
        str.pop()
        setVarInterests(str)
      })
  }

  async function fetchNames(url) {
    const list = await fetch(url)
      .then((r) => r.text())
      .then(text => {
        let str = text.split("\n")
        str = str.map((el) => { return { value: el.slice(0, -1), label: el.slice(0, -1) } })
        str.pop()
        setVarNames(str) // {value: "Aaren", label: "Aaren"}
      })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await fetch('/todb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ info, about, email, interests, name })
      });
      let result = await response.json();
      //localStorage.setItem('tokyo', JSON.stringify({ name: '', email: '', interests: [], about: '', info: '' }))
      // setName('')
      // setEmail('')
      // setInterests([])
      // setAbout('')
      // setInfo('')
    } catch (e) { console.log(e) }
  }

  useEffect(() => {
    if (localStorage.getItem('tokyo')) {
      let formData = JSON.parse(localStorage.getItem('tokyo'))
      setName(formData.name)
      setEmail(formData.email)
      setInterests(formData.interests)
      setAbout(formData.about)
      setInfo(formData.info)
    }
    else {
      localStorage.setItem('tokyo', JSON.stringify({ name: [], email: '', interests: [], about: '', info: '' }))
    }
    fetchInterests('https://gist.githubusercontent.com/stefanoverna/371f009900bbe9ceec208f5dd1688737/raw/db7a90fa9e5dcb4ec22f4aef2774348fff7ccf69/gistfile1.txt')
    fetchNames("https://raw.githubusercontent.com/dominictarr/random-name/master/first-names.txt")
  }, [])

  useEffect(() => {
    localStorage.setItem('tokyo', JSON.stringify({ name, email, interests, about, info }))
  }, [name, email, interests, about, info])

  return  (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Container maxWidth="sm" style={{ margin: "5px" }} fixed >
        <Paper elevation={3} style={{ backgroundColor: '#F4F7F8', margin: "20px" }} >
          <form onSubmit={(e) => handleSubmit(e)} action="/todb" method="POST">

            <Box display="flex" flexWrap="wrap" alignItems="flex-start" px={2} pt={2} >
              <div id="circle">1 </div><h4>Candidate Info</h4>
            </Box>

             <Box px={2} pb={2} >
              <CreatableSelect 
                value={name}
                name="name"
                options={varNames}
                onInputChange={e => setName(e)}
                placeholder='Your Name *'
                onChange={e => setName(e)}
                className="basic-multi-select"
                classNamePrefix="select"
                required
              /></Box>

            <Box px={2} pb={2} >
              <input
                className="input-in"
                placeholder="Your Email *"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              /></Box>

            <Box px={2} pb={2}  >
              <input
                className="input-in"
                placeholder="About Yourself"
                id="about"
                type="textarea"
                value={about}
                pattern="[a-zA-z\-\s\d]*"
                onChange={e => setAbout(e.target.value)}
              />
            </Box>

            <Box px={2} >
              <p>Interests:</p>
              <Select
                value={interests}
                isMulti
                placeholder='Select interests'
                name="interests"
                options={varInterests}
                onChange={e => setInterests(e)}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Box>

            <Box display="flex" flexWrap="wrap" alignItems="flex-start" px={2} pt={2} >
              <div id="circle">2 </div><h4>Additional Info</h4>
            </Box>

            <Box px={2} pb={2}>
              <input
                className="input-in"
                placeholder="About Your School"
                id="info"
                type="textarea"
                value={info}
                onChange={e => setInfo(e.target.value)}
              />

            </Box >
            <Box px={2} pb={2} >

              <Button style={{ backgroundColor: '#00BC9E' }} size="large" type="submit" fullWidth variant="contained" color="secondary">
                Apply
              </Button>

            </Box>
          </form>

        </ Paper>
      </Container>
    </Grid>
  )
}

export default App;
