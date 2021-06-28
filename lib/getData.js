import axios from "axios";

export async function getCharacters (page = 1, name = "") {
    const response = await axios.post (
        'https://rickandmortyapi.com/graphql', {
            query : `
                query {
                    characters(page: ${page}, filter: {name : "${name}"}) {
                        info {
                            count,
                            next,
                            prev
                        }
                        results {
                            name,
                            image,
                            id
                        }
                    }
                }
            `
        }
    );
    return response.data.data.characters;
}

export async function getCharacter (id) {
    const response = await axios.post (
        'https://rickandmortyapi.com/graphql', {
            query : `
                query {
                    charactersByIds(ids: ${id}) {
                        name,
                        image,
                        id,
                        status,
                        gender,
                        species,
                        origin {
                            name
                        },
                        location {
                            name
                        }
                      }
                }
            `
        }
    );
    return response.data.data.charactersByIds;
}