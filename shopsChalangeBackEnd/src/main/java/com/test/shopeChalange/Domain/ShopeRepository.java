package com.test.shopeChalange.Domain;

import java.util.List;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShopeRepository extends MongoRepository<Shope, String> {
	public List<Shope> findAllByLocationNear(GeoJsonPoint p);

}
