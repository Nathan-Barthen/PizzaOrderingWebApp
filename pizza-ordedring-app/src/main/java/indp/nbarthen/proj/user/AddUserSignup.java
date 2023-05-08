package indp.nbarthen.proj.user;



import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.Topping;

//Takes the image passed and saves it to the proper directory 
public class AddUserSignup {
	private static final String userFileLocation = "StoredUsers.json";

	public static boolean addUser(UserAccount user) {
		List<UserAccount> users = new ArrayList<>();
		boolean emailExists = false;

		try {
			File file = new File(userFileLocation);
			if (file.exists()) {
				// Load existing users from file
				try {
					ObjectMapper objectMapper = new ObjectMapper();
					users = objectMapper.readValue(file, new TypeReference<List<UserAccount>>() {});
				} catch (IOException e) {
					e.printStackTrace();
					System.out.println("Failed to read users from " + userFileLocation);
					return false;
				}
			}

			// Check if email already exists
			for (UserAccount u : users) {
				if (u.getEmail().contains(user.getEmail())) {
					emailExists = true;
					System.out.println("Email already exists in StoredUsers.json");
					break;
				}
			}

			if (!emailExists) {
				// Add user to list and save to file
				users.add(user);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.writeValue(new File(userFileLocation), users);

				return true; // User saved successfully
			}

		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Error adding user to " + userFileLocation);
		}

		return false; // Error saving user
	
    }
	
	



	    
}
