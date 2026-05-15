export class MovieGenres {
  static genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Abenteuer",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Komödie",
    },
    {
      id: 80,
      name: "Krimi",
    },
    {
      id: 99,
      name: "Dokumentarfilm",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Familie",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "Historie",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Musik",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Liebesfilm",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV-Film",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "Kriegsfilm",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  static findGenreById(id: number) {
    const foundGenre = this.genres.find((genre) => genre.id === id);
    if (foundGenre !== undefined) return foundGenre.name;
    return null;
  }
  static findIdByGenre(name: string) {
    const foundGenre = this.genres.find((genre) => genre.name === name);
    if (foundGenre !== undefined) return foundGenre.id;
    return null;
  }
}

export class TVGenres {
  static genres = [
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Komödie",
    },
    {
      id: 80,
      name: "Krimi",
    },
    {
      id: 99,
      name: "Dokumentarfilm",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Familie",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  static findGenreById(id: number) {
    const foundGenre = this.genres.find((genre) => genre.id === id);
    if (foundGenre !== undefined) return foundGenre.name;
    return null;
  }
  static findIdByGenre(name: string) {
    const foundGenre = this.genres.find((genre) => genre.name === name);
    if (foundGenre !== undefined) return foundGenre.id;
    return null;
  }
}
