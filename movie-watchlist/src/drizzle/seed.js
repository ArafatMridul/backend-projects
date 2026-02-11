import { db } from "./db.js";
import { moviesTable } from "./schema.js";

const movies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont",
    durationMinutes: "142",
    releaseDate: new Date("1994-10-14")
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
    director: "Francis Ford Coppola",
    durationMinutes: "175",
    releaseDate: new Date("1972-03-24")
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.",
    director: "Christopher Nolan",
    durationMinutes: "152",
    releaseDate: new Date("2008-07-18")
  },
  {
    title: "Pulp Fiction",
    description: "The lives of four mobsters, two boxers, a gangster and his wife intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    durationMinutes: "154",
    releaseDate: new Date("1994-10-14")
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson unfold from the perspective of an Alabama man with an IQ of 75.",
    director: "Robert Zemeckis",
    durationMinutes: "142",
    releaseDate: new Date("1994-07-06")
  },
  {
    title: "Inception",
    description: "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    director: "Christopher Nolan",
    durationMinutes: "148",
    releaseDate: new Date("2010-07-16")
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    director: "Lana Wachowski, Lilly Wachowski",
    durationMinutes: "136",
    releaseDate: new Date("1999-03-31")
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    durationMinutes: "169",
    releaseDate: new Date("2014-11-07")
  },
  {
    title: "The Avengers",
    description: "Earth's mightiest heroes must come together and learn to fight as a team to save the planet from an alien invasion.",
    director: "Joss Whedon",
    durationMinutes: "143",
    releaseDate: new Date("2012-05-04")
  },
  {
    title: "Titanic",
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    director: "James Cameron",
    durationMinutes: "194",
    releaseDate: new Date("1997-12-19")
  }
];

async function seed(movies) {
  try {
    console.log("🌱 Starting seed...");

    for (const movie of movies) {
      await db.insert(moviesTable).values(movie);
      console.log(`Inserted: ${movie.title}`);
    }

    console.log("✅ Seed completed successfully! Inserted 10 movies.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

await seed(movies);

