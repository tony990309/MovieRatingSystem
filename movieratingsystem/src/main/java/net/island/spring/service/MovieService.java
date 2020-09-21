package net.island.spring.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.island.spring.entity.Movie;
import net.island.spring.repository.MovieRepository;

@Service
public class MovieService {

	@Autowired
	private MovieRepository movieRepository;
	
	public List<Movie> getMovieList() {
		return movieRepository.findAll();
	}
	
	public Movie getMovie(long id) {
		return movieRepository.findById(id);
	}
	
	public Movie saveMovie(Movie movie) {
		return movieRepository.save(movie);
	}
	
	public void deleteMovie(long id) {
		movieRepository.deleteById(id);
	}
	
	public List<Movie> searchMovies(String keyword) {
		List<Movie> findByNameList = movieRepository.findByNameContains(keyword);
		List<Movie> findByInfoList = movieRepository.findByInfoContains(keyword);
		findByNameList.addAll(findByInfoList);
		
		// 去除重複資料
		HashSet<Movie> h = new HashSet<>(findByNameList);
		findByNameList.clear();
		findByNameList.addAll(h);
		
		return findByNameList;
	}
}
