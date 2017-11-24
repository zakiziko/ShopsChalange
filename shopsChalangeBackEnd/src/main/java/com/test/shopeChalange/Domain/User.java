package com.test.shopeChalange.Domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")
public class User {

	@Id
	private String id;
	@Indexed(unique = true)
	private String email;
	private String password;
	private List<Shope> preferedShops;
	
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	public User(String email, String password, List<Shope> preferedShops) {
		super();
		this.email = email;
		this.password = password;
		this.preferedShops = preferedShops;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<Shope> getPreferedShops() {
		return preferedShops;
	}
	public void setPreferedShops(List<Shope> preferedShops) {
		this.preferedShops = preferedShops;
	}
	public String getId() {
		return id;
	}
	
	
}
