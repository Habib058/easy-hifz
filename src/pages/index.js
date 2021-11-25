import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'theme-ui';
import {
  Box,
  Flex,
  Container,
  Image,
  Heading,
  Grid,
} from 'theme-ui';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import NightsStayOutlinedIcon from '@material-ui/icons/NightsStayOutlined';
import Brightness3OutlinedIcon from '@material-ui/icons/Brightness3Outlined';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';

import theme from '../theme';
import styles from '../theme/theme-ui-css';
import metarialStyle from '../theme/metarial-ui-css';
import SEO from '../components/seo';

import data from '../assets/surahs.json';
import data_new from '../assets/surahs-new.json';
// import ayahData from '../assets/ayah.json';

var qaris = [
  "",
  "Abdul Basit 'Abd us-Samad",
  "Abdul-Rahman Al-Sudais",
  "Saud Al-Shuraim",
  "Mishary bin Rashid Alafasy",
  "Ali ibn Abdur-Rahman al Hudhaify",
  "Abdullah Awad Al Juhany",
  "Abu Bakr al-Shatri",
  "Yasir Al Dossary"
]

var qariList = [
  "",
  "Abdul_Basit_Mujawwad_128kbps",
  "Abdurrahmaan_As-Sudais_192kbps",
  "Saood_ash-Shuraym_128kbps",
  "Alafasy_128kbps",
  "Hudhaify_128kbps",
  "Abdullaah_3awwaad_Al-Juhaynee_128kbps",
  "Abu_Bakr_Ash-Shaatree_128kbps",
  "Yasser_Ad-Dussary_128kbps"
];

export default function IndexPage() {
  let commonURL = "https://www.everyayah.com/data/";
  const surahs = data;
  const surahs_new = data_new;
  // const ayahs = ayahData;
  const array = Array.from({ length: 300 }, (_, i) => i + 1)
  const classes = metarialStyle();
  const [windowHeight, setWindowHeight] = useState('auto');
  const [isPlay, setIsPlay] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setSliderValue] = useState(1);

  const [surahID, setSurah] = React.useState('1');
  const [from, setFrom] = React.useState('1');
  const [to, setTo] = React.useState('7');
  const [repeat, setRepeat] = React.useState(1);
  const audioRef = React.useRef()
  const [sourceURL, setSource] = React.useState('https://www.everyayah.com/data/Saood_ash-Shuraym_128kbps/001001.mp3');
  const [nowPlaying, setNowPlaying] = React.useState(1);
  const [currentPage, setPage] = React.useState(2);
  const [rangeRepeat, setRangeRepeat] = React.useState(true);
  const [qari, setQari] = React.useState(1)
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    if (Number(height) < 500 || Number(width) < 765) {
      setWindowHeight('auto');
    } else {
      setWindowHeight((Number(height) - 20) + 'px');
    }
    setIsLoading(true);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeMode = () => {
    setIsDark(!isDark);
  };

  const handleChangePlay = () => {
    // console.log(sourceURL);
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play();
      }
    }
  };

  const handleChangeSlider = (event, newValue) => {
    prepareAudio(surahID, newValue);
    setIsPlay(false);
  };

  function lpad(value, padding) {
    var zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
  }

  function valuetext(value) {
    return `${value}`;
  }

  const surahChange = (event) => {
    setSurah(event.target.value);
    setFrom(1);
    setTo(surahs[Number(event.target.value) - 1].total_verses);
    localStorage.setItem("repeatUsed", 1);
    prepareAudio(event.target.value, 1);
    setIsPlay(false);
  };

  const fromChange = (event) => {
    applyFromChange(event.target.value);
  }

  const toChange = (event) => {
    applyToChange(event.target.value);
  }

  const applyFromChange = (value) => {
    prepareAudio(surahID, value);
    setFrom(value);
    setIsPlay(false);
    localStorage.setItem("repeatUsed", 1);
    if (value > to) {
      setTo(value);
    }
  }

  const applyToChange = (value) => {
    setTo(value);
    localStorage.setItem("repeatUsed", 1);
    if (from > value) {
      prepareAudio(surahID, value);
      setFrom(value);
    }
  }

  const repeatChange = (event) => {
    setRepeat(event.target.value);
    localStorage.setItem("repeatUsed", 1);
  }

  const handleRangeRepeat = () => {
    setRangeRepeat(!rangeRepeat);
  }

  const qariChange = (event) => {
    setQari(event.target.value);
    let suffix = lpad(surahID, 3) + lpad(nowPlaying, 3) + ".mp3";
    let url = commonURL + qariList[event.target.value] + "/" + suffix;
    setSource(url);
    // prepareAudio(surahID, nowPlaying);
    if (isPlay) {
      playAudio(url);
    }
  }

  function prepareAudio(surah, ayah) {
    console.log("preparing audio", surah, ayah, qari)
    let suffix = lpad(surah, 3) + lpad(ayah, 3) + ".mp3";
    setSource(commonURL + qariList[qari] + "/" + suffix);
    setNowPlaying(ayah);
    setSliderValue(Number(ayah));
    audioRef.current.load();
    updatePage(surah, ayah);
  }

  function playAudio(sourceURL) {
    // console.log(sourceURL);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }

  let repeatUsed = 1;
  function afterAudio() {
    let playing = Number(nowPlaying);
    repeatUsed = Number(localStorage.getItem("repeatUsed")) + 1;
    if (repeatUsed > repeat) {
      repeatUsed = 1;
      playing += 1;
    }
    localStorage.setItem("repeatUsed", repeatUsed);
    if (playing <= to) {
      prepareAudio(surahID, playing);
      playAudio(sourceURL);
    } else {
      prepareAudio(surahID, from);
      if (rangeRepeat) {
        playAudio(sourceURL);
      }
      localStorage.setItem("repeatUsed", 1);
    }
  }

  function updatePage(surah, ayah) {
    setPage(surahs_new[surah - 1].details[ayah - 1].page_number)

    // for (var i = 0; i < ayahs.length; i++) {
    //   if (ayahs[i].sura_number == surah && ayahs[i].ayah_number == ayah) {
    //     setPage(ayahs[i].page_number);
    //     break;
    //   }
    // }
  }

  return (
    <ThemeProvider theme={theme}>
      <SEO
        title="Easy Hifz"
        description="Easy Hifz is a free online Quran memorizing tool with visual 15 line hafezi/hafizi Quran. It allows you to listen/memorize to The Holy Quran conveniently."
        author="amanullah asraf asraf047 rezaul hoque rezaulhsagar"
      />
      {isLoading ? (
        <Box as="section" id="banner" sx={styles.banner} style={{ filter: isDark ? 'invert(100%) brightness(110%)' : 'none' }} >
          <Container sx={styles.banner.container}>
            <Flex sx={styles.banner.row}>

              <Box sx={styles.banner.col}>
                <Box sx={styles.banner.content}>
                  <Heading as="h3">
                    <Fab color="primary" aria-label="play" className={classes.play} onClick={handleChangePlay}>
                      {isPlay ?
                        (<PauseIcon />)
                        :
                        (<PlayArrowIcon />)
                      }
                    </Fab>
                  Easy Hifz
                    <Fab size="small" color="primary" aria-label="add" className={classes.mode} onClick={handleClickOpen}>
                      <InfoOutlinedIcon />
                  </Fab>
                  <Fab size="small" color="primary" aria-label="add" className={classes.mode} onClick={handleChangeMode}>
                      {isDark ?
                        (<WbSunnyOutlinedIcon />)
                        :
                        (<NightsStayOutlinedIcon />)
                      }
                    </Fab>
                  </Heading>

                  <Box as="form" sx={styles.banner.form}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Qari</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={qari}
                        onChange={qariChange}
                        label="Qari"
                      >
                        {array.slice(0, qaris.length - 1).map(i =>
                          <MenuItem value={i} key={i}>{qaris[i]}</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box as="form" sx={styles.banner.form}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Surah</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={surahID}
                        onChange={surahChange}
                        label="Surah"
                      >
                        {surahs.map(surah =>
                          <MenuItem value={surah.number} key={surah.number}>{surah.number}. {surah.transliteration_en}</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box as="form" sx={styles.banner.form}>
                    <Grid gap={0} width={[1, .1, 1]}>
                      <Box>
                        <FormControl variant="outlined" className={classes.formControl2}>
                          <InputLabel id="demo-simple-select-outlined-label">From</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={from}
                            onChange={fromChange}
                            label="From"
                          >
                            {array.slice(0, surahs[Number(surahID) - 1].total_verses).map(i =>
                              <MenuItem value={i} key={i}>{i}</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl variant="outlined" className={classes.formControl2}>
                          <InputLabel id="demo-simple-select-outlined-label">To</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={to}
                            onChange={toChange}
                            label="To"
                          >
                            {array.slice(0, surahs[Number(surahID) - 1].total_verses).map(i =>
                              <MenuItem value={i} key={i}>{i}</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl variant="outlined" className={classes.formControl2}>
                          <InputLabel id="demo-simple-select-outlined-label">Repeat</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={repeat}
                            onChange={repeatChange}
                            label="Repeat"
                          >
                            {array.slice(0, 20).map(i =>
                              <MenuItem value={i} key={i}>{i}</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Box>

                  <Box as="form" style={{ backgroundColor: '#f1f3f4', padding: '7px', height: '69px' }}>
                    <audio
                      controls
                      ref={audioRef}
                      onEnded={afterAudio}
                      onPlay={() => setIsPlay(true)}
                      onPause={() => setIsPlay(false)}
                      style={{ width: '100%', border: '1px solid #b8b9bb', borderRadius: '4px' }}>
                      <source src={sourceURL} />
                    </audio>
                  </Box>

                  <Flex sx={styles.banner.slide}>
                    <Box p={1} sx={{ flex: '1 1 auto', margin: '7px 0px 0px 10px' }}>
                      <Slider className={classes.root}
                        value={value}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="on" //"on" or "auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        min={Number(from)}
                        max={Number(to)}
                      />
                    </Box>
                    <Box p={1}>
                      <FormControlLabel className={classes.formControlLabel}
                        value="top"
                        control={
                          <Switch
                            color="primary"
                            checked={rangeRepeat}
                            onChange={handleRangeRepeat}
                            name="rangeRepeat"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                        }
                        label="Range Repeat"
                        labelPlacement="top"
                      />
                    </Box>
                  </Flex>

                  <div>
                    {/* <Button size="small" color="primary" onClick={handleClickOpen}>
                      Details
                    </Button> */}
                    <Dialog
                      fullScreen={false}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">{"About Easy Hifz"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Easy Hifz is an online Quran tool that allows you to listen to The Holy Quran conveniently.
                        </DialogContentText>
                        <DialogContentText>
                        Most of the Bangladeshi people who are memorizing the Quran have the 15 line Emdadia printed copy. We have integrated the page of this Quran to make memorization and revision easy. If you spot any mistake regarding the audio or image please let us know. We are waiting for your kind suggestions.
                        </DialogContentText>
                        <DialogContentText>
                          <small>
                          <b>Developers :</b> <i>Amanullah Asraf, Rezaul Hoque</i> <br/>
                          <b>Email :</b><i>{" {amanullahoasraf, rezaulhsagar}@gmail.com"}</i>
                          </small>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>

                </Box>
              </Box>

              <Box sx={styles.banner.col}>
                <Box sx={styles.banner.imageBox}>
                  <Box sx={styles.banner.imageInner}>
                    <Image
                      src={"/page/" + currentPage + "-min.jpg"}
                      alt="Picture of the page"
                      sx={styles.banner.image}
                      style={{ height: windowHeight }}
                    // onerror={this.src='/favicon.ico'}
                    />
                  </Box>
                </Box>
              </Box>

            </Flex>
          </Container>
        </Box>
      ) :
        null
        // <Image
        //   src={"/preloader.gif"}
        //   alt="Placeholder"
        //   style={{
        //     position: 'fixed',
        //     top: '50%',
        //     left: '50%',
        //     transform: 'translate(-50%, -50%)',
        //   }}
        // />
      }
    </ThemeProvider>
  );
}
