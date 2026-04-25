# Watch-Me: Media Database explorer powered by TMDB API

## 1. Project Overview

**Watch-Me** is a web application designed for cinema enthusiasts and binge-watchers who need a centralized place to discover, track, and organize their media consumption.

## 2. Technical Architecture

The application follows a modular Frontend-First architecture (React/JavaScript), interacting with an external metadata API.

### Class/Component Breakdown

- **App Component:** The root container that manages the global state (the watchlist) and handles the primary routing.
- **Home Class:** represents the home data
  - **Properties:**
    - `id`
    - `title`,
    - `posterPath`,
    - `releaseDate`,
    - `rating`, and
    - `isWatched`.
  - **Methods:** `toggleStatus()` to switch between "To Watch" and "Completed."
- **Search Engine:** A utility class that handles asynchronous fetches to the external API, formatting raw JSON into application-ready objects.
- **LocalStorage Handler:** A service class responsible for persisting the user's list in the browser so data isn't lost on refresh.

---

## 3. Feature Walkthrough

### Dynamic Movie Search

Users can search the vast database of The Movie Database (TMDb). As you type, the app fetches matching titles and displays them in a grid.

- **Tech:** Fetch API, Debouncing logic, React State.

### Watchlist Management

With a single click, users can add any search result to their personal watchlist. Items can be filtered by "Pending" or "Watched."

- **Tech:** JavaScript Array methods (`filter`, `map`), CSS Grid.

### Persistent Storage

The app automatically saves your list to the browser's LocalStorage.

- **Tech:** Window.localStorage API.

---

## 4. API Documentation

This project consumes **The Movie Database (TMDb) API v3**.

- **Endpoints Used:**
  - `GET /search/movie`: Used to find movies based on user string input.
  - `GET /movie/{movie_id}`: Used to pull detailed metadata for specific entries.
- **Data Handling:** The app receives a JSON object containing an array of results. We extract the `poster_path`, `vote_average`, and `overview` to populate our UI components.
- **Authentication:** Requires an `api_key` passed as a query parameter.
  > **Note:** Ensure your key is stored in a `.env` file and not hardcoded into the source files.

---

## 5. Challenges and Decisions

### The Challenge: Asynchronous State Sync

The hardest part was ensuring that the UI updated immediately when a user added a movie, while simultaneously updating LocalStorage and ensuring no duplicate IDs were added.

### Decisions

- **Functional Components vs. Classes:** I chose React Functional Components with Hooks (`useState`, `useEffect`) because they result in cleaner, more readable code and easier testing.
- **CSS Modules:** I opted for CSS Modules over global CSS to prevent style leakage and ensure components remain truly portable.

### Future Improvements

If given more time, I would implement **Firebase Authentication** to allow users to access their watchlist across different devices, rather than being limited to one browser's local storage.

---

## 6. How to Run

Follow these steps to get the project running locally:

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/kelvinOhaya/watch-me.git](https://github.com/kelvinOhaya/watch-me.git)
    cd watch-me
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    - Create a file named `.env` in the root directory.
    - Add your TMDb API key:
      ```env
      REACT_APP_TMDB_KEY=your_api_key_here
      ```

4.  **Launch the App:**
    ```bash
    npm start
    ```
    The application will open at `http://localhost:3000`.
