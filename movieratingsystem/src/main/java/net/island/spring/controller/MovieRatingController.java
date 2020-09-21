package net.island.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.island.spring.entity.Movie;
import net.island.spring.service.MovieService;

@RestController
@RequestMapping("/scoreSheet")
@CrossOrigin("*")	// CORS
public class MovieRatingController {

	@Autowired
	private MovieService movieService;
	
	@GetMapping("/movies")
	public List<Movie> getMovieList() {
		return movieService.getMovieList();
	}
	
	@GetMapping("/movies/{id}")
	public Movie getMovie(@PathVariable long id) {
		return movieService.getMovie(id);
	}
	
	@PostMapping("/movies")
	public Movie addMovie(Movie movie) {
		return movieService.saveMovie(movie);
	}
	
	@PutMapping("/movies")
	public Movie updateMovie(Movie movie) {
		return movieService.saveMovie(movie);
	}
	
	@DeleteMapping("/movies")
	public void deleteMovie(@RequestParam long id) {
		movieService.deleteMovie(id);
	}
	
	@PostMapping("/movies/search")
	public List<Movie> searchMovies(@RequestParam String keyword) {
		return movieService.searchMovies(keyword);
	}
	
}
