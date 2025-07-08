const images = [
  'https://w7.pngwing.com/pngs/1008/377/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-black-hair-computer.png',
  'https://w7.pngwing.com/pngs/812/462/png-transparent-account-avatar-profile-user-avatars-icon.png',
  'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png',
  'https://w7.pngwing.com/pngs/831/902/png-transparent-account-avatar-profile-user-avatars-icon.png'
]
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const elegirUnaImagen = ()=>{
  return images[getRandomInt(0,images.length -1 )]
} 