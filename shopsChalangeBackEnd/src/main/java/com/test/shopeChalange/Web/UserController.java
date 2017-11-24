package com.test.shopeChalange.Web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.test.shopeChalange.Domain.Shope;
import com.test.shopeChalange.Domain.User;
import com.test.shopeChalange.Service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService us;
	
	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping(method = RequestMethod.POST,value="/signUp")
	public boolean signUp(@RequestBody User u){
		return us.signUp(u);
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping("/signIn/{email}/{password}")
	public User signIn(@PathVariable String email,@PathVariable String password){
		return us.signin(email, password);
		//return email+" "+password;
	}
	
	//updating user preferredShops list (like & remove)
	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping(method=RequestMethod.PUT , value= "/update")
	public User update(@RequestBody User u){
		us.Update(u);
		return us.getbyId(u.getId());
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping("/PreferredShops/{id}")
	public List<Shope> preferredShops(@PathVariable String id){
		return us.preferdShops(id);
	}
	
	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping("/NearbyShops/{id}/{lang}/{lat}/cords")
	public List<Shope> NearbyShops(@PathVariable String id,@PathVariable double lat,@PathVariable double lang){
		return us.NearbyShops(id, lat, lang);
	}
	
	//Nearby Shops for non logged user 
	@CrossOrigin(origins="http://localhost:4200")
	@RequestMapping("/NearbyShopsN/{lang}/{lat}/cords")
	public List<Shope> NearbyShopsNoUser(@PathVariable double lat,@PathVariable double lang){
		return us.NearbyShopsNoUser(lat, lang);
	}
}
