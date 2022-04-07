export interface IProjectTheme {
  id: Themes
  image: number
  folder: string
  name: string
  votes: number
}

export enum Themes {
  // artists
  VANGOUGH = 'van-gogh',
  CLAUDEMONET = 'claude-monet',
  REMBRANDT = 'rembrandt',
  WHISTLER = 'whistler',
  PICASSO = 'picasso',
  DAVINCI = 'da-vinci',
  CARAVAGGIO = 'caravaggio',
  // art styles
  POPART = 'pop-art',
  IMPRESSIONISM = 'impressionism',
  EXPRESSIONISM = 'expressionism',
  ARTNOUVEAU = 'art-nouveau',
}

const ProjectTheme: IProjectTheme[] = [
  {
    id: Themes.VANGOUGH,
    image: require('assets/images/themes/van-gogh/self-portrait.jpg'),
    folder: 'assets/images/themes/van-gogh/',
    name: 'Van Gogh',
    votes: 0,
  },
  {
    id: Themes.CLAUDEMONET,
    image: require('assets/images/themes/claude-monet/water-lillies.jpg'),
    folder: 'assets/images/themes/claude-monet/',
    name: 'Claude Monet',
    votes: 0,
  },
  {
    id: Themes.REMBRANDT,
    image: require('assets/images/themes/rembrandt/the-storm.jpg'),
    folder: 'assets/images/themes/rembrandt/',
    name: 'Rembrandt',
    votes: 0,
  },
  {
    id: Themes.WHISTLER,
    image: require('assets/images/themes/whistler/the-gentle-art-of-making-enemies.jpg'),
    folder: '',
    name: 'Whistler',
    votes: 0,
  },
  {
    id: Themes.PICASSO,
    image: require('assets/images/themes/picasso/les-femmes-dalgiers.jpg'),
    folder: 'assets/images/themes/whistler/',
    name: 'Picasso',
    votes: 0,
  },
  {
    id: Themes.DAVINCI,
    image: require('assets/images/themes/da-vinci/mona-lisa.jpg'),
    folder: 'assets/images/themes/da-vinci/',
    name: 'Da Vinci',
    votes: 0,
  },
  {
    id: Themes.CARAVAGGIO,
    image: require('assets/images/themes/caravaggio/self-portrait.jpg'),
    folder: 'assets/images/themes/caravaggio/',
    name: 'Caravaggio',
    votes: 0,
  },
  {
    id: Themes.POPART,
    image: require('assets/images/themes/pop-art/warhol_marilyn.jpg'),
    folder: 'assets/images/themes/pop-art/',
    name: 'Pop Art',
    votes: 0,
  },
  {
    id: Themes.IMPRESSIONISM,
    image: require('assets/images/themes/impressionism/afremov_sleeping-city.jpeg'),
    folder: 'assets/images/themes/impressionism/',
    name: 'Impressionism',
    votes: 0,
  },
  {
    id: Themes.EXPRESSIONISM,
    image: require('assets/images/themes/expressionism/munch_the-scream.jpg'),
    folder: 'assets/images/themes/expressionism/',
    name: 'Expressionism',
    votes: 0,
  },
  {
    id: Themes.ARTNOUVEAU,
    image: require('assets/images/themes/art-nouveau/mucha_daydream.jpg'),
    folder: 'assets/images/themes/art-nouveau/',
    name: 'Art Nouveau',
    votes: 0,
  },
]

export default ProjectTheme
