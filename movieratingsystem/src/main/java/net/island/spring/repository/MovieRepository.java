package net.island.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.island.spring.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

	Movie findById(long id);

	List<Movie> findByNameContains(String keyword);
	
	List<Movie> findByInfoContains(String keyword);
	
}
