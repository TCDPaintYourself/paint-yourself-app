export interface IProjectTheme {
  id: string
  image: string
  name: string
}

const ProjectTheme: IProjectTheme[] = [
  {
    id: '1',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    name: 'Van Gogh',
  },
  {
    id: '2',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
    name: 'Claude Monet',
  },
  {
    id: '3',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    name: 'Rembrandt',
  },
  {
    id: '4',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
    name: 'Whistler',
  },
  {
    id: '5',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
    name: 'Picasso',
  },
  {
    id: '6',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
    name: 'Da Vinci',
  },
  {
    id: '7',
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
    name: 'Caravaggio',
  },
]

export default ProjectTheme
