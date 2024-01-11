import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const cover = '/Dieoutjiemuisic.png';
  const artest = ' - Dieoutjiemusic';

  const songs = [
    {
      url: '/song.mp3',
      title: 'New song !'+artest,
      cover: cover,
    },
    {
      url: '/Rugsteekers.mp3',
      title: 'Rugsteekers'+artest,
      cover: cover,
    },
    {
      url: '/Bozza.mp3',
      title: 'Bozza'+artest,
      cover: cover,
    },
    {
      url: '/Blomme.mp3',
      title: 'Blomme'+artest,
      cover: cover,
    },
    {
      url: '/DangerousGirl.mp3',
      title: 'Dangerous Girl'+artest,
      cover: cover,
    },
    {
      url: '/HOE-LYKIT.mp3',
      title: 'HOE LYKIT'+artest,
      cover: cover,
    },
    {
      url: '/Hoelank-nog.mp3',
      title: 'Hoelank nog'+artest,
      cover: cover,
    },
    {
      url: '/KEN-JO-WAARDE.mp3',
      title: 'KEN JO WAARDE'+artest,
      cover: cover,
    },
    {
      url: '/kroon.mp3',
      title: 'kroon'+artest,
      cover: cover,
    },
    {
      url: '/LEWE-CHANGE.mp3',
      title: 'LEWE CHANGE'+artest,
      cover: cover,
    },
    {
      url: '/Loyalty.mp3',
      title: 'Loyalty'+artest,
      cover: cover,
    },
    {
      url: '/Vir-My,My.mp3',
      title: 'Vir My,My'+artest,
      cover: cover,
    },
    {
      url: '/Waardes.mp3',
      title: 'Waardes'+artest,
      cover: cover,
    },
    // Add more song objects here
  ];

  const playSong = (songIndex, startTime = 0, playImmediately = true) => {
  const audioElement = new Audio(songs[songIndex].url);
  audioElement.currentTime = startTime;
  if (playImmediately) {
    audioElement.play();
    setIsPlaying(true);
  }
  setCurrentSongIndex(songIndex);
  audioRef.current = audioElement;
  setProgress(0); // Reset progress when changing the song
};

  const togglePlay = () => {
    const audioElement = audioRef.current;

    if (audioElement && isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      if (audioElement) {
        audioElement.play();
        setIsPlaying(true);
      } else {
        playSong(currentSongIndex);
      }
    }
  };

  const skipForward = () => {
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    if (isPlaying) {
      audioRef.current.pause();
      playSong(nextSongIndex);
    } else {
      playSong(nextSongIndex, 0, false);
    }
    if (!isPlaying && audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipBackward = () => {
  const audioElement = audioRef.current;

  if (audioElement.currentTime <= 5 && currentSongIndex !== 0) {
    if (isPlaying) {
      audioRef.current.pause();
    }
    setProgress(0); // Reset progress when skipping backward
    playSong(currentSongIndex - 1, 0);
  } else {
    if (isPlaying) {
      audioRef.current.pause();
    }
    setProgress(0); // Reset progress when skipping to the same song
    playSong(currentSongIndex, 0);
  }
};

useEffect(() => {
    const currentSongElement = document.getElementById(`song-${currentSongIndex}`);

    if (currentSongElement) {
      currentSongElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentSongIndex]);

const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSongClick = (songIndex) => {
  const isCurrentSong = currentSongIndex === songIndex;
  const audioElement = audioRef.current;

  if (audioElement && isPlaying && !isCurrentSong) {
    audioElement.pause(); // Pause the current song if it's playing and not the clicked one
    setIsPlaying(false);
  }

  if (!isCurrentSong) {
    playSong(songIndex);
  } else {
    togglePlay();
  }
};

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh', // Adjust the height as needed
      }}
    >
      <Box mt={5}>
        <Image src={songs[currentSongIndex].cover} alt="Album Cover" width={200} height={200} />
      </Box>
      <Box mt={2}>{songs[currentSongIndex].title}</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
          mt: 3,
          alignItems: 'center',
        }}
      >
        <Image src="/skip-previous.svg" alt="Previous" width={20} height={20} onClick={skipBackward}/>
        <Image src={!isPlaying ? '/play.svg' : 'pause.svg'} alt="Play Icon" width={40} height={40} onClick={togglePlay}/>
        <Image src="/skip-next.svg" alt="next" width={20} height={20} onClick={skipForward}/>
      </Box>
      <Box sx={{ width: '100%', mt: 3, height: '400px', overflowY: 'auto' }}>
        {songs.map((song, index) => (
          <Box
            key={index}
            id={`song-${index}`} // Add an id to each song element
            sx={{
              padding: 1,
              mt: 1.5,
              bgcolor: currentSongIndex === index ? '#FFD600' : '#FF9900',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleSongClick(index)}
          >
            <Image src={song.cover} alt="Song Cover" width={40} height={40} />
            <Typography
              sx={{
                ml: 2,
                fontSize: 14,
                fontWeight: currentSongIndex === index ? 700 : 400,
                color: 'black',
              }}
            >
              {song.title}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <a href={song.url} download={`${song.title}.mp3`} onClick={(e) => { e.preventDefault(); handleDownload(song.url, song.title); }}>
              <Image src="/download.svg" alt="Download" width={20} height={20} style={{ }} />
            </a>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default MusicPlayer;