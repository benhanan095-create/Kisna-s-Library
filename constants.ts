import { Book } from './types';

// Helper to generate a consistent random image
const getCover = (id: number) => `https://picsum.photos/seed/book${id}/300/450`;

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: "The Echoes of Time",
    author: "Sarah J. Miller",
    price: 19.99,
    description: "A journey through the ages as one woman discovers she can rewrite history, but at a terrible cost.",
    coverUrl: getCover(1),
    category: "Science Fiction",
    rating: 4.5
  },
  {
    id: '2',
    title: "Culinary Secrets",
    author: "Chef Antonio",
    price: 34.50,
    description: "Master the art of Italian cooking with over 100 authentic recipes passed down through generations.",
    coverUrl: getCover(2),
    category: "Cooking",
    rating: 4.8
  },
  {
    id: '3',
    title: "The Silent Forest",
    author: "Elena Ruskov",
    price: 14.99,
    description: "A gripping thriller about a detective searching for a missing child in a forest that whispers secrets.",
    coverUrl: getCover(3),
    category: "Mystery",
    rating: 4.2
  },
  {
    id: '4',
    title: "Code of the Future",
    author: "David Chen",
    price: 45.00,
    description: "An in-depth look at how AI and quantum computing are reshaping the landscape of software engineering.",
    coverUrl: getCover(4),
    category: "Technology",
    rating: 4.9
  },
  {
    id: '5',
    title: "Gardens of Babylon",
    author: "Historian James",
    price: 22.95,
    description: "Unearthing the myths and realities of the ancient world's most mysterious wonder.",
    coverUrl: getCover(5),
    category: "History",
    rating: 4.3
  },
  {
    id: '6',
    title: "Starlight Voyage",
    author: "K. R. Tims",
    price: 18.99,
    description: "A space opera spanning three galaxies and a war that threatens to extinguish the stars.",
    coverUrl: getCover(6),
    category: "Science Fiction",
    rating: 4.6
  },
  {
    id: '7',
    title: "Mindful Living",
    author: "Dr. A. Sharma",
    price: 15.99,
    description: "Practical steps to reduce stress and find peace in a chaotic modern world.",
    coverUrl: getCover(7),
    category: "Self Help",
    rating: 4.7
  },
  {
    id: '8',
    title: "The Lost Painter",
    author: "Isabella V.",
    price: 28.00,
    description: "A historical fiction novel about a forgotten artist in Renaissance Florence.",
    coverUrl: getCover(8),
    category: "Historical Fiction",
    rating: 4.4
  },
];

// Generate more mock books to simulate "1000+"
const CATEGORIES = ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Biography", "History", "Technology"];
const ADJECTIVES = ["Silent", "Bright", "Dark", "Hidden", "Lost", "Eternal", "Broken", "Golden", "Crimson", "Azure", "Frozen", "Burning"];
const NOUNS = ["City", "Dream", "Shadow", "Light", "Wind", "Storm", "Sea", "Mountain", "Soul", "Star", "Empire", "Secret"];
const INTROS = ["A compelling tale of", "The untold story of", "A journey into the heart of", "Discover the secrets of", "An epic saga involving", "A deep dive into"];
const OUTROS = ["that changes everything.", "buried for centuries.", "in a world of uncertainty.", "fighting for survival.", "beyond the realms of imagination.", "waiting to be discovered."];

for (let i = 9; i <= 100; i++) {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const intro = INTROS[Math.floor(Math.random() * INTROS.length)];
  const outro = OUTROS[Math.floor(Math.random() * OUTROS.length)];
  
  MOCK_BOOKS.push({
    id: i.toString(),
    title: `The ${adj} ${noun}`,
    author: `Author ${i}`,
    price: parseFloat((10 + Math.random() * 40).toFixed(2)),
    description: `${intro} the ${adj.toLowerCase()} ${noun.toLowerCase()}, ${outro} This book explores the themes of ${noun.toLowerCase()}s and ${adj.toLowerCase()} moments in a way you've never seen before.`,
    coverUrl: getCover(i),
    category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
    rating: parseFloat((3 + Math.random() * 2).toFixed(1))
  });
}