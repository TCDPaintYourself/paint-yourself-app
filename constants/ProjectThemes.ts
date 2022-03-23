export interface IProjectTheme {
  id: Themes
  image: number
  name: string
}

export enum Themes {
  VANGOUGH = 'van-gogh',
  CLAUDEMONET = 'claude-monet',
  REMBRANDT = 'rembrandt',
  WHISTLER = 'whistler',
  PICASSO = 'picasso',
  DAVINCI = 'da-vinci',
  CARAVAGGIO = 'caravaggio',
  // art styles
}

const ProjectTheme: IProjectTheme[] = [
  {
    id: Themes.VANGOUGH,
    image: require('assets/images/themes/van-gogh.jpg'),
    name: 'Van Gogh',
  },
  {
    id: Themes.CLAUDEMONET,
    image: require('assets/images/themes/claude-monet.jpg'),
    name: 'Claude Monet',
  },
  {
    id: Themes.REMBRANDT,
    image: require('assets/images/themes/rembrandt.jpg'),
    name: 'Rembrandt',
  },
  {
    id: Themes.WHISTLER,
    image: require('assets/images/themes/whistler.jpg'),
    name: 'Whistler',
  },
  {
    id: Themes.PICASSO,
    image: require('assets/images/themes/picasso.jpg'),
    name: 'Picasso',
  },
  {
    id: Themes.DAVINCI,
    image: require('assets/images/themes/da-vinci.jpg'),
    name: 'Da Vinci',
  },
  {
    id: Themes.CARAVAGGIO,
    image: require('assets/images/themes/caravaggio.jpg'),
    name: 'Caravaggio',
  },
]

export default ProjectTheme
