import { ArtistTypeRepository } from "./artist-type.repository";
import { ArtistRepository } from "./artist.repository";

export { ArtistTypeRepository } from "./artist-type.repository";
export { ArtistRepository } from "./artist.repository";

export const appRepositories = [
    ArtistRepository,
    ArtistTypeRepository
];
