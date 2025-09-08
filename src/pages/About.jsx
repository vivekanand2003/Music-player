const About = () => {
  return (
    <div className="page-content">
      <h1>About MusicStream</h1>
      
      <div className="content-section">
        <h2>Our Mission</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          MusicStream is dedicated to bringing you the best music discovery experience. 
          We believe that music has the power to connect people, inspire creativity, and 
          enhance every moment of life. Our platform provides a seamless way to discover, 
          play, and organize your favorite songs.
        </p>
      </div>

      <div className="content-section">
        <h2>What We Offer</h2>
        <ul style={{ lineHeight: '1.8', color: '#666' }}>
          <li><strong>Vast Music Library:</strong> Access thousands of songs from various genres and artists</li>
          <li><strong>Personalized Experience:</strong> Create your own collection of liked songs</li>
          <li><strong>Easy Discovery:</strong> Search and filter songs by title, artist, or album</li>
          <li><strong>User-Friendly Interface:</strong> Clean, intuitive design that works on all devices</li>
          <li><strong>Secure Platform:</strong> Safe and secure user authentication and data protection</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Our Story</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          Founded in 2025, MusicStream started as a passion project to create a better way 
          for music lovers to discover and enjoy their favorite tunes. Our team of music 
          enthusiasts and technology experts work tirelessly to provide you with the best 
          possible music streaming experience.
        </p>
      </div>

      <div className="content-section">
        <h2>Get in Touch</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          We love hearing from our users! Whether you have feedback, suggestions, or just 
          want to share your favorite discoveries, feel free to reach out to us.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Email:</strong> hello@musicstream.com</p>
          <p><strong>Support:</strong> support@musicstream.com</p>
          <p><strong>Follow us:</strong> @MusicStreamApp</p>
        </div>
      </div>
    </div>
  );
};

export default About;