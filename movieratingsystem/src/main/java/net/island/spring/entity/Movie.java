package net.island.spring.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Movie {

	@Id
	//@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String name;
	private String info;
	private int score;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	@Override
	public String toString() {
		return "Movie [id=" + id + ", name=" + name + ", info=" + info + ", score=" + score + "]";
	}
	
}
