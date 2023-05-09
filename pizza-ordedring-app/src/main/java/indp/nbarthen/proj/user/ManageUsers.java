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

import org.springframework.security.crypto.bcrypt.BCrypt;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.Topping;


public class ManageUsers {
	private static final String userFileLocation = "StoredUsers.json";

	//Adds a user to StoredUsers.json if the email is not already in use.
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
				if (u.getEmail().toLowerCase().contentEquals(user.getEmail().toLowerCase())) {
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
	
	//Find the user with the same email, applys edits to user's info and saved it to StoredUsers.json.
	public static boolean editUser(UserAccount user) {
	    List<UserAccount> users = new ArrayList<>();

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

	        // Find the user with the same email and update its information
	        boolean foundUser = false;
	        for (int i = 0; i < users.size(); i++) {
	            UserAccount u = users.get(i);
	            if (u.getEmail().equalsIgnoreCase(user.getEmail())) {
	                users.set(i, user);
	                foundUser = true;
	                System.out.println("Should be updating- " + user.getFirstName());
	                break;
	            }
	        }

	        if (!foundUser) {
	            System.out.println("User not found with email: " + user.getEmail());
	            return false;
	        }

	        // Save updated list of users to file
	        ObjectMapper objectMapper = new ObjectMapper();
	        objectMapper.writeValue(new File(userFileLocation), users);

	        return true; // User saved successfully

	    } catch (IOException e) {
	        e.printStackTrace();
	        System.out.println("Error updating user in " + userFileLocation);
	    }

	    return false; // Error saving user
	}

	
	//Returns true if the email exists in the database.
	public static boolean checkIfValidEmail(String email) {
		List<UserAccount> users = new ArrayList<>();
		boolean emailExists = false;
		
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

		//Check if email exists. Return true of it exists.
		for (UserAccount u : users) {
			if (u.getEmail().toLowerCase().contentEquals(email.toLowerCase())) {
				emailExists = true;
				
				return true;
			}
		}

		if (!emailExists) {
			System.out.println("Email (" + email + ") does not exist in " + userFileLocation);
			
			return false;
		}

		return false; 
	
    }
	
	//Checks if the user's email and password is valid. 
		//Returns user if both are valid.
		//Returns null if password or email is invalid. (Email should already valid from checkIfValidEamil(email) function)
	public static UserAccount getUser(String email, String password) {
		List<UserAccount> users = new ArrayList<>();
		boolean emailExists = false;
		
		File file = new File(userFileLocation);
		if (file.exists()) {
			// Load existing users from file
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				users = objectMapper.readValue(file, new TypeReference<List<UserAccount>>() {});
			} catch (IOException e) {
				e.printStackTrace();
				System.out.println("Failed to read users from " + userFileLocation);
				return null;
			}
		}

		// Check if email exists. If it exists. Check password and return user or null.
		for (UserAccount u : users) {
			if (u.getEmail().toLowerCase().contentEquals(email.toLowerCase())) {
				emailExists = true;
				
				if (BCrypt.checkpw(password, u.getPasswordHash())) {
				    //Executes if passwords match
					return u;
				}
				//Invalid password
				else {
					System.out.println("Invalid password for email - " + email + " - in " + userFileLocation);
					return null;
				}
				
			}
			
		}

		if (!emailExists) {
			System.out.println("Email (" + email + ") does not exist in " + userFileLocation);
			
			return null; 
		}

		return null; 
	
    }
	
	//Checks if the password passed matched the password for the account related to email.
		public static boolean checkIfPasswordsMatch(String email, String password) {
			List<UserAccount> users = new ArrayList<>();
			boolean emailExists = false;
			
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

			// Check if email exists. If it exists. Check password and return user or null.
			for (UserAccount u : users) {
				//Iteration (u) matched email passed.
				if (u.getEmail().toLowerCase().contentEquals(email.toLowerCase())) {
					
					if (BCrypt.checkpw(password, u.getPasswordHash())) {
					    //Executes if passwords match
						return true;
					}
					//Password does not match
					else {
						return false;
					}
					
				}
				
			}

			return false; 
		}
	
	
	public static boolean checkIfUserIsAdmin(UserAccount user) {
		List<UserAccount> users = new ArrayList<>();
		boolean emailExists = false;
		
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

		// Make sure users email is valid Just incase.
		for (UserAccount u : users) {
			if (u.getEmail().toLowerCase().contentEquals(user.getEmail().toLowerCase())) {
				emailExists = true;
				if(user.isAdmin()) {

					return true;
				}
				else {
					System.out.println("User with email (" + user.getEmail() + ") does not have admin permissions.");
					return false;
				}
			}
			
		}

		if (!emailExists) {
			System.out.println("Email (" + user.getEmail() + ") does not exist in " + userFileLocation);
			
			return false; 
		}

		//User is not an admin.
		return false; 
	
    }
	



	    
}
