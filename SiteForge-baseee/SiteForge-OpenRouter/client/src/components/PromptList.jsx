import React from 'react';

// Updated PROMPTS array with 'display' (short title for UI) and 'detailed' (full prompt for AI generation)
const PROMPTS = [
  {
    display: "Disaster Relief Donations",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Donate, Contact, Resources) for disaster relief donations. Include responsive navigation between pages, contextually relevant content (e.g., donation forms, impact stories), images from Unsplash (e.g., disaster scenes, relief efforts), and interactive functionality using HTML, CSS, and JavaScript (e.g., donation form submission, progress trackers)."
  },
  {
    display: "Rural Women Entrepreneurs",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Products, Contact, Testimonials) for rural women entrepreneurs to showcase products. Include responsive navigation between pages, contextually relevant content (e.g., product listings, entrepreneur stories), images from Unsplash (e.g., rural landscapes, handmade goods), and interactive functionality using HTML, CSS, and JavaScript (e.g., product filters, contact forms)."
  },
  {
    display: "Tree Plantation Campaign",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Participate, Contact, Gallery) for a tree plantation campaign. Include responsive navigation between pages, contextually relevant content (e.g., campaign details, participation guides), images from Unsplash (e.g., trees, nature, planting activities), and interactive functionality using HTML, CSS, and JavaScript (e.g., event sign-ups, progress maps)."
  },
  {
    display: "Blood Donation Drive",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Donate, Contact, FAQs) for a local blood donation drive. Include responsive navigation between pages, contextually relevant content (e.g., donor benefits, drive schedules), images from Unsplash (e.g., medical equipment, people donating), and interactive functionality using HTML, CSS, and JavaScript (e.g., appointment booking, eligibility quizzes)."
  },
  {
    display: "Climate Awareness",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Initiatives, Contact, Resources) for climate awareness. Include responsive navigation between pages, contextually relevant content (e.g., climate facts, action tips), images from Unsplash (e.g., environmental scenes, global warming effects), and interactive functionality using HTML, CSS, and JavaScript (e.g., carbon footprint calculators, interactive maps)."
  },
  {
    display: "Animal Rescue Adoption",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Adopt, Contact, Gallery) for animal rescue adoption drives. Include responsive navigation between pages, contextually relevant content (e.g., animal profiles, adoption process), images from Unsplash (e.g., animals, rescue scenes), and interactive functionality using HTML, CSS, and JavaScript (e.g., adoption applications, pet finders)."
  },
  {
    display: "NGO Educational Programs",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Programs, Contact, Impact) for NGOs' educational programs. Include responsive navigation between pages, contextually relevant content (e.g., program details, success stories), images from Unsplash (e.g., classrooms, learning activities), and interactive functionality using HTML, CSS, and JavaScript (e.g., enrollment forms, progress trackers)."
  },
  {
    display: "Community Health Awareness",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Resources, Contact, Events) for community health awareness. Include responsive navigation between pages, contextually relevant content (e.g., health tips, local stats), images from Unsplash (e.g., healthy lifestyles, medical care), and interactive functionality using HTML, CSS, and JavaScript (e.g., health quizzes, event calendars)."
  },
  {
    display: "Youth Empowerment Workshops",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Workshops, Contact, Testimonials) for youth empowerment workshops. Include responsive navigation between pages, contextually relevant content (e.g., workshop agendas, participant stories), images from Unsplash (e.g., youth activities, empowerment themes), and interactive functionality using HTML, CSS, and JavaScript (e.g., registration forms, feedback surveys)."
  },
  {
    display: "Quiz for Kids",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Quizzes, Contact, Leaderboard) for kids' quizzes. Include responsive navigation between pages, contextually relevant content (e.g., quiz categories, fun facts), images from Unsplash (e.g., children, educational themes), and interactive functionality using HTML, CSS, and JavaScript (e.g., quiz games, score tracking)."
  },
  {
    display: "Free Skill Training",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Courses, Contact, Resources) for free skill training for underprivileged students. Include responsive navigation between pages, contextually relevant content (e.g., course listings, success stories), images from Unsplash (e.g., students learning, skill-building activities), and interactive functionality using HTML, CSS, and JavaScript (e.g., course enrollment, progress dashboards)."
  },
  {
    display: "Volunteer Showcase Platform",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Portfolio, Contact, Campaigns) for a volunteer showcase platform. Include responsive navigation between pages, contextually relevant content (e.g., volunteer profiles, campaign details), images from Unsplash (e.g., volunteers, community events), and interactive functionality using HTML, CSS, and JavaScript (e.g., profile builders, campaign trackers)."
  },
  {
    display: "Legal Aid for Women",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Services, Contact, Resources) for legal aid for women. Include responsive navigation between pages, contextually relevant content (e.g., legal guides, support stories), images from Unsplash (e.g., women in legal settings, empowerment), and interactive functionality using HTML, CSS, and JavaScript (e.g., consultation forms, resource searches)."
  },
  {
    display: "Clean Energy Awareness",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Initiatives, Contact, Resources) for clean energy awareness campaigns. Include responsive navigation between pages, contextually relevant content (e.g., energy facts, adoption tips), images from Unsplash (e.g., solar panels, renewable sources), and interactive functionality using HTML, CSS, and JavaScript (e.g., energy calculators, interactive demos)."
  },
  {
    display: "Mental Health Support Hub",
    detailed: "Generate a fully functional multi-page website (minimum 5 pages: Home, About, Resources, Contact, Community) for an online resource hub for mental health support. Include responsive navigation between pages, contextually relevant content (e.g., articles, support groups), images from Unsplash (e.g., mental wellness, supportive environments), and interactive functionality using HTML, CSS, and JavaScript (e.g., mood trackers, chat features)."
  }
];

export default function PromptList({ onUsePrompt }) {
  return (
    <div className="prompt-list mt-3">
      <h6>Ready Example Prompts</h6>
      <div className="row">
        {PROMPTS.map((p, i) => (
          <div key={i} className="col-md-6 mb-2">
            <div
              className="prompt-card p-2 border rounded hover:bg-light cursor-pointer"
              style={{ cursor: 'pointer', border: '1px solid #ddd', borderRadius: '8px' }}
              onClick={() => onUsePrompt(p.display)}  // Pass display name as topic identifier
            >
              <small>{p.display}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}