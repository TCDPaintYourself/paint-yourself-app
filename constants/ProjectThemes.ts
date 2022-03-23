export interface IProjectTheme {
  id: Themes
  image: number
  name: string
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
    name: 'Van Gogh',
  },
  {
    id: Themes.CLAUDEMONET,
    image: require('assets/images/themes/claude-monet/water-lillies.jpg'),
    name: 'Claude Monet',
  },
  {
    id: Themes.REMBRANDT,
    image: require('assets/images/themes/rembrandt/the-storm.jpg'),
    name: 'Rembrandt',
  },
  {
    id: Themes.WHISTLER,
    image: require('assets/images/themes/whistler/the-gentle-art-of-making-enemies.jpg'),
    name: 'Whistler',
  },
  {
    id: Themes.PICASSO,
    image: require('assets/images/themes/picasso/les-femmes-dalgiers.jpg'),
    name: 'Picasso',
  },
  {
    id: Themes.DAVINCI,
    image: require('assets/images/themes/da-vinci/mona-lisa.jpg'),
    name: 'Da Vinci',
  },
  {
    id: Themes.CARAVAGGIO,
    image: require('assets/images/themes/caravaggio/self-portrait.jpg'),
    name: 'Caravaggio',
  },
  {
    id: Themes.POPART,
    image: require('assets/images/themes/pop-art/warhol_marilyn.jpg'),
    name: 'Pop Art',
  },
  {
    id: Themes.IMPRESSIONISM,
    image: require('assets/images/themes/impressionism/afremov_sleeping-city.jpeg'),
    name: 'Impressionism',
  },
  {
    id: Themes.EXPRESSIONISM,
    image: require('assets/images/themes/expressionism/munch_the-scream.jpg'),
    name: 'Expressionism',
  },
  {
    id: Themes.ARTNOUVEAU,
    image: require('assets/images/themes/art-nouveau/mucha_daydream.png'),
    name: 'Art Nouveau',
  },
]

export default ProjectTheme
