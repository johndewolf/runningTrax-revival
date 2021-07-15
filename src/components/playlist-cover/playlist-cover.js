
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import './playlist-cover.css'
const PlaylistCover = () => {
  const playlist = useSelector(state => state.playlist.playlist)
  const [images, updateImages] = useState([])

  useEffect(() => {
    const flatten = playlist.flat();
    let songs = [];
    if (flatten.length > 4) {
      //approximate different parts of the playlist
      songs.push(flatten[0]);
      songs.push(flatten[Math.floor((flatten.length - 1) / 4)]);
      songs.push(flatten[Math.floor((flatten.length - 1) * 0.75)]);
      songs.push(flatten[flatten.length - 1]);
    }
    let imageUrls = songs.map((song) => song.album.images[1].url)
    updateImages(imageUrls);
  }, [playlist])
  return (
    <div className={`playlist-cover playlist-size-${images.length}`}>
      {images.map((image, i) => {
        return (
          <div className={`playlist-image playlist-image-${i}`} key={`cover-${i}`}>
            <img src={image} alt="album cover" />
          </div>)
      })}
    </div>
  );
}

export default PlaylistCover