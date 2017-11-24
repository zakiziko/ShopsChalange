package com.test.shopeChalange.Domain;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
	public User findOneByEmailAndPassword(String email,String password);
	public User findOneByEmail(String email);

}
