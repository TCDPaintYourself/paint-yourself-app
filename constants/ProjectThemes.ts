export interface IProjectTheme {
  id: Themes
  image: string
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
}

const ProjectTheme: IProjectTheme[] = [
  {
    id: Themes.VANGOUGH,
    image:
      'https://raw.githubusercontent.com/TCDPaintYourself/paint-yourself-api/image-painting/paint_yourself_api/themes/vangogh.jpg',
    name: 'Van Gogh',
  },
  {
    id: Themes.CLAUDEMONET,
    image:
      'https://raw.githubusercontent.com/TCDPaintYourself/paint-yourself-api/image-painting/paint_yourself_api/themes/monet.jpg',
    name: 'Claude Monet',
  },
  {
    id: Themes.REMBRANDT,
    image:
      'https://raw.githubusercontent.com/TCDPaintYourself/paint-yourself-api/image-painting/paint_yourself_api/themes/rembrandt.jpg',
    name: 'Rembrandt',
  },
  {
    id: Themes.WHISTLER,
    image:
      'https://raw.githubusercontent.com/TCDPaintYourself/paint-yourself-api/image-painting/paint_yourself_api/themes/whistler.jpg',
    name: 'Whistler',
  },
  {
    id: Themes.PICASSO,
    image:
      'https://raw.githubusercontent.com/TCDPaintYourself/paint-yourself-api/image-painting/paint_yourself_api/themes/picasso.jpg',
    name: 'Picasso',
  },
  {
    id: Themes.DAVINCI,
    image:
      'https://raw.githubusercontent.com/TCDPaintYourself/paint-yourself-api/image-painting/paint_yourself_api/themes/davinci.jpg',
    name: 'Da Vinci',
  },
  {
    id: Themes.CARAVAGGIO,
    image:
      'https://raw.githubusercontent.com/TCDPaintYourself/paint-yourself-api/image-painting/paint_yourself_api/themes/caravaggio.jpg',
    name: 'Caravaggio',
  },
]

export default ProjectTheme
