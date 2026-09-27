/// <reference types="vite/client" />

// vite-imagetools: import foto from "foto.jpg?w=480;960&format=webp&as=picture"
interface ImagetoolsPicture {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}
declare module '*as=picture' {
  const picture: ImagetoolsPicture;
  export default picture;
}
