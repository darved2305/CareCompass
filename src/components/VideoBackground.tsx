function VideoBackground() {
  return (
    <div className="video-background">
      <video autoPlay muted loop playsInline preload="auto">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </div>
  )
}

export default VideoBackground
