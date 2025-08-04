import ImageLightbox from '~/components/imageLightbox';
import NavBar from '~/components/navBar';

const comics = [
  {
    title: "You Smell GOOD",
    image: "/comics/comic_strip.PNG",
    date: "August 3, 2025",
    alt: "Mars looking annoyed at a blanket lump",
  },
  {
    title: "AGGRESSION",
    image: "/comics/smellAggression.png",
    date: "July 27, 2025",
    alt: "Sam sniffing pillow. Sam has a RAGE",
  },
  // add more comics here
];
export default function ComicsPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#fbebd4]">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6 text-[#5a3e2b]">Comic Library</h1>
          <ImageLightbox
            images={comics.map(({ image, alt, title }) => ({
              src: image,
              alt,
              title,
            }))}
          />
        </div>
      </main>
    </>
  );
}

