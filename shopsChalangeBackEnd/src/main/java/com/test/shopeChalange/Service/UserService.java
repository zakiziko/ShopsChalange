package com.test.shopeChalange.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.stereotype.Service;

import com.test.shopeChalange.Domain.*;


@Service
public class UserService {
	
	@Autowired
	private UserRepository ur;
	
	@Autowired
	private ShopeRepository sr;
	
	//encrypt User password
	public String encrypt(String password) throws NoSuchAlgorithmException{	
		// Create MessageDigest instance for MD5
        MessageDigest md = MessageDigest.getInstance("MD5");
        //Add password bytes to digest
        md.update(password.getBytes());
        //Get the hash's bytes
        byte[] bytes = md.digest();
        //This bytes[] has bytes in decimal format;  Convert it to hexadecimal format
        StringBuilder sb = new StringBuilder();
        for(int i=0; i< bytes.length ;i++)
        {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        String res = sb.toString();
		return res;
	}
	
	//sign up
	public boolean signUp(User u){
		
		String passwordRaw = u.getPassword();
		try {
			String MDPassword = this.encrypt(passwordRaw);
			u.setPassword(MDPassword);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		ur.save(u);
		return true;
	}
	
	//sign in 
	public User signin(String email,String Password){
		String MDPassword = "";
		try {
		   MDPassword = this.encrypt(Password);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ur.findOneByEmailAndPassword(email, MDPassword);
	}
	
	//update user preferred shop list for adding and removing 
	public void Update(User u){
		ur.save(u);	
	}
	
	public User getbyId(String id){
		return ur.findOne(id);
	}
		

	//get User PreferedShops list
	
	public List<Shope> preferdShops(String id){
		return ur.findOne(id).getPreferedShops();
	}

	//display main shop list based on distance and minus the user preferedShops
	
	public List<Shope> NearbyShops(String id,double lat,double lang){
		GeoJsonPoint p = new GeoJsonPoint(lang,lat);
		List<Shope> list = sr.findAllByLocationNear(p);
		List<Shope> listPref=ur.findOne(id).getPreferedShops();
		for (int i =0;i<listPref.size();i++) {
			for(int j =0;j<list.size();j++){
				if(list.get(j).getId().equals(listPref.get(i).getId())){
					list.remove(j);
				}	
			}
		}
		return  list;
	}
	
	//display main shop list based on distance for a user before login
	public List<Shope> NearbyShopsNoUser(double lat,double lang){
		GeoJsonPoint p = new GeoJsonPoint(lang,lat);
		return sr.findAllByLocationNear(p);
	}
}
