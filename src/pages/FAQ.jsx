import { useState } from 'react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the header, fill in your username, email, and password, then click 'Sign Up'. You'll be automatically logged in after successful registration."
    },
    {
      question: "Can I listen to music without an account?",
      answer: "You can browse our music library and view song details without an account, but you need to be logged in to play songs and like them."
    },
    {
      question: "How do I like a song?",
      answer: "Once you're logged in, you can click the heart icon (🤍) on any song card or song detail page to like it. Liked songs will appear in your 'Liked Songs' page."
    },
    {
      question: "How do I search for music?",
      answer: "Use the search bar on the home page to search for songs by title, artist name, or album name. The results will update automatically as you type."
    },
    {
      question: "Where can I find my liked songs?",
      answer: "Your liked songs are available in the 'Liked Songs' page, which you can access from the navigation menu when you're logged in."
    },
    {
      question: "Is MusicStream free to use?",
      answer: "Yes, MusicStream is completely free to use. Simply create an account and start discovering and enjoying music right away."
    },
    {
      question: "Can I use MusicStream on mobile devices?",
      answer: "Absolutely! MusicStream is fully responsive and works great on smartphones, tablets, and desktop computers."
    },
    {
      question: "How do I reset my password?",
      answer: "Currently, password reset functionality is not available in this demo version. In a full version, you would find a 'Forgot Password' link on the login page."
    },
    {
      question: "Can I create playlists?",
      answer: "Playlist functionality is not available in this current version, but you can use the 'Liked Songs' feature to save your favorite tracks."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team at support@musicstream.com or visit our About page for more contact information."
    }
  ];

  return (
    <div className="page-content">
      <h1>Frequently Asked Questions</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Find answers to common questions about using MusicStream.
      </p>

      <div>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggleItem(index)}
            >
              <span>{item.question}</span>
              <span>{openItems[index] ? '−' : '+'}</span>
            </button>
            {openItems[index] && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="content-section" style={{ marginTop: '2rem' }}>
        <h3>Still have questions?</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          If you couldn't find the answer you're looking for, don't hesitate to contact our support team.
        </p>
        <a href="mailto:support@musicstream.com" className="btn btn-primary">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQ;