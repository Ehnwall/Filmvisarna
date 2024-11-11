import { Container, Button, Form, Row, Col } from 'react-bootstrap'
import RenderMovies from '../PostMovie/renderPreview'
import AddGroup from './addGroup'
import React, { useState } from 'react'
import { DescriptionNewMovie, NEWMOVIE } from '../../../utils/types/types'
import { usePostMovie } from '../../../utils/api/movies/usePostMovie'

export default function PostMovies() {
    const [movieTitle, setMovieTitle] = useState('')
    const [ageLimit, setAgeLimit] = useState('')
    const [durationMin, setDurationMin] = useState('')
    const [originalTitle, setOriginalTitle] = useState('')
    const [year, setYear] = useState(new Date().toDateString())
    const [language, setLanguage] = useState('')
    const [text, setText] = useState('')
    const [posterUrl, setPosterUrl] = useState('')
    const [trailerUrlInput, setTrailerUrl] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const [cast, setCast] = useState('')
    const [castList, setCastList] = useState<string[]>([])
    const [genre, setGenre] = useState('')
    const [genreList, setGenreList] = useState<string[]>([])
    const [director, setDirector] = useState('')
    const [directorList, setDirectorList] = useState<string[]>([])
    const castName: string = 'skådespelare'
    const genreName: string = 'genre'
    const directorName: string = 'filmregissör'

    const postMovie = usePostMovie()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        switch (event.target.name) {
            case 'movieTitle':
                setMovieTitle(event.target.value)
                break
            case 'ageLimit':
                setAgeLimit(event.target.value)
                break
            case 'durationMin':
                setDurationMin(event.target.value)
                break
            case 'originalTitle':
                setOriginalTitle(event.target.value)
                break
            case 'year':
                setYear(event.target.value)
                break
            case 'language':
                setLanguage(event.target.value)
                break
            case 'text':
                setText(event.target.value)
                break
            case 'posterUrl':
                setPosterUrl(event.target.value)
                break
            case 'trailerUrl':
                setTrailerUrl(event.target.value)
                break
            case 'synopsis':
                setSynopsis(event.target.value)
                break
            case 'cast':
                setCast(event.target.value)
                break
        }
    }
    const extractYouTubeId = (url: string) => {
        const urlParts = url.split('/')
        return urlParts[urlParts.length - 1]
    }
    const firstLetter = movieTitle.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = movieTitle.slice(1)
    const capitalizedWord = firstLetterCap + remainingLetters
    const yeardate = new Date(year).toISOString()
    const ageLimitNumber = +ageLimit
    const durationMinNumber = +durationMin

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const trailerUrl = extractYouTubeId(trailerUrlInput)

        const description: DescriptionNewMovie = {
            director: directorList,
            originalTitle: originalTitle,
            genre: genreList,
            cast: castList,
            year: yeardate,
            text: text,
            language: language,
            synopsis: synopsis,
        }

        const newMovie: NEWMOVIE = {
            title: capitalizedWord,
            ageLimit: ageLimitNumber,
            durationMin: durationMinNumber,
            description: description,
            posterUrl: posterUrl,
            trailerUrl: trailerUrl,
        }

        postMovie.mutate(newMovie)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row xs={1} sm={2} md={3}>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicMovieTitle">
                            <Form.Label>Film titel</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lägg till film title"
                                name="movieTitle"
                                onChange={handleChange}
                                value={movieTitle}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicAgeLimit">
                            <Form.Label>Ådersgräns</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="ageLimit"
                                onChange={handleChange}
                                value={ageLimit}
                                required
                            >
                                <option value="0" defaultChecked>
                                    Från 0 år
                                </option>
                                <option value="7">Från 7 år</option>
                                <option value="11">Från 11 år</option>
                                <option value="15">Från 15 år</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDurationMin">
                            <Form.Label>Längd i minuter</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Längd på film"
                                name="durationMin"
                                onChange={handleChange}
                                value={durationMin}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row xs={1} sm={2} md={3}>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLanguage">
                            <Form.Label>Lägg till orignaltitel</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lägg till orignaltitel"
                                name="originalTitle"
                                onChange={handleChange}
                                value={originalTitle}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicYear">
                            <Form.Label>Lägg till releasedatum</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Lägg till releasedatum"
                                name="year"
                                onChange={handleChange}
                                value={year}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row xs={1} sm={2} md={3}>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLanguage">
                            <Form.Label>Lägg till språk</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lägg till språk"
                                name="language"
                                onChange={handleChange}
                                value={language}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Lägg till undertext språk</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lägg till undertext språk"
                                name="text"
                                onChange={handleChange}
                                value={text}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <AddGroup
                        groupName={cast}
                        GroupList={castList}
                        setGroupList={setCastList}
                        setGroup={setCast}
                        name={castName}
                    />
                    <AddGroup
                        groupName={genre}
                        GroupList={genreList}
                        setGroupList={setGenreList}
                        setGroup={setGenre}
                        name={genreName}
                    />
                    <AddGroup
                        groupName={director}
                        GroupList={directorList}
                        setGroupList={setDirectorList}
                        setGroup={setDirector}
                        name={directorName}
                    />
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPosterUrl">
                            <Form.Label>Lägg till PosterUrl</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lägg till PosterUrl"
                                name="posterUrl"
                                onChange={handleChange}
                                value={posterUrl}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTrailerUrl">
                            <Form.Label>Lägg till trailerUrl</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Lägg till trailerUrl"
                                name="trailerUrl"
                                onChange={handleChange}
                                value={trailerUrlInput}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSypnopsis">
                            <Form.Label>Lägg till Sypnopsis</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="synopsis"
                                onChange={handleChange}
                                value={synopsis}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <RenderMovies
                            movieTitle={capitalizedWord}
                            durationMin={durationMin}
                            posterUrl={posterUrl}
                            ageLimit={ageLimit}
                            genreList={genreList}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Button variant="outline-primary" type="submit">
                            Lägg till film
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
