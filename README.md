# Watch-Me: Media Database explorer powered by TMDB API

## 1. Project Overview

**Watch-Me** is a web application designed for cinema enthusiasts and binge-watchers who need a centralized place to discover, track, and organize their media consumption.

## 2. Technical Architecture

Even though this website uses React, Object Oriented Principles were still used. Here is how the structure would look if it was OOP:

### Class/Component Breakdown

- **Home Class:** represents the data dealing with the homepage
  - **Properties:**
    - `popularMovies`: Movie[]
    - `isLoading`: bool
    - `error`: String
    - `isWatched`.
  - **Methods:**
    - `getPopularMovies()`: gets all movies in the popular category from the API
- **Navbar**: represents all functionality done in the navbar, like searching
  - **Properties**
    - `searchResults`: Movies[]
    - `isSearching`: bool
    - `movieGenres`: Map<int, String>[]
    - `tvGenres`: Map<int, String>[] -`genreCacheRef`: Map<String,Map<int, String>[]> -`searchCacheRef`: String -`abortControllerRef`: AbortController()
  - **Methods**\
     -`getSearchResults()`: gets the search results from the API, which is then set to `searchResults`

- **Info**: represents all functionality done in the information page
  - **Properties**
    - `show`: Movie()
    - `loading`: bool
  - **Methods** -`getShow()`: gets the movie info from the api

  **watchlist**: represents all functionality regarding updating, saving, and modifying the watchlist

- **Properties**:
  - `watchlist`: Movies[]

- **Methods**
  - `logWatchlist()`: helper debugger function that prints the current watchlist object
  - `saveWatchlist()`: saves the current watchlist object to localStorage

  - `addToWatchlist(show:Movie(), id:int, type:String)`: adds `show` to the watchlist

  - `removeFromWatchlist(id:int, type:String)`: saves the current watchlist object to localStorage

  - `empty()`: empties the list (FOR DEBUGGING ONLY!)
  - `hasBeenSaved(show:Movie(), id:int, type:String)`: determines whether `show` has been saved to the watchlist

- **Utils**: Utilitiy functions that serve no specific purpose, but improve code organization and speed
- **Methods**
- `getRequest(url:String)`: returns the formatted JSON of a get request from the TMDB API. Sends the get request with the required authorization headers.\
  -`getPosterImg(path:String)`: returns the full url for the poster path, typically given by the API

---

## 3. Feature Walkthrough

### Dynamic Movie Search

Users can search the vast database of The Movie Database (TMDb).

### Watchlist Management

With a single click, users can add any search result to their personal watchlist. Due to constraints, the watchlist is only in localStorage, meaning that the watchlist can only stay the same on one browser at a time.

### Persistent Storage

The app automatically saves your list to the browser's LocalStorage.

- **Tech:** Window.localStorage API.

---

## 4. API Documentation

This project consumes **The Movie Database (TMDb) API v3**, which requires an API key to get started.

- [link to TMDB API documentation](https://developer.themoviedb.org/docs/getting-started)

  > **Note:** Ensure your key is stored in a `.env` file and not hardcoded into the source files.

---

## 5. Challenges and Decisions

### Asynchronous code

The hardest part was ensuring that the UI updated immediately when a user added a movie, while simultaneously updating LocalStorage and ensuring no duplicate IDs were added.

### Decisions

- **Functional Components vs. Classes:** I chose React Functional Components with Hooks (`useState`, `useEffect`) because they result in cleaner, more readable code and easier testing.
- **CSS Modules:** I opted for CSS Modules over global CSS to prevent style leakage and ensure components remain truly portable.

### Future Improvements

If given more time, I would implement a mobile layout.

---

## 6. How to Run

This website is available to the public at (https://ohaya-watch-me.vercel.app), but follow the instructions below to clone it on your device

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
